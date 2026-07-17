#!/usr/bin/env node
// Collects new stable Rive runtime releases and writes generated/release-data.json.
//
// Deterministic on purpose: this script decides *which versions shipped* and owns
// every version number, date and URL. The runtime-announcement skill only turns the
// collected notes into prose. Nothing here calls an AI.
//
//   node scripts/runtime-changelog/collect.mjs                  # collect; never writes state
//   node scripts/runtime-changelog/collect.mjs --advance-state  # record + sync docs.json versions
//   node scripts/runtime-changelog/collect.mjs --baseline       # first-ever run (no state yet)
//   node scripts/runtime-changelog/collect.mjs --bootstrap-days 30   # widen first-run lookback
//
// Collecting is always safe: it only writes generated/release-data.json. State moves
// only on the explicit second step, which re-reads that same file and makes no network
// calls — so state can never advance past the versions the changelog entry describes.
//
// Zero dependencies, stdlib only: Node 18+ (global fetch, zlib).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, '..', '..');
const STATE_PATH = join(HERE, 'state.json');
const OUT_DIR = join(HERE, 'generated');
const OUT_PATH = join(OUT_DIR, 'release-data.json');

// First-run lookback only: when a runtime has no recorded state yet, its first entry
// covers whatever shipped in this many days. Used exclusively on the very first run for a
// runtime — after that the range is a pure version comparison against state, so it does
// not matter whether you run this weekly, biweekly, or ad hoc. Override with
// --bootstrap-days N.
const DEFAULT_BOOTSTRAP_DAYS = 14;

// ---------------------------------------------------------------------------
// Runtime configuration
//
// `versions` is the authoritative record that an artifact was actually published
// (and when). `notes` is where the prose lives. They are separate because for
// several runtimes they genuinely are different systems — see the comments.
// ---------------------------------------------------------------------------

const RUNTIMES = [
  {
    id: 'apple',
    displayName: 'Apple',
    versions: { type: 'github-releases', repo: 'rive-app/rive-ios' },
    // Curated `## Fixed` / `## Changed` prose, followed by a `## Commits` dump of the
    // upstream monorepo commits the release vendored.
    notes: { type: 'github-releases' },
    carriesCoreCommits: true,
    links: { releases: 'https://github.com/rive-app/rive-ios/releases' },
  },
  {
    id: 'android',
    displayName: 'Android',
    versions: { type: 'github-releases', repo: 'rive-app/rive-android' },
    // No curated section at all — the whole body is the vendored monorepo commit dump.
    notes: { type: 'github-releases' },
    carriesCoreCommits: true,
    links: { releases: 'https://github.com/rive-app/rive-android/releases' },
  },
  {
    id: 'flutter',
    displayName: 'Flutter',
    // rive-flutter publishes no GitHub releases or tags past 0.8.4 (2022), so
    // GitHub cannot tie notes to a version at all. pub.dev is the only record of
    // what shipped, and the CHANGELOG.md inside the published archive is the only
    // copy that is correctly headed per version. master's CHANGELOG.md keeps
    // released notes under "## Upcoming" and appends unreleased work to the same
    // block — parsing it would announce changes nobody can install.
    versions: { type: 'pub', package: 'rive' },
    notes: { type: 'pub-archive-changelog' },
    links: {
      releases: 'https://pub.dev/packages/rive/changelog',
      package: 'https://pub.dev/packages/rive',
    },
  },
  {
    id: 'web',
    displayName: 'Web',
    // @rive-app/canvas, /webgl2 and /canvas-lite version in lockstep off rive-wasm.
    // That shared version is what the docs expose as {{versionWeb}}.
    versions: { type: 'npm', package: '@rive-app/webgl2' },
    // rive-wasm's CHANGELOG.md is a raw dump of the whole monorepo's commits, so it
    // carries Apple/Unreal/editor work that never touched the web runtime, and its
    // newest heading is often undated. Dates come from npm above; the skill is told
    // to filter the cross-platform noise.
    notes: {
      type: 'github-changelog-md',
      repo: 'rive-app/rive-wasm',
      branch: 'master',
      headingLevel: 2,
    },
    carriesCoreCommits: true,
    links: {
      releases: 'https://github.com/rive-app/rive-wasm/blob/master/CHANGELOG.md',
      package: 'https://www.npmjs.com/package/@rive-app/webgl2',
    },
  },
  {
    id: 'react',
    displayName: 'React',
    // Same failure as Flutter: rive-react's GitHub releases stop at v4.21.3 (June
    // 2025) while npm has shipped up to 4.29.5. Tags do keep pace, but the releases
    // API would silently report year-old versions as current.
    versions: { type: 'npm', package: '@rive-app/react-canvas' },
    // auto-changelog writes version headings at h4 (`#### [v4.29.5](...)`), not h2.
    notes: {
      type: 'github-changelog-md',
      repo: 'rive-app/rive-react',
      branch: 'main',
      headingLevel: 4,
    },
    links: {
      releases: 'https://github.com/rive-app/rive-react/blob/main/CHANGELOG.md',
      package: 'https://www.npmjs.com/package/@rive-app/react-canvas',
    },
  },
  {
    id: 'react-native',
    displayName: 'React Native',
    // The Nitro runtime, published to npm as @rive-app/react-native. Distinct from
    // the legacy rive-app/rive-react-native repo (npm: rive-react-native, v9.x).
    // semantic-release cuts a GitHub release per publish, so releases keep pace and
    // carry the notes — but it ships often (frequently several releases per entry).
    versions: { type: 'github-releases', repo: 'rive-app/rive-nitro-react-native' },
    notes: { type: 'github-releases' },
    links: {
      releases: 'https://github.com/rive-app/rive-nitro-react-native/releases',
      package: 'https://www.npmjs.com/package/@rive-app/react-native',
    },
  },
  {
    id: 'unity',
    displayName: 'Unity',
    // Distributed via UPM, so there is no registry to cross-check against; GitHub
    // releases are the only record. Canary builds (v0.4.4-canary.87) exist as tags
    // but are not published as releases — the prerelease filter covers them anyway.
    versions: { type: 'github-releases', repo: 'rive-app/rive-unity' },
    notes: { type: 'github-releases' },
    links: { releases: 'https://github.com/rive-app/rive-unity/releases' },
  },
  {
    id: 'unreal',
    displayName: 'Unreal',
    // Tags carry no `v` prefix (0.4.25). Notes are hand-written prose.
    versions: { type: 'github-releases', repo: 'rive-app/rive-unreal' },
    notes: { type: 'github-releases' },
    links: { releases: 'https://github.com/rive-app/rive-unreal/releases' },
  },
];

