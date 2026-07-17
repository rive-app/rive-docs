# Runtime changelog tooling

Generates the fortnightly [runtime changelog](../../runtimes/changelog.mdx) entry and a
copy-paste community announcement, from the runtimes' own releases.

Two responsibilities, kept apart on purpose:

- **`collect.mjs`** — deterministic. Decides *what shipped* by reading the package
  registries and GitHub, and owns every version, date and URL. No AI.
- **the `runtime-announcement` skill** — editorial. Turns the collected notes into prose.
  This is the only step that uses judgment, and every run is human-reviewed.
- **`digest.mjs`** — deterministic. Reassembles the *committed changelog* into a shareable
  post. It reformats reviewed prose; it never re-summarizes.

`state.json` (committed) records the last version announced per runtime. It is the
boundary for the next entry. `generated/` is throwaway and git-ignored.

Requires Node 18+. No dependencies, no build, no `package.json`.

---

## The two-minute version

```bash
# 1. Drive the whole thing through Claude Code — this is the normal path:
#    open the repo and run the slash command, or just ask.
/runtime-announcement
```

Claude will collect releases, draft the entry into `runtimes/changelog.mdx`, show it to
you alongside a preview of the community post, and wait. When you approve, it records
state. You review the diff, run the link check, and commit. Then ask it for the share
post. That's it — the sections below are for when you want to run a step by hand.

---

## Running it by hand

### 1. Collect what shipped

```bash
node scripts/runtime-changelog/collect.mjs
```

Prints a per-runtime summary and writes `generated/release-data.json`. Safe to run any
time: it never changes `state.json`, never commits. If nothing new shipped it says so and
exits 0.

### 2. Write the entry

This is the editorial step — let the skill do it (`/runtime-announcement`), since it
carries all the rules about which sources are noisy, how the shared "Core runtime"
section is derived, and what to cut. Doing it fully by hand means re-deriving that.

### 3. Preview before committing

```bash
mint dev                         # see it render, try the runtime filters
node scripts/runtime-changelog/digest.mjs --since <YYYY-MM-DD>   # preview the share post
git diff runtimes/changelog.mdx  # exactly what changed
```

### 4. Record what was announced

```bash
node scripts/runtime-changelog/collect.mjs --advance-state
```

Reads `generated/release-data.json` (no network) and does two things: advances
`state.json` to the versions in it, and syncs the `docs.json` install-version variables
(`versionApple`, `versionAndroid`, `versionFlutter`, `versionWeb`, `versionUnity`) to each runtime's
latest version — so the install snippets across the docs never go stale. The collect step
previews these bumps first. **Only run this once the entry is finalized** — it sets the
starting point for the next entry, so running it early would skip those releases forever.

The version variables live in `docs.json` under `variables`. To wire one into a docs page,
reference it as `{{versionApple}}` in the snippet (as `runtimes/apple/apple.mdx` and the
web `<script>` tag do). The collector only updates variables that already exist — adding a
new one is a deliberate `docs.json` edit.

### 5. Commit — the entry and the state together

```bash
mint broken-links
git add runtimes/changelog.mdx scripts/runtime-changelog/state.json
git commit -m "docs(runtimes): runtime changelog for <date>"
```

They are one logical change: the entry is what you announced, the state is the record of
it. Committing one without the other either re-announces or skips.

### 6. Generate the community share post

```bash
node scripts/runtime-changelog/digest.mjs --since <YYYY-MM-DD>
```

`--since` sets the window start (defaults to the last 14 days); `--until` optionally sets
the end. It groups every changelog entry in the window into one markdown post by runtime,
Core first, and inherits the deep per-release links.

The post prints to your terminal **and** is saved to `generated/community-post.md`
(git-ignored, next to `release-data.json`); the script prints that path when it finishes.
Copy it into Discord, a forum post, or an email — it's a share artifact, never committed.
Pass `--out <path>` to save somewhere else instead.

---

## Adding a runtime

Edit the `RUNTIMES` array in `collect.mjs`. Each entry declares a `versions` source (the
authoritative record of what published) and a `notes` source (where the prose lives) —
they are separate because for several runtimes they genuinely are. Supported source
types: `github-releases`, `pub`, `npm` for versions; `github-releases`,
`github-changelog-md` (with a `headingLevel`), `pub-archive-changelog` for notes. A new
runtime has no state, so its first run bootstraps from the 14-day window rather than
dumping its whole history.

Verify the source before trusting it — several Rive repos publish releases that lag their
real versions (see the comments in `collect.mjs`).

## First-ever entry

Only when `state.json` does not yet exist:

```bash
node scripts/runtime-changelog/collect.mjs --baseline
```

`--baseline` makes runtimes that shipped nothing in the window still contribute their
current version, so the inaugural entry represents every runtime. The script refuses the
flag once any state is recorded.
