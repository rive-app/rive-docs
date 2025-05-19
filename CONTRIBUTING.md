# Contributing

Welcome to the official repository for Rive's documentation, available at [https://rive.app/docs](https://rive.app/docs). Below are details for those interested in contributing to our documentation.

## Forking

Before creating your pull request, make sure to [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the [rive-app/rive-docs](https://github.com/rive-app/rive-docs) repository, and branch off of `main`.

## Images

When adding images, add them to the `images` folder, in a subdirectory similar to the file structure for documentation.

When naming images, use a descriptive name relative to the functionality you are documenting.

When embedding images, make sure to add descriptive [alt-text](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images).

### Example Image Directories:

- All runtimes: `images/runtimes/my-image.jpg`
- All game runtimes: `images/game-runtimes/my-image.jpg`
- iOS: `images/runtimes/apple/my-image.jpg`
- Android: `images/runtimes/android/my-image.jpg`
- Web: `images/runtimes/web/my-image.jpg`
- Unity: `images/game-runtimes/unity/my-image.jpg`
- Unreal: `images/game-runtimes/unreal/my-image.jpg`


### Links:

When adding links to another page within the documentation, make sure the url is relative to the root.

```js
// Don't
[Hierarchy](../editor/interface-overview/hierarchy)

// Do
[Hierarchy](/editor/interface-overview/hierarchy)
```

## Making Commits

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

When selecting a type, select one that is applicable to the changes you made. Since this is a repository for documentation, it's likely that you'll use `docs` consistently.

### Types

Below are some suggestions for a Conventional Commit message type to use when writing your commit message.

- `docs`: Used when adding or updating documentation.
- `project`: Used when making documentation-wide changes, such as updates to `mint.json`.
- `fix`: Used when making fixes to existing documentation, such as broken links.

### Scopes

Below are some suggestions for a Conventional Commit message scope to use when writing your commit message.

- `editor`: Changes that apply to the editor as a whole.
- `runtimes`: Changes that apply to (most) runtimes as a whole.
- `ios`: Changes that apply to the Apple runtimes.
- `android`: Changes that apply to the Android runtime.
- `game-runtimes`: Changes that apply to (most) game runtimes as a whole.
- `unity`: Changes that apply to the Unity runtime.
- `unreal`: Changes that apply to the Unreal runtime.

The basic scope naming convention for the runtimes is to use the root directory of a change if the change applies to more than one runtime, otherwise use the name of the runtime. Otherwise, the basic scope naming convention is to use the root directory (e.g `editor` or `getting-started`).

## Previews

Rive's documentation is powered by [Mintlify](https://mintlify.com). You can preview your changes [locally](https://mintlify.com/docs/development), or via a preview link after creating a pull request.

### Local Previews

See Mintlify's official documentation on [Local Development](https://mintlify.com/docs/development) for more information on how to preview changes locally.

When previewing locally, make sure to run `mintlify broken-links` before creating your pull request to verify that there are no broken links.

### Preview Links

After creating a pull request, Mintlify will automatically create and deploy a staging URL. You can then preview your changes by clicking **View Deployment**.

![Mintlify Staging Deployment](https://github.com/user-attachments/assets/5dbb590b-33f8-438d-95f1-30207119c2f6)

## Creating your Pull Request

When creating a pull request, ensure that `main` is selected as the base branch. Your pull request title should follow the same naming convention as commits; the difference here is that the pull request title should acknowledge all changes as a whole.

In addition to a good pull request title, ensure that your pull request description contains a (brief) overview of all changes made. When merging, all commits will be squashed, and the pull request title will be used as the squash commit message by default, and the pull request description will be the commit body.

## Requesting a Review

Reviewers will automatically be assigned following the assignments in [CODEOWNERS](.github/CODEOWNERS).

## Merging

Once reviewed, if approved, the Rive team will handle merging the pull request. Commits will be squashed when merging, so make sure to follow the tips outlined in [Creating your Pull Request](#creating-your-pull-request).