// ---------------------------------------------------------------------------
// Semantic versions
// ---------------------------------------------------------------------------

// Local calendar date, not UTC. Publish timestamps are compared in UTC (correct — they
// come from the registries that way), but the announcement date becomes the entry's
// label, which is its permanent anchor. Someone generating an entry on the evening of
// the 16th in the Americas should not get a permalink dated the 17th.
function localDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseVersion(raw) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(
    String(raw).trim(),
  );
  if (!m) return null;
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: Number(m[3]),
    prerelease: m[4] ?? null,
    raw: String(raw).trim(),
  };
}

function compareVersions(a, b) {
  for (const k of ['major', 'minor', 'patch']) {
    if (a[k] !== b[k]) return a[k] - b[k];
  }
  // A prerelease sorts before its own release: 1.0.0-rc.1 < 1.0.0
  if (a.prerelease && !b.prerelease) return -1;
  if (!a.prerelease && b.prerelease) return 1;
  if (!a.prerelease && !b.prerelease) return 0;
  const ap = a.prerelease.split('.');
  const bp = b.prerelease.split('.');
  for (let i = 0; i < Math.max(ap.length, bp.length); i++) {
    const x = ap[i];
    const y = bp[i];
    if (x === undefined) return -1;
    if (y === undefined) return 1;
    const xn = /^\d+$/.test(x);
    const yn = /^\d+$/.test(y);
    if (xn && yn) {
      if (Number(x) !== Number(y)) return Number(x) - Number(y);
    } else if (x !== y) {
      return x < y ? -1 : 1;
    }
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

const TIMEOUT_MS = 30_000;

async function getJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'rive-docs-changelog', ...headers },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.json();
}

async function getText(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'rive-docs-changelog' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.text();
}

function githubHeaders() {
  // Optional: lifts the unauthenticated 60 req/hour limit. Not required.
  const token = process.env.GITHUB_TOKEN;
  return token ? { authorization: `Bearer ${token}` } : {};
}

