#!/usr/bin/env node
// Produces a copy-paste runtime-update announcement (Discord, forum, email) from the
// committed changelog. It reads the changelog rather than the collected JSON on purpose:
// the changelog is the reviewed, hand-edited source of truth, so the digest can never
// say something the published page doesn't.
//
//   node scripts/runtime-changelog/digest.mjs                       # most recent entry
//   node scripts/runtime-changelog/digest.mjs --since 2026-07-01    # explicit window
//   node scripts/runtime-changelog/digest.mjs --since 2026-06-01 --until 2026-06-30
//   node scripts/runtime-changelog/digest.mjs --out /tmp/post.md    # custom save path
//
// It parses <Update> blocks, keeps those whose date falls in the window, and reassembles
// their runtime sections into one post — so a period spanning several changelog entries
// collapses into a single "here's what shipped" narrative. Deterministic; no AI.
//
// The post prints to stdout AND is saved to scripts/runtime-changelog/generated/
// community-post.md (git-ignored) by default; --out overrides the save path.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..', '..');
const DEFAULT_SOURCE = join(REPO_ROOT, 'runtimes', 'changelog.mdx');
// The post is saved here by default — alongside the collector's release-data.json, and
// git-ignored like it. It's a share artifact, never committed.
const DEFAULT_OUT = join(HERE, 'generated', 'community-post.md');

// Section ordering, matching the changelog. Core leads; unknown runtimes fall to the end.
const RUNTIME_ORDER = [
  'Core runtime',
  'Apple',
  'Android',
  'Web',
  'React',
  'React Native',
  'Flutter',
  'Unity',
  'Unreal',
];

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { source: DEFAULT_SOURCE, since: null, until: null, out: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--since') args.since = argv[++i];
    else if (a === '--until') args.until = argv[++i];
    else if (a === '--source') args.source = resolve(argv[++i]);
    else if (a === '--out') args.out = resolve(argv[++i]);
    else throw new Error(`unknown argument: ${a}`);
  }
  return args;
}

// ---------------------------------------------------------------------------
// Dates — parse "July 16, 2026" and ISO "2026-07-16" without Date parsing quirks
// ---------------------------------------------------------------------------

