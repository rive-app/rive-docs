# Contributing

Welcome to the official repository for Rive's documentation, available at [https://rive.app/docs](https://rive.app/docs).

We welcome any and all external contributions.

Before you start making any changes, check out the [STYLEGUIDE.md](./STYLEGUIDE.md).

## How to contribute

### 1. Find something to work on

Start with the [Contributing backlog](https://github.com/rive-app/rive-docs/issues/725) or browse issues labeled [good first issue]((https://github.com/rive-app/rive-docs/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)).

Before starting, comment on the issue to claim it.

### 2. Fork the repository

[Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the [rive-app/rive-docs](https://github.com/rive-app/rive-docs) repository to your GitHub account.

After forking, clone your fork locally and create a branch from main.

```bash
git clone https://github.com/YOUR_USERNAME/rive-docs.git
cd rive-docs
git checkout main
git pull origin main
git checkout -b docs/my-change
```

### 3. Make your changes

Make your updates in the relevant documentation files.

### 4. Preview your changes

Rive uses [Mintlify](https://mintlify.com) for documentation. Follow Mintlify's [Local Development](https://www.mintlify.com/docs/quickstart#make-your-first-change) guide to set up your local environment for previewing your changes locally.

### 5. Commit your changes

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

For most documentation changes, use the docs type.

```bash
git add .
git commit -m "docs(editor): update hierarchy documentation"
```

### 6. Open a pull request

Push your branch to your fork and open a pull request against rive-app/rive-docs.

```bash
git push origin docs/my-change
```

When creating your pull request, make sure `main` is selected as the base branch.

Your pull request should include:

- A clear title that summarizes the full change
- A brief description of what changed
- Links to any related issues
- Screenshots or preview links, when helpful

### 7. Review and merge

Reviewers will automatically be assigned following the assignments in [CODEOWNERS](/.github/CODEOWNERS).

After your pull request is approved, the Rive team will merge it. Commits are squashed when merging, so make sure your pull request title clearly summarizes the full change.