// ---------------------------------------------------------------------------
// Version sources -> [{ version, publishedAt, url, prerelease, notes? }]
// ---------------------------------------------------------------------------

async function fetchGithubReleases(repo) {
  const json = await getJson(
    `https://api.github.com/repos/${repo}/releases?per_page=100`,
    githubHeaders(),
  );
  return json
    .filter((r) => !r.draft)
    .map((r) => ({
      version: String(r.tag_name).replace(/^v/, ''),
      publishedAt: r.published_at,
      url: r.html_url,
      prerelease: Boolean(r.prerelease),
      notes: (r.body || '').trim(),
    }));
}

async function fetchPubVersions(pkg) {
  const d = await getJson(`https://pub.dev/api/packages/${pkg}`);
  return d.versions.map((v) => ({
    version: v.version,
    publishedAt: v.published,
    url: `https://pub.dev/packages/${pkg}/versions/${v.version}`,
    archiveUrl: v.archive_url,
    prerelease: false, // refined by parseVersion below
  }));
}

async function fetchNpmVersions(pkg) {
  const d = await getJson(`https://registry.npmjs.org/${pkg}`);
  const time = d.time || {};
  return Object.keys(d.versions).map((v) => ({
    version: v,
    publishedAt: time[v],
    url: `https://www.npmjs.com/package/${pkg}/v/${v}`,
    prerelease: false,
  }));
}

async function fetchVersions(runtime) {
  const cfg = runtime.versions;
  switch (cfg.type) {
    case 'github-releases':
      return fetchGithubReleases(cfg.repo);
    case 'pub':
      return fetchPubVersions(cfg.package);
    case 'npm':
      return fetchNpmVersions(cfg.package);
    default:
      throw new Error(`${runtime.id}: unknown version source "${cfg.type}"`);
  }
}

// ---------------------------------------------------------------------------
// Changelog parsing
//
// Handles every heading shape in use across the Rive repos:
//   "## 0.14.8"                                   (rive-flutter, h2)
//   "## [2.38.5](.../compare/2.38.4...2.38.5)"    (rive-wasm, h2, undated)
//   "## [2.38.4](...) - 2026-07-01"               (rive-wasm, h2, dated)
//   "#### [v4.29.5](.../compare/v4.29.4...v4.29.5)" (rive-react, h4)
//   "## Upcoming"                                 -> no version, content dropped
//
// headingLevel must match the source exactly and is not worth guessing: too shallow
// and a version's subsections ("### Fixes") get eaten as headings, dropping their
// content; too deep and no version is ever found, yielding a silently empty section.
// ---------------------------------------------------------------------------

function versionFromHeading(heading) {
  const m = /^\[?v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\]?/.exec(heading.trim());
  return m ? m[1] : null;
}

// Version headings on the wasm and react changelogs link to the GitHub compare view
// for that release: `## [2.38.5](https://github.com/.../compare/2.38.4...2.38.5)`. That
// is a better outbound link than the npm version page, so capture it when present.
function urlFromHeading(heading) {
  const m = /\]\((https?:\/\/[^)\s]+)\)/.exec(heading);
  return m ? m[1] : null;
}

// Returns Map<version, { notes, url }>. `url` is the changelog heading's link when it
// has one (Web, React), else null.
function parseChangelog(md, headingLevel) {
  const marker = '#'.repeat(headingLevel);
  const headingRe = new RegExp(`^${marker}(?!#)\\s+(.+?)\\s*$`);
  const sections = new Map();
  let current = null;
  let url = null;
  let buffer = [];
  const flush = () => {
    if (current) sections.set(current, { notes: buffer.join('\n').trim(), url });
  };
  for (const line of md.split(/\r?\n/)) {
    const m = headingRe.exec(line);
    if (m) {
      flush();
      // A heading with no parseable version (e.g. "Upcoming") sets current to
      // null, so its body is dropped rather than attributed to a real release.
      current = versionFromHeading(m[1]);
      url = urlFromHeading(m[1]);
      buffer = [];
      continue;
    }
    if (current) buffer.push(line);
  }
  flush();
  return sections;
}

