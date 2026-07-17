---
name: runtime-announcement
description: Write the fortnightly Rive runtime update entry in runtimes/changelog.mdx. Use when the user asks to generate, draft, or publish a runtime changelog entry, runtime update announcement, or "what shipped in the runtimes" post.
---

# Runtime update announcement

You turn collected release notes into one changelog entry. You do **not** decide what
shipped — `scripts/runtime-changelog/collect.mjs` already did, from the package
registries and repos. Never add a version, date, or URL that isn't in its output, and
never "check GitHub" to fill a gap. A gap is a finding to report, not one to fill.

## Workflow

The whole run is: **collect → draft → review → approve → record → (user commits) →
share.** Facts come from the collector; you own only the prose; the user owns approval
and the commit. Walk it in order.

1. **Collect.** Run `node scripts/runtime-changelog/collect.mjs`. It only writes
   `scripts/runtime-changelog/generated/release-data.json`; it never touches state.
   If it reports no new releases, stop and tell the user. Don't write an entry.
   (`--baseline` exists only for the very first entry, when `state.json` does not yet
   exist; the script refuses it once any state is recorded. You will not normally use it.)
2. **Read.** Read `generated/release-data.json` in full — including every `notes` body
   and `data.core`, not just the version list.
3. **Draft.** Write the entry per the format and editorial rules below.
4. **Insert.** Place it in `runtimes/changelog.mdx` immediately after the
   `{/* RUNTIME_UPDATE_INSERTION_POINT ... */}` line, so newest sits first. Leave the
   marker in place and change nothing else on the page. If the marker is gone, stop and
   ask — don't guess where the entry belongs.
5. **Preview for review.** Show the user the entry, any `warnings`, and the
   `docsVersionUpdates` (the `docs.json` install-version bumps queued for step 6). Also run
   `node scripts/runtime-changelog/digest.mjs --since <window
   start>` and show that too — reviewing the docs entry and the community post together
   catches wording that reads fine on the page but oddly out of context. The digest reads
   the file on disk, so it reflects the draft you just wrote. Say plainly nothing is
   committed and no state has moved.
6. **Record — only after they approve.** Run
   `node scripts/runtime-changelog/collect.mjs --advance-state`. This does two things:
   records what was announced into `state.json`, and syncs the docs install-version
   variables in `docs.json` (`versionApple`, `versionAndroid`, …) to each runtime's
   latest version. Never run it before approval: state is the boundary for the *next*
   entry, so advancing it early silently skips releases forever. It writes the two files
   but does not commit. The collect step (1) already previewed the `docs.json` bumps.
7. **Hand off the commit.** Tell the user to commit `runtimes/changelog.mdx`,
   `scripts/runtime-changelog/state.json`, and `docs.json` **together** (one logical
   change), after running `mint broken-links`. Never commit, push, or open a PR yourself.
8. **Share.** When they want the community post, run
   `node scripts/runtime-changelog/digest.mjs --since <window start>`. It reassembles the
   changelog into one markdown post grouped by runtime, inheriting the reviewed prose and
   the deep per-release links — so the shared post can never diverge from the published
   page. The post prints to stdout (show it to the user) and is saved to
   `scripts/runtime-changelog/generated/community-post.md` (git-ignored). **Tell the user
   that path** so they know where to grab it; that file is for copy-pasting into
   Discord/forum/email and must not be committed. Generate it from the finalized entry,
   never from raw collected data.

## Format

The label is the permalink anchor and cannot be changed later without breaking inbound
links — use `Month D, YYYY` and never edit a published one. Tag every entry with exactly
the runtimes it covers: tags are AND-filtered, and an untagged entry disappears the
moment a reader filters by anything.

```mdx
<Update label="July 17, 2026" description="Apple, Android, Web, React, React Native, Unreal" tags={["Apple", "Android", "Web", "React", "React Native", "Unreal"]}>

## Core runtime

- Fixed the Lua `Data` global being `nil` in scripts, which broke script-driven view model instance creation.

Shipped in the Apple, Android, and Web releases below.

[Core runtime](https://github.com/rive-app/rive-runtime)

## Apple v6.21.1

- …

[Apple release notes](https://github.com/rive-app/rive-ios/releases)

</Update>
```

