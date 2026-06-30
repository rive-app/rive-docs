# Style Guide

## Principles

- Start with a conceptual overview that explains what the feature is and why it matters.
- Focus each page on one primary user need. If a page starts covering multiple unrelated tasks, split it into separate pages or turn it into an overview that links to focused task pages.


## Voice and Tone

- Be direct and plainspoken.
- Prefer active voice.
- Use “you” when giving instructions.
- Avoid marketing language.
- Avoid “simply,” “just,” “obviously,” and “easy.”
- Prefer “want” over “would like.”
- Prefer “use” over “utilize.”

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
* Use `description` as meta description AND the page subheading. Keep it short and specific.
* Use `sidebarTitle` when the full page title is too long for the sidebar.

```md
---
title: "Creating Workspaces in rive"
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

## UI Labels and Product Terms

- Bold visible UI labels, buttons, panels, and menu items: **Create New Workspace**, **State Machine**, **Inspector**.
- Don't bold or capitalize when talking about a concept. Ex: Open the **State Machine Graph** and create a new state machine.
- Match the UI capitalization when referring to exact labels.
- Use the exact product term the first time it appears. Use a shorter, natural term after that if the meaning is clear. For example, use **Data Binding Preview Toggle** the first time, then “preview toggle” later.

## Steps

Use `<Steps>` for procedural instructions.

- Step-by-step instructions go after conceptual overview and other information.
- Each step should complete one user goal, even if that step includes multiple small actions.
- Start each step with an action verb, such as **Click**, **Select**, **Open**, **Enter**, **Choose**, **Drag**, **Press**, or **Toggle**.
- Avoid explaining concepts inside steps unless the explanation is needed to complete the task.
- Put optional details, warnings, and troubleshooting notes in callouts.
- Put screenshots or videos after the steps unless the visual introduces the concept before the user starts.

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

## Links

Use links to help readers move between related concepts without interrupting the flow of the page.

- Use relative links for internal docs pages (`[my link](/editor/something)`).
- Link the first meaningful mention of a concept. Don’t overlink repeated mentions of the same concept on a page.
- Use descriptive link text that explains where the link goes. Avoid vague link text like “click here,” “read more,” or “this page.”

## Callouts

Use callouts to surface information that would interrupt the main flow.

- `<Tip>`: helpful advice, shortcuts, or optional best practices.
- `<Note>`: important context the user should know before continuing.
- `<Info>`: related information, links, or secondary details that support the main content.
- `<Warning>`: risks or consequences, such as data loss, billing changes, accidental keys, or broken runtime behavior.

Put callouts close to the step or section they apply to. If the information is required to avoid a mistake, place it before the risky action.

### Examples Callout

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

## Assets

- Use kebab-case (my-image.png)
- Give each image a logical name and alt text `![IK constraint](/images/editor/constraints/ik-constraint.png)`
- Put images in logical folders within `/images/`

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

## Navigation

Organize docs by user task or concept, not only by UI location.

- Add pages to the sidebar only when they are useful entry points.
  - Keep overview pages high-level and link to deeper pages for details.
- Place detailed tool behavior on the page where users are most likely to need it.
  - Use supporting pages for concepts, warnings, or troubleshooting that need a canonical link but do not need to appear in the sidebar.
  - Cross-link related pages so users can move between concepts, tasks, and references. For example, explain where the Toolbar is in the interface overview, but document the Pen Tool on the drawing page where users are learning to create paths.