// Minimal tar reader: pulls a single file out of an archive without shelling out
// to `tar` or taking a dependency. Entries are 512-byte header blocks; we only
// need the name (offset 0) and the octal size (offset 124) to walk them.
function readFileFromTar(tar, wanted) {
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const name = tar.toString('utf8', offset, offset + 100).replace(/\0.*$/, '');
    if (!name) {
      offset += 512; // padding or end-of-archive block
      continue;
    }
    const rawSize = tar.toString('utf8', offset + 124, offset + 136).replace(/\0.*$/, '').trim();
    const size = parseInt(rawSize || '0', 8);
    if (Number.isNaN(size)) throw new Error(`corrupt tar header for "${name}"`);
    const body = offset + 512;
    if (name === wanted || name === `./${wanted}`) return tar.toString('utf8', body, body + size);
    offset = body + Math.ceil(size / 512) * 512;
  }
  return null;
}

// Returns Map<version, { notes, url }>. `url` is a version-specific notes link when the
// notes source provides one (the release page for GitHub releases, the compare link for
// changelog sources); null when it does not (Flutter's plain `## 0.14.9` headings).
async function fetchNotes(runtime, selected, allVersions) {
  const cfg = runtime.notes;
  switch (cfg.type) {
    case 'github-releases': {
      // Notes and the release-page URL both rode along with the version fetch.
      return new Map(selected.map((r) => [r.version, { notes: r.notes || '', url: r.url }]));
    }
    case 'github-changelog-md': {
      const md = await getText(
        `https://raw.githubusercontent.com/${cfg.repo}/${cfg.branch}/CHANGELOG.md`,
      );
      return parseChangelog(md, cfg.headingLevel);
    }
    case 'pub-archive-changelog': {
      // The newest published archive's CHANGELOG.md already contains every prior
      // version's section, correctly headed — so one download covers the lot.
      const newest = allVersions[allVersions.length - 1];
      if (!newest?.archiveUrl) throw new Error(`${runtime.id}: no archive_url on ${newest?.version}`);
      const res = await fetch(newest.archiveUrl, {
        headers: { 'user-agent': 'rive-docs-changelog' },
        signal: AbortSignal.timeout(120_000),
      });
      if (!res.ok) throw new Error(`GET ${newest.archiveUrl} -> HTTP ${res.status}`);
      const tar = gunzipSync(Buffer.from(await res.arrayBuffer()));
      const md = readFileFromTar(tar, 'CHANGELOG.md');
      if (md === null) throw new Error(`${runtime.id}: no CHANGELOG.md inside ${newest.archiveUrl}`);
      return parseChangelog(md, cfg.headingLevel ?? 2);
    }
    default:
      throw new Error(`${runtime.id}: unknown notes source "${cfg.type}"`);
  }
}

// ---------------------------------------------------------------------------
// Core runtime changes
//
// rive-app/rive-runtime is the shared C++ runtime. It publishes no releases, so there
// is nothing to collect from it directly — and its `main` carries work that has not
// shipped in any runtime yet, so announcing from it would describe changes nobody can
// install (the same trap as Flutter's `## Upcoming` block).
//
// Instead we reconstruct core changes from the runtimes that vendor it: Apple, Android
// and Web each embed the upstream monorepo commits they shipped. Anything found there
// has, by construction, actually reached users. Roughly 25 of every 35 such commits are
// common to more than one runtime, which is why they belong in one section rather than
// being repeated three times.
// ---------------------------------------------------------------------------

const CORE = {
  id: 'core',
  displayName: 'Core runtime',
  links: { releases: 'https://github.com/rive-app/rive-runtime' },
};

// Conventional-commit scopes owned by a specific runtime. These stay in that runtime's
// own section rather than being promoted to core.
const PLATFORM_SCOPES = new Map([
  ['apple', 'apple'],
  ['ios', 'apple'],
  ['android', 'android'],
  ['unreal', 'unreal'],
  ['unity', 'unity'],
  ['js', 'web'],
  ['wasm', 'web'],
  ['web', 'web'],
  ['flutter', 'flutter'],
  ['react', 'react'],
]);

