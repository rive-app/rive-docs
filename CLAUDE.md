# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the official documentation repository for Rive (https://rive.app/docs), built using Mintlify. The documentation covers the Rive Editor, App Runtimes (Web, React, Flutter, Apple, Android, React Native), Game Runtimes (Unity, Unreal, Defold), Scripting API, and various community resources.

## Development Commands

### Setup
```bash
npm i -g mintlify
```

### Local Preview
```bash
mintlify dev
```
Run this from the repository root (where docs.json is located). The preview will be available at http://localhost:3000.

### Link Validation
```bash
mintlify broken-links
```
Always run this before creating a pull request to verify there are no broken links.

### Troubleshooting
- If `mintlify dev` isn't running, run `mintlify install` to re-install dependencies
- Make sure you're running commands from the repository root directory

## Architecture

### Documentation Structure

The documentation is organized into platform-specific sections:

- **editor/** - Rive Editor documentation (interface, fundamentals, state machines, layouts, constraints, etc.)
- **runtimes/** - App runtime documentation for web/mobile platforms
  - Platform-specific subdirectories: apple/, android/, web/, react/, react-native/, flutter/
  - Shared runtime docs at the root level (state-machines.mdx, loading-assets.mdx, etc.)
- **game-runtimes/** - Game engine runtime documentation
  - Engine-specific subdirectories: unity/, unreal/
  - Includes defold.mdx for Defold engine
- **scripting/** - Rive Scripting API documentation
- **getting-started/** - Introduction and quick start guides
- **community/** - Community resources and marketplace
- **account-admin/** - Account and workspace management
- **images/** - All documentation images, organized by category (e.g., images/runtimes/, images/game-runtimes/unity/)
- **snippets/** - Reusable content snippets used across multiple pages
- **api-reference/** - API reference documentation

### Configuration

- **docs.json** - Main Mintlify configuration file defining navigation structure, theme, colors, redirects, and all documentation tabs/groups/pages
- The navigation structure in docs.json mirrors the directory structure but defines the exact order and grouping

## Content Guidelines

### Images

- Store images in `/images/` with subdirectories matching the documentation structure
- Use descriptive filenames relative to the functionality being documented
- Always include descriptive alt-text when embedding images

Example image paths:
- All runtimes: `images/runtimes/my-image.jpg`
- iOS: `images/runtimes/apple/my-image.jpg`
- Unity: `images/game-runtimes/unity/my-image.jpg`

### Links

Use absolute paths from root, not relative paths:
```markdown
✓ [Hierarchy](/editor/interface-overview/hierarchy)
✗ [Hierarchy](../editor/interface-overview/hierarchy)
```

### Commit Messages

Follow Conventional Commits specification:

Common types:
- `docs` - Adding or updating documentation
- `fix` - Fixing broken links or errors
- `project` - Documentation-wide changes (e.g., updates to docs.json)

Common scopes:
- `editor` - Editor-related changes
- `runtimes` - Changes to most runtimes
- `ios`, `android`, `flutter`, `web`, `react`, `react-native` - Platform-specific changes
- `game-runtimes` - Changes to most game runtimes
- `unity`, `unreal` - Game engine-specific changes

Examples:
```
docs(flutter): update migration guide
fix(web): correct broken quickstart link
project: update navigation structure
```

## Pull Request Workflow

1. Fork the repository and branch from `main`
2. Make your changes following the content guidelines
3. Preview locally with `mintlify dev`
4. Run `mintlify broken-links` to verify no broken links
5. Create PR with:
   - Title following Conventional Commits format
   - Description summarizing all changes
   - Base branch set to `main`
6. Reviewers will be auto-assigned via CODEOWNERS
7. Mintlify will create a staging deployment - use "View Deployment" to preview
8. Rive team will squash and merge approved PRs