Rules:

- `## Core runtime` comes first, with no version (see the core section below). Then one
  `##` heading per runtime, `## <Runtime> <versionRange>`, using `displayName` and
  `versionRange` verbatim from the JSON. Each heading becomes its own RSS entry, which
  is why the version belongs in the heading — `## Android v11.7.2` is a good feed title,
  `## Android` is not.
- Order runtime sections by how much users care: Apple, Android, Web, React,
  React Native, Flutter, Unity, Unreal. Omit any runtime with `hasUpdates: false`
  entirely.
- Close each section with a **version-specific** link, never a repo's general releases
  index. Every release in `release-data.json` carries a deep `url` already: a GitHub
  release-tag page, a pub.dev version page, or a GitHub compare link. Use those.
  - Single version: `[Apple v6.21.1 release notes](<that release's url>)`.
  - A range (e.g. React Native's five releases): list each version's link on one line,
    `Releases: [v0.4.14](url) · [v0.4.15](url) · …`, so each points at its own notes.
  - `links.releases` (the general index) is only a fallback if a release somehow has no
    `url`, which should not happen.
- `description` and `tags` list the shipping runtimes covered, comma-separated. Core is
  not a tag — it isn't something anyone installs, and it appears in nearly every entry,
  so it would be a useless filter.
- Don't set `mode` in the page frontmatter and don't add an `rss` prop to the `<Update>`
  — both suppress features we want.

## Editorial rules

Write for a developer deciding whether to upgrade. Technical, plain, no marketing. Lead
each section with what matters most: breaking changes and migrations first, then new
APIs, then meaningful fixes, then everything else.

Include only what the source notes support. If notes say "fixed a crash," don't write
"major stability improvements." If something is ambiguous, keep the source's neutral
wording or flag it to the user — never resolve ambiguity by inventing detail.

Never drop a breaking change, even a small one. If the notes hint at one and you're
unsure, surface it to the user rather than omitting it.

Cut entirely: CI and release plumbing, dependency bumps with no user impact, formatting,
internal refactors with no stated effect. `pin npm down to v11 as latest compatible
version for our node runner` is not an announcement.

Collapse consecutive versions. Five patch releases in a fortnight usually contain one or
two things a user cares about — write those, not five sections. Never pad a section to
make a runtime look busy; a runtime with one real fix gets one bullet.

## How the version range is decided

`scripts/runtime-changelog/state.json` is the committed record of the last version
announced per runtime. It is the boundary for the next entry, which is why it must be
committed in the **same commit** as the entry it describes — and why you never advance it
before the user approves.

Once a runtime has a recorded version, its range is pure version comparison up to the
latest published release. The two-week window is bootstrap-only and is never consulted
again for that runtime. A runtime added to the config later has no state, so it
bootstraps from the window on its first run — it will not dump its whole history.

A runtime marked `baselineOnly: true` shipped nothing in the window and is present only
because the first entry establishes a starting point. Say so plainly in its section
("The current Flutter release, included here to set a starting point for this
changelog") rather than implying it just shipped.

## The core section

`data.core` holds changes to the shared C++ runtime (`rive-app/rive-runtime`). It is
**derived, not collected**: that repo publishes no releases, so the collector
reconstructs core changes from the upstream commits that Apple, Android and Web each
vendored into a shipped release. Two consequences:

- Every core change listed has, by construction, actually shipped in a released runtime.
  Do not go read `rive-runtime`'s `main` branch to fill gaps — it contains unreleased
  work, and announcing that repeats the Flutter `## Upcoming` mistake.
- `## Core runtime` carries **no version**. rive-runtime cuts a tag per commit
  (`runtime-v0.1.191`); those numbers are meaningless to users. Don't invent a range.

Each change has `shippedIn` (which runtimes carried it), `scope`, `type`, and `pr`. Most
are in more than one runtime — that is the whole point of the section. State plainly
which releases carry them, e.g. "Shipped in the Apple, Android, and Web releases below",
using `derivedFrom`.

**Never repeat a core change inside a runtime's own section.** If Core says the Lua
`Data` global was fixed, Apple's section must not say it again. A runtime's section
covers only its `platformChanges` plus any genuinely platform-specific curated notes.
This is why a runtime section may be very short — Android often has one or two real
changes of its own. That is honest; do not pad it.

Editor-only commits are already excluded by the collector. A change marked
`ambiguous: true` had a mixed scope like `fix(editor and runtime)` — decide whether the
runtime-facing half is worth announcing, and say so when you report back.

Core's outbound link is the `rive-app/rive-runtime` repo, since it has no releases yet.
**Future:** rive-runtime will publish official releases, at which point every runtime
will vendor a named core version and Core can link that specific version (and each
runtime section can state which core version it carries). Don't build for that now — a
plain repo link is correct until those releases exist.

Core still contains plenty of noise the collector deliberately does not judge: `chore`,
`perf(tests)`, `fix(build)`, CI, and test-harness work. Cut it. `perf(tests): Spawn
image_diff.py only once per job` is not an announcement.

## Runtimes wrap other runtimes — do not double-report

This is the easiest way to write a bad entry. Several runtimes are thin wrappers, so
their release notes are mostly *bumps of a runtime already covered elsewhere in the
same entry*:

- **React** wraps the Web (`rive-wasm`) runtime. A React release is often only
  `chore(react): bump js runtime to 2.38.5`.
- **React Native** wraps Android and Apple: `bump rive-android to 11.7.1 and rive-ios
  to 6.21.0`.
- **Flutter** wraps `rive_native`: `Bumps to rive_native: 0.1.9`.

When a wrapper's only changes are bumps of something else in this entry, say so in one
line and link across — don't restate the wrapped runtime's changes under the wrapper's
heading. Something like "Updated to the Rive JS runtime 2.38.5 (see Web above)" is
right. Restating Web's fixes under React is wrong: it reads as separate work, and it
inflates the entry.

If a wrapper *also* has its own changes (a new hook, a platform-specific fix), those are
the real content — lead with them and treat the bump as a footnote.

## Per-source quirks

The collector already picks the correct source per runtime, but the notes it hands you
vary wildly in shape and quality:

- **Apple** — hand-written prose with `## Added` / `## Fixed`. Highest quality; mostly
  needs condensing, not rewriting.
- **Unreal**, **Unity** — hand-written prose. Unreal notes may carry a `## Known Issues`
  section; that is worth surfacing.
- **Android** — a raw commit list (`fix(Android): Add dirtying to VMI triggers (#13051)`).
  Not user-facing English. Translate into what a developer would notice, and if a commit
  is too internal to explain in user terms, drop it rather than paraphrasing the commit
  message back. Read the linked PR or the Rive docs if you need to understand a term
  before writing about it.
- **Web** (`rive-wasm`) — a raw dump of the **whole monorepo's** commits. It contains
  work that never touched the web runtime at all: `feat(apple): add semantics support`,
  `feature (Unreal) Ore Support`, `chore(editor): add view model uses to dependencies
  panel`. Include only what affects the web runtime. This one needs the most filtering.
- **React** — `auto-changelog` output, one commit line per version, usually just a
  runtime bump. See the wrapper rule above.
- **React Native** — `semantic-release` output, conventional-commit bullets. Ships very
  often; expect to collapse several versions hard.
- **Flutter** — notes come from the version published to pub.dev, which is the only
  correctly-versioned copy. Do not read `CHANGELOG.md` on `master`: it keeps released
  notes under `## Upcoming` and appends unreleased work to that same block, so it will
  hand you changes nobody can install yet.

## Reporting back

Along with the entry, tell the user:

- any `warnings` on a runtime;
- the `docsVersionUpdates` the collector reported — the `docs.json` install-version
  variables that `--advance-state` will bump (e.g. `versionApple 6.13.0 -> 6.21.1`). These
  are applied automatically on approval; just surface them so the reviewer knows the docs
  install snippets are moving too;
- anything you deliberately cut that they might expect to see;
- anything ambiguous you had to make a judgment call on.