// A vendored monorepo commit always carries `(#1234) <sha>`. Curated prose never does —
// Apple writes issue references as markdown links, `([#454](url))`, which this will not
// match. That difference is what separates real commits from hand-written notes without
// needing to know which heading they sit under.
const COMMIT_REF = /\(#(\d+)\)\s+([0-9a-f]{8,12})\b/;

function parseCommitLine(raw) {
  const line = raw.trim().replace(/^[-*]\s+/, '');
  const ref = COMMIT_REF.exec(line);
  if (!ref) return null;

  const message = line.slice(0, ref.index).trim();
  // Strict conventional commit: `fix(runtime): ...`, `chore: ...`
  const strict = /^(\w+)\s*(?:\(([^)]*)\))?\s*:/.exec(message);
  // Loose fallback for `feature (Unreal) Ore Support`, which has no colon and would
  // otherwise be misread as unscoped and promoted into core.
  const loose = strict ? null : /^(\w+)\s*\(([^)]+)\)/.exec(message);

  const type = (strict?.[1] ?? loose?.[1] ?? '').toLowerCase() || null;
  const scope = (strict?.[2] ?? loose?.[2] ?? '').toLowerCase().trim() || null;

  return { message, type, scope, pr: ref[1], sha: ref[2] };
}

function classifyScope(scope) {
  if (!scope) return { kind: 'core' };

  const mentionsEditor = /\beditor\b/.test(scope);
  const mentionsRuntime = /\bruntime\b/.test(scope);

  // Editor-only work never ships in a runtime and is excluded outright.
  if (mentionsEditor && !mentionsRuntime) return { kind: 'editor' };
  // `fix(editor and runtime): ...` touches both. Dropping it would lose a real runtime
  // fix, so keep it in core but mark it for the skill to judge rather than guessing.
  if (mentionsEditor && mentionsRuntime) return { kind: 'core', ambiguous: true };

  for (const [token, runtimeId] of PLATFORM_SCOPES) {
    if (new RegExp(`\\b${token}\\b`).test(scope)) return { kind: 'platform', runtimeId };
  }
  return { kind: 'core' };
}

