# Storybook Documentation Guide

This document covers the conventions for working with Storybook in the YaleSites component library. The full interactive guide lives at **Introduction/Storybook Guide** in Storybook itself.

## Running Storybook

```bash
npm run develop
```

Open `http://localhost:6006` in your browser.

## Sidebar Structure

```
Introduction/     → Orientation and guides
Tokens/           → Design tokens (colors, typography, spacing, effects, breakpoints)
Atoms/            → Smallest building blocks (buttons, dividers, images, text, read time)
Molecules/        → Composed components (callouts, cards, meta types, modals)
Organisms/        → Full page sections (banners, content spotlight, tabs, header, footer, collections)
Templates/        → Structural scaffolding with no visual identity (block wrapper, component wrapper, layout, page layouts)
Page Examples/    → Real-world page references
```

## Key Conventions

### Canvas blocks are for component previews only

All explanatory text, headings, and reference tables belong in the MDX page — not inside the story template literal.

```js
// ❌ Don't do this
export const MyStory = () => `
  <h2>Section heading</h2>
  <p>Some explanation</p>
  ${myTwig(data)}
`;

// ✅ Do this — text goes in MDX, story returns only the component
export const MyStory = () => myTwig(data);
```

### Canvas width

Wrap Canvas blocks in `sb-contained-canvas` for small/self-contained components. Leave wide (default) for full-bleed components like banners and organisms.

```mdx
<div className="sb-contained-canvas">
  <Canvas of={Stories.Default} />
</div>
```

### Tags

| Tag | Effect |
|---|---|
| `'!dev'` | Hides story from sidebar — use when MDX fully covers it |
| `'visreg'` | Marks as a visual regression story — hidden by default, toggled via toolbar |

### Visreg stories

Every component needs a `*.visreg.stories.js` file. **Add or update a visreg entry whenever you:**

- Add a new component
- Add a new design option, color, or theme dial
- Add a new layout variation or modifier
- Change the visual output of an existing component

This is required so release QA can catch visual regressions. If it's not in a visreg story, it won't be reviewed.

## Adding a New Component

1. **Choose the right tier** — atom (single element), molecule (composed of atoms), organism (full section), template (layout shell with no visual identity)
2. **Create these files:**
   - `yds-[component-name].twig` — Twig template
   - `_yds-[component-name].scss` — Styles
   - `[component-name].stories.js` — Interactive story with argTypes/args
   - `[component-name].mdx` — Docs page with Canvas + written context
   - `[component-name].visreg.stories.js` — Visual regression stories
3. **If the component supports color theming**, add it to the Theming Reference page in Storybook (`Tokens/Colors/Theming Reference`)

## Full Guide

See **Introduction/Storybook Guide** in Storybook for the complete reference including theme system documentation, naming conventions, sidebar ordering, and MDX page templates.