// Returns a YYYY-MM-DD string, comparable lexicographically, or null.
function toIso(text) {
  if (!text) return null;
  const iso = /(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const long = /([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/.exec(text);
  if (long) {
    const month = MONTHS[long[1].toLowerCase()];
    if (month) return `${long[3]}-${String(month).padStart(2, '0')}-${long[2].padStart(2, '0')}`;
  }
  return null;
}

function isoDaysAgo(days) {
  const d = new Date(Date.now() - days * 86_400_000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isoToday() {
  return isoDaysAgo(0);
}

function prettyDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const name = Object.keys(MONTHS).find((k) => MONTHS[k] === m);
  const month = name[0].toUpperCase() + name.slice(1);
  return `${month} ${d}, ${y}`;
}

// ---------------------------------------------------------------------------
// Parse <Update> blocks
// ---------------------------------------------------------------------------

function attr(openTag, name) {
  const m = new RegExp(`${name}="([^"]*)"`).exec(openTag);
  return m ? m[1] : null;
}

function parseUpdates(mdx) {
  const updates = [];
  // Require whitespace + attributes after the tag name. A real <Update> always has at
  // least a `label`; this skips a bare `<Update>` written inline in prose (e.g. a Note
  // that mentions the component), which would otherwise be matched as an empty block and
  // swallow the following real entry as its body.
  const re = /<Update\s+([^>]*?)>([\s\S]*?)<\/Update>/g;
  let m;
  while ((m = re.exec(mdx)) !== null) {
    const openTag = m[1];
    let body = m[2];
    // Drop MDX expression comments like {/* ... */} before they reach the output.
    body = body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim();
    const label = attr(openTag, 'label');
    const description = attr(openTag, 'description');
    // An entry's date is its label when that's a date (date-grouped page), otherwise
    // its description (per-runtime page, where the label is "Apple v6.21.1").
    const date = toIso(label) ?? toIso(description);
    updates.push({ label, description, date, body });
  }
  return updates;
}

// Splits an Update body into `## Heading` sections. Text before the first heading (an
// intro line) is attached to the entry itself.
function splitSections(body) {
  const sections = [];
  let intro = [];
  let current = null;
  for (const line of body.split(/\r?\n/)) {
    const h = /^##\s+(.+?)\s*$/.exec(line);
    if (h) {
      if (current) sections.push(current);
      current = { heading: h[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      intro.push(line);
    }
  }
  if (current) sections.push(current);
  return { intro: intro.join('\n').trim(), sections };
}

// Drop a trailing " - July 16, 2026" that the per-runtime page appends to labels that
// have no version of their own (e.g. "Core runtime - July 16, 2026").
function stripTrailingDate(text) {
  return text.replace(/\s*[-–—,]\s*[A-Za-z]+\s+\d{1,2},?\s+\d{4}\s*$/, '').trim();
}

// "Apple v6.21.1" -> { runtime: "Apple", version: "v6.21.1" }; "Core runtime" -> no version.
function splitHeading(heading) {
  const clean = stripTrailingDate(heading.trim());
  const m = /^(.*?)(?:\s+(v?\d[\w.–-]*))?$/u.exec(clean);
  return { runtime: (m[1] || clean).trim(), version: m[2] || null };
}

function orderIndex(runtime) {
  const i = RUNTIME_ORDER.indexOf(runtime);
  return i === -1 ? RUNTIME_ORDER.length : i;
}

// ---------------------------------------------------------------------------
// Build the digest
// ---------------------------------------------------------------------------

function buildDigest(updates, sinceIso, untilIso) {
  const inWindow = updates
    .filter((u) => u.date && u.date >= sinceIso && u.date <= untilIso)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (inWindow.length === 0) return null;

  // Group every section from every in-window entry under its runtime, preserving the
  // version + date so a multi-entry period keeps "what shipped when".
  const byRuntime = new Map();
  for (const update of inWindow) {
    const { intro, sections } = splitSections(update.body);
    // Date-grouped page: one Update with `## Runtime` sections inside. Per-runtime page:
    // one Update per runtime, the name in the label and no inner headings — treat the
    // whole body as a single section keyed on the label.
    const runtimeSections = sections.length
      ? sections
      : [{ heading: update.label ?? '', lines: intro.split(/\r?\n/) }];
    for (const section of runtimeSections) {
      const { runtime, version } = splitHeading(section.heading);
      if (!runtime) continue;
      if (!byRuntime.has(runtime)) byRuntime.set(runtime, []);
      byRuntime.get(runtime).push({ version, date: update.date, lines: section.lines });
    }
  }

  const runtimes = [...byRuntime.keys()].sort(
    (a, b) => orderIndex(a) - orderIndex(b) || a.localeCompare(b),
  );

  const dates = inWindow.map((u) => u.date);
  const newest = dates[0];
  const oldest = dates[dates.length - 1];
  const range = newest === oldest ? prettyDate(newest) : `${prettyDate(oldest)} – ${prettyDate(newest)}`;

  const out = [];
  out.push(`# Rive runtime updates — ${range}`);
  out.push('');
  out.push(
    runtimes.filter((r) => r !== 'Core runtime').join(', ').replace(/, ([^,]*)$/, ' and $1') +
      ' saw new releases.',
  );
  out.push('');

  for (const runtime of runtimes) {
    const entries = byRuntime.get(runtime);
    const multi = entries.length > 1;

    for (const entry of entries) {
      const versionSuffix = entry.version ? ` ${entry.version}` : '';
      // With multiple contributions in the window, date-stamp each so the reader can
      // tell successive releases apart.
      const dateSuffix = multi ? ` — ${prettyDate(entry.date)}` : '';
      out.push(`## ${runtime}${versionSuffix}${dateSuffix}`);
      out.push('');
      const trimmed = entry.lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
      if (trimmed) {
        out.push(trimmed);
        out.push('');
      }
    }
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = parseArgs(process.argv.slice(2));
  const untilIso = args.until ? toIso(args.until) : isoToday();
  if (!untilIso) throw new Error(`could not parse --until "${args.until}"`);

  const mdx = readFileSync(args.source, 'utf8');
  const updates = parseUpdates(mdx);
  if (updates.length === 0) {
    console.error(`No <Update> blocks found in ${args.source}.`);
    process.exit(1);
  }

  // Default window is just the most recent entry, so running this any time produces a post
  // for whatever was last published — no assumption about how often you run it. Pass
  // --since to cover a wider span (e.g. several entries at once).
  let sinceIso;
  if (args.since) {
    sinceIso = toIso(args.since);
    if (!sinceIso) throw new Error(`could not parse --since "${args.since}"`);
  } else {
    const dates = updates.map((u) => u.date).filter(Boolean).sort();
    sinceIso = dates.length ? dates[dates.length - 1] : untilIso;
  }

  const digest = buildDigest(updates, sinceIso, untilIso);
  if (!digest) {
    console.error(`No changelog entries between ${sinceIso} and ${untilIso}.`);
    console.error(`(Found ${updates.length} entr${updates.length === 1 ? 'y' : 'ies'} overall.)`);
    process.exit(1);
  }

  // Always print the post (so it's ready to copy, and the agent sees it inline) and always
  // save a copy. Status goes to stderr so `digest.mjs > file` still yields clean content.
  process.stdout.write(digest);

  const outPath = args.out ?? DEFAULT_OUT;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, digest);

  const rel = outPath.replace(REPO_ROOT + '/', '');
  const ignored = args.out ? '' : ' (git-ignored — copy it out to share, don\'t commit it)';
  console.error(`\n${'─'.repeat(60)}`);
  console.error(`Saved community post to ${rel}${ignored}`);
  console.error(`Window: ${sinceIso} → ${untilIso}`);
}

main();