// Splits every vendored commit into core vs. platform-owned, deduping across runtimes by
// upstream sha. Mutates each runtime to add `platformChanges`, and returns the core set.
function deriveCore(results) {
  const core = new Map();
  let editorExcluded = 0;

  for (const runtime of results) {
    const cfg = RUNTIMES.find((r) => r.id === runtime.id);
    runtime.platformChanges = [];
    if (!cfg?.carriesCoreCommits || !runtime.hasUpdates) continue;

    for (const release of runtime.releases) {
      for (const raw of release.notes.split('\n')) {
        const commit = parseCommitLine(raw);
        if (!commit) continue;

        const verdict = classifyScope(commit.scope);
        if (verdict.kind === 'editor') {
          editorExcluded++;
          continue;
        }
        if (verdict.kind === 'platform') {
          // Only claim it for the runtime it actually belongs to; an `apple`-scoped
          // commit vendored into Android's dump is not an Android change.
          if (verdict.runtimeId === runtime.id) {
            runtime.platformChanges.push({ ...commit, version: release.version });
          }
          continue;
        }

        const existing = core.get(commit.sha);
        if (existing) {
          existing.shippedIn.add(runtime.id);
        } else {
          core.set(commit.sha, {
            ...commit,
            ambiguous: Boolean(verdict.ambiguous),
            shippedIn: new Set([runtime.id]),
          });
        }
      }
    }
  }

  const changes = [...core.values()].map((c) => ({
    message: c.message,
    type: c.type,
    scope: c.scope,
    pr: c.pr,
    sha: c.sha,
    ambiguous: c.ambiguous,
    shippedIn: [...c.shippedIn],
  }));

  return {
    ...CORE,
    hasUpdates: changes.length > 0,
    // Core has no version of its own: rive-runtime publishes no releases, and the tags
    // it does cut (runtime-v0.1.191) increment per commit and mean nothing to a user.
    versionRange: null,
    derivedFrom: results.filter((r) => r.hasUpdates && RUNTIMES.find((c) => c.id === r.id)?.carriesCoreCommits).map((r) => r.id),
    editorCommitsExcluded: editorExcluded,
    changes,
  };
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

function loadState() {
  if (!existsSync(STATE_PATH)) return {};
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  } catch (err) {
    throw new Error(`state.json is not valid JSON: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Collection
// ---------------------------------------------------------------------------

async function collectRuntime(runtime, state, cutoffIso, baseline) {
  const warnings = [];
  const raw = await fetchVersions(runtime);

  const stable = [];
  for (const r of raw) {
    // Drop source-flagged prereleases before parsing. Unreal's `0.4.17t` builds are
    // all flagged prerelease upstream; parsing first would warn about 17 versions
    // per run that we were always going to discard. A warning that always fires is
    // one you learn to ignore, so only unparseable *stable* versions warn.
    if (r.prerelease) continue;
    const v = parseVersion(r.version);
    if (!v) {
      warnings.push(`Skipped unparseable stable version "${r.version}".`);
      continue;
    }
    // Semver-marked prereleases from registries with no flag (rive's 0.14.0-dev.14).
    if (v.prerelease !== null) continue;
    if (!r.publishedAt) {
      warnings.push(`Skipped ${r.version}: source reported no publish date.`);
      continue;
    }
    stable.push({ ...r, parsed: v });
  }
  stable.sort((a, b) => compareVersions(a.parsed, b.parsed));

  if (stable.length === 0) throw new Error(`${runtime.id}: no stable releases found`);

  const recorded = state[runtime.id]?.lastAnnouncedVersion ?? null;
  let selected = [];
  let baselineOnly = false;

  if (recorded) {
    // Has a base: pure version comparison. The date window is never consulted again.
    const base = parseVersion(recorded);
    if (!base) throw new Error(`${runtime.id}: state has unparseable version "${recorded}"`);
    selected = stable.filter((r) => compareVersions(r.parsed, base) > 0);
  } else {
    selected = stable.filter((r) => r.publishedAt > cutoffIso);
    // Baseline mode, for the very first entry only: a runtime that shipped nothing
    // inside the window still contributes its current version, so the inaugural entry
    // represents every runtime. Without this, advancing state would mark those versions
    // announced and they could never appear in any entry.
    if (selected.length === 0 && baseline) {
      selected = [stable[stable.length - 1]];
      baselineOnly = true;
    }
  }

  // Whatever selected the range, `previousVersion` is the stable release it follows on
  // from — not the recorded state, which in baseline mode is the version being announced.
  let previousVersion = recorded;
  if (selected.length > 0) {
    const firstIdx = stable.indexOf(selected[0]);
    previousVersion = firstIdx > 0 ? stable[firstIdx - 1].version : null;
  }

  const latest = stable[stable.length - 1];
  let releases = [];

  if (selected.length > 0) {
    const notes = await fetchNotes(runtime, selected, stable);
    releases = selected.map((r) => {
      const entry = notes.get(r.version) ?? { notes: '', url: null };
      const body = (entry.notes ?? '').trim();
      if (!body) {
        warnings.push(`${r.version}: no release notes found in the configured notes source.`);
      }
      return {
        version: r.version,
        publishedAt: r.publishedAt.slice(0, 10),
        // Best version-specific outbound link: the notes source's own link (a GitHub
        // release page, or the changelog's compare link) when it has one, otherwise the
        // registry version page. Always deep — never a repo's general releases index.
        url: entry.url ?? r.url,
        notes: body,
      };
    });
  }

  return {
    id: runtime.id,
    displayName: runtime.displayName,
    previousVersion,
    latestVersion: latest.version,
    hasUpdates: releases.length > 0,
    // True when this runtime shipped nothing in the window and is only present because
    // the first entry establishes a baseline. Worth mentioning as "current version".
    baselineOnly,
    versionRange:
      releases.length === 0
        ? null
        : releases.length === 1
          ? `v${releases[0].version}`
          : `v${releases[0].version}–v${releases[releases.length - 1].version}`,
    links: runtime.links,
    releases,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// docs.json runtime-version variables
//
// Install snippets across the docs hardcode a version (iOS `from: "6.13.0"`, Flutter
// `rive: ^0.14.x`, the web `<script>` tag). Left alone they rot. Instead the docs expose
// a `{{versionX}}` variable per runtime, and we sync each to the runtime's *latest
// available* version whenever we advance state — so the install docs move in lockstep
// with the changelog, in the same reviewed commit.
//
// `full` is the exact latest version; `major` (web only) is its major component, used by
// the "load v2" unpkg snippet. Only variables that already exist in docs.json are
// touched — adding one is a deliberate docs edit, not something this script guesses.
// ---------------------------------------------------------------------------

// Only runtimes whose docs pin a version get a variable. React and React Native install
// via npm "latest" with no pin, so there is nothing to keep current and they are
// deliberately absent.
const DOCS_VERSION_VARS = {
  apple: { full: 'versionApple' },
  android: { full: 'versionAndroid' },
  flutter: { full: 'versionFlutter' },
  // One version line covers every @rive-app web package (canvas, canvas-advanced,
  // webgl2, …); the docs expose it as the generalized {{versionWeb}}.
  web: { full: 'versionWeb', major: 'versionMajorWeb' },
  unity: { full: 'versionUnity' },
  unreal: { full: 'versionUnreal' },
};

// Compares docs.json's current variable values against each runtime's latest version and
// returns the list of variables that would change: [{ variable, from, to }].
function computeDocsVersionUpdates(runtimes, docsText) {
  const updates = [];
  const read = (name) => {
    const m = new RegExp(`"${name}"\\s*:\\s*"([^"]*)"`).exec(docsText);
    return m ? m[1] : null;
  };
  for (const r of runtimes) {
    const vars = DOCS_VERSION_VARS[r.id];
    if (!vars) continue;
    const targets = [
      [vars.full, r.latestVersion],
      vars.major ? [vars.major, r.latestVersion.split('.')[0]] : null,
    ].filter(Boolean);
    for (const [variable, to] of targets) {
      const from = read(variable);
      if (from === null) continue; // variable not declared in docs.json — don't invent it
      if (from !== to) updates.push({ variable, from, to });
    }
  }
  return updates;
}

