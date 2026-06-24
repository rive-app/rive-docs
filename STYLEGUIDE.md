# Style Guide

## Principles
## Page Types
## Page Structure
## Voice and Tone

### Action Verbs

- **Click:** buttons, icons, links
- **Select:** options, dropdown items, tabs
- **Open:** menus, panels, files, pages
- **Enter:** text fields
- **Press:** keyboard keys
- **Toggle:** on/off controls
- **Drag:** pointer movement

## Page Title & Metadata

Use [frontmatter](https://www.mintlify.com/docs/organize/pages) to define the page title, sidebar title, and page description.

* Every page should include a `title`.
* Use `description` as the page subheading. Keep it short and specific.
* Use `sidebarTitle` when the full page title is too long for the sidebar.

```md
---
title: "Creating a Workspace"
sidebarTitle: "Creating Workspaces"
description: "Create a separate workspace for a team, client, or project."
---
```

## Section Headings

Use headings to organize the page and make it easy to scan.

- Use `##` for top-level page sections.
- Use heading levels in order. Don't skip from `##` to `####`.
- Avoid going past `####`.
- Use title case for headings.
- Prefer gerunds for task-based headings, such as **Creating Shapes** instead of **Create Shapes**.


## Steps

Use `<Steps>` for procedural instructions.

* Each step should complete one user goal, even if that step includes multiple small actions.
* Start each step with an action verb, such as **Click**, **Select**, **Open**, **Enter**, **Choose**, **Drag**, **Press**, or **Toggle**.
* Use exact UI labels.
* Bold visible UI labels, such as buttons, panels, tabs, and menu items.
* Avoid explaining concepts inside steps unless the explanation is needed to complete the task.
* Put optional details, warnings, and troubleshooting notes in callouts.
* Put screenshots or videos after the steps unless the visual introduces the concept before the user starts.

```md
<Steps>
  <Step>
    Open the **Workspace** dropdown and select **+ New Workspace**.
  </Step>
  <Step>
    Enter a workspace name, invite members, and click **Create**.
  </Step>
</Steps>
```


## UI Labels and Formatting
## Links

## Callouts

Use callouts to surface information that would interrupt the main flow.

- `<Tip>`: helpful advice, shortcuts, or optional best practices.
- `<Note>`: important context the user should know before continuing.
- `<Info>`: related information, links, or secondary details that support the main content.
- `<Warning>`: risks or consequences, such as data loss, billing changes, accidental keys, or broken runtime behavior.

Put callouts close to the step or section they apply to. If the information is required to avoid a mistake, place it before the risky action.

## Assets

### Naming & Alt Text

- Use kebab-case (my-image.png)
- Give each image a logical name and alt text `![IK constraint](/images/editor/constraints/ik-constraint.png)`


### GIFs and Videos

### Rive Files

## Code Blocks

Prefer short, focused snippets over full files unless the surrounding setup is required.

Wrap code examples in fenced code blocks and include the language name.

When showing longer examples, highlight the most relevant lines.

````mdx
```js highlight={2,3}
const rive = new Rive({
  src: "example.riv",
  autoplay: true,
});
```
````

Use comments to explain important or non-obvious parts of the code. Avoid comments that repeat what the code already says.

When possible, link to a relevant, working example.


## Tables

## Examples

Use examples to make abstract concepts concrete.

- Keep examples small and focused.
Use realistic names instead of generic - placeholders when it improves clarity.
- Avoid examples that require too much setup.
- Avoid introducing unrelated concepts in an example.
- Show the result or expected behavior when possible.
- Link to a complete working example when the snippet is only part of a larger workflow.

Wrap examples in the `UseCase` snippet.

```mdx
import { UseCase } from '/snippets/use-case.mdx'

<UseCase
  title="Tracking Positions"
>
  Let's say you have a walk cycle...
</UseCase>
```

## Accessibility
## Navigation

Organize docs by user task or concept, not only by UI location.

- Add pages to the sidebar only when they are useful entry points.
  - Keep overview pages high-level and link to deeper pages for details.
- Place detailed tool behavior on the page where users are most likely to need it.
  - Use supporting pages for concepts, warnings, or troubleshooting that need a canonical link but do not need to appear in the sidebar.
  - Cross-link related pages so users can move between concepts, tasks, and references.
  - For example, explain where the Toolbar is in the interface overview, but document the Pen Tool on the drawing page where users are learning to create paths.

## Deprecated Features
## Platform and Availability Notes
## File Naming