// Applies the updates with a surgical per-variable replacement so the rest of docs.json —
// formatting, key order, trailing-newline state — is untouched.
function applyDocsVersionUpdates(updates) {
  const path = join(REPO_ROOT, 'docs.json');
  let text = readFileSync(path, 'utf8');
  for (const { variable, to } of updates) {
    text = text.replace(new RegExp(`("${variable}"\\s*:\\s*")[^"]*(")`), `$1${to}$2`);
  }
  writeFileSync(path, text);
}

function readDocsText() {
  try {
    return readFileSync(join(REPO_ROOT, 'docs.json'), 'utf8');
  } catch {
    return null; // docs.json is not required for collection to succeed
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// Second step, run once the changelog entry is written and reviewed. Reads the same
// release-data.json the entry was built from, so the recorded versions are exactly the
// announced ones — no network, no chance of drifting onto a newer release.
function advanceState() {
  if (!existsSync(OUT_PATH)) {
    console.error(`No ${OUT_PATH} found. Run the collector first.`);
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(OUT_PATH, 'utf8'));
  const state = loadState();
  const next = { ...state };
  const announcedAt = data.announcementDate;

  for (const r of data.runtimes) {
    next[r.id] = {
      lastAnnouncedVersion: r.latestVersion,
      // Runtimes with nothing new keep their original announcement date; only the
      // baseline moves, recording that we considered and skipped them.
      announcedAt: r.hasUpdates ? announcedAt : (state[r.id]?.announcedAt ?? announcedAt),
    };
  }

  writeFileSync(STATE_PATH, JSON.stringify(next, null, 2) + '\n');
  console.log(`Recorded announcement state for ${data.runtimes.length} runtimes:`);
  for (const r of data.runtimes) {
    const note = r.hasUpdates ? `announced ${r.versionRange}` : 'no updates; baseline only';
    console.log(`  ${r.displayName.padEnd(13)} -> ${r.latestVersion}  (${note})`);
  }
  console.log(`\nWrote ${STATE_PATH.replace(REPO_ROOT + '/', '')}`);

  // Sync the docs install-version variables to the latest available versions, so the docs
  // move with the changelog in one commit. Uses latestVersion (what a reader should
  // install) for every runtime, not only the ones with a changelog entry this cycle.
  const docsText = readDocsText();
  const docsUpdates = docsText ? computeDocsVersionUpdates(data.runtimes, docsText) : [];
  if (docsUpdates.length > 0) {
    applyDocsVersionUpdates(docsUpdates);
    console.log('\nUpdated docs.json runtime versions:');
    for (const u of docsUpdates) console.log(`  ${u.variable.padEnd(20)} ${u.from} -> ${u.to}`);
    console.log(`Wrote docs.json`);
  } else {
    console.log('\ndocs.json runtime versions already current.');
  }

  console.log('\nNothing was committed or pushed. Review with: git diff');
}

// Reads `--flag N` as a positive integer, or returns the fallback when absent.
function readIntArg(name, fallback) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  const v = Number(process.argv[i + 1]);
  if (!Number.isInteger(v) || v <= 0) throw new Error(`${name} needs a positive integer`);
  return v;
}

async function main() {
  if (process.argv.includes('--advance-state')) return advanceState();

  const baseline = process.argv.includes('--baseline');
  const bootstrapDays = readIntArg('--bootstrap-days', DEFAULT_BOOTSTRAP_DAYS);
  const now = new Date();
  const cutoff = new Date(now.getTime() - bootstrapDays * 86_400_000);
  const cutoffIso = cutoff.toISOString();
  const state = loadState();

  if (baseline && Object.keys(state).length > 0) {
    console.error('--baseline is only for the very first entry, but state.json already');
    console.error('has entries. Once a runtime has a base, its range is decided by version');
    console.error('comparison and this flag would re-announce a shipped version.');
    process.exit(1);
  }

  console.log('Rive runtime release collector');
  console.log(`  today:     ${localDate(now)}`);
  console.log(`  first-run lookback: releases after ${localDate(cutoff)} (${bootstrapDays}d, first entry only)`);
  if (baseline) {
    console.log('  baseline:  quiet runtimes contribute their current version (first entry only)');
  }
  console.log('');

  // All-or-nothing: a half-collected announcement is worse than none.
  const results = [];
  const failures = [];
  for (const runtime of RUNTIMES) {
    try {
      results.push(await collectRuntime(runtime, state, cutoffIso, baseline));
    } catch (err) {
      failures.push(`${runtime.id}: ${err.message}`);
    }
  }

  if (failures.length > 0) {
    console.error('Collection failed:');
    for (const f of failures) console.error(`  ${f}`);
    console.error('\nNo files were written.');
    process.exit(1);
  }

  for (const r of results) {
    if (!r.hasUpdates) {
      console.log(`  ${r.displayName.padEnd(8)} no new stable releases (latest ${r.latestVersion})`);
    } else {
      const from = r.previousVersion ?? 'none';
      const tag = r.baselineOnly ? '  (baseline: current version, nothing new in window)' : '';
      console.log(`  ${r.displayName.padEnd(13)} ${from} -> ${r.latestVersion}${tag}`);
      for (const rel of r.releases) console.log(`           ${rel.version}  ${rel.publishedAt}`);
    }
    for (const w of r.warnings) console.log(`           ! ${w}`);
  }
  console.log('');

  // Read-only preview of the docs.json version bumps that --advance-state will apply, so
  // the reviewer sees them before approving. Nothing is written here.
  const docsText = readDocsText();
  const docsUpdates = docsText ? computeDocsVersionUpdates(results, docsText) : [];
  if (docsUpdates.length > 0) {
    console.log('  docs.json version variables that --advance-state will update:');
    for (const u of docsUpdates) console.log(`    ${u.variable.padEnd(20)} ${u.from} -> ${u.to}`);
    console.log('');
  }

  const updated = results.filter((r) => r.hasUpdates);
  if (updated.length === 0) {
    console.log('No new stable runtime releases were found. No files were modified.');
    return;
  }

  const core = deriveCore(results);
  if (core.hasUpdates) {
    const shared = core.changes.filter((c) => c.shippedIn.length > 1).length;
    console.log(
      `  Core     ${core.changes.length} shared change(s) from ${core.derivedFrom.join(', ')}` +
        ` (${shared} in more than one runtime; ${core.editorCommitsExcluded} editor commit(s) excluded)`,
    );
    console.log('');
  }

  const data = {
    generatedAt: now.toISOString(),
    // The date the entry should carry, in the author's local calendar. Use this for
    // the <Update> label, not generatedAt.
    announcementDate: localDate(now),
    window: { from: localDate(cutoff), to: localDate(now) },
    docsVersionUpdates: docsUpdates,
    core,
    runtimes: results,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH.replace(REPO_ROOT + '/', '')}`);
  console.log(`\n${updated.length} runtime(s) have updates. State was not changed.`);
  console.log('Write the changelog entry, then record it with: --advance-state');
}

main().catch((err) => {
  console.error(`\nUnexpected failure: ${err.message}`);
  process.exit(1);
});
