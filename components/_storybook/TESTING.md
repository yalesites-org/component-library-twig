# Visual Regression Testing Guide for Playground Stories

This guide outlines the requirements and best practices for visual regression testing (VRT) in YaleSites playground stories.

## Core Principle

**Test all permutations**: Every playground story should demonstrate all possible visual variations of a component to ensure consistent rendering and catch visual regressions.

## Required VRT Sections

### For Components with Section Themes

If your component appears within a layout section and responds to section theme backgrounds:

- **✅ Required**: "All Section Theme Variations" section
- **Purpose**: Shows component against all 5 section backgrounds (`default`, `one`, `two`, `three`, `four`)
- **Use**: `createThemeVariations()` utility from `playground-utils.js`

**Example**:

```javascript
${createThemeVariations(
  (theme) => componentTwig({ ...config, component__theme: 'one' }),
  sectionThemes,
  'All Section Theme Variations',
  'Component rendered on all section background colors',
  'Section Theme'
)}
```

### For Components with Component Themes (Dial)

If your component has accent color options (the "dial" in CMS):

- **✅ Required**: "All Component Theme Variations" section
- **Purpose**: Shows all 5 component theme accents (`one` through `five`)
- **Use**: `createThemeVariations()` utility

**Example**:

```javascript
${createThemeVariations(
  (theme) => componentTwig({ ...config, component__theme: theme }),
  componentThemes,
  'All Component Theme Variations',
  'Component with all dial color options',
  'Component Theme'
)}
```

### For Components with Custom Variations

If your component has style variations (layout, position, size, etc.):

- **✅ Required**: One VRT section per variation type
- **Purpose**: Shows all options for each variation
- **Use**: `createVariations()` utility

**Example**:

```javascript
// Position variations
${createVariations(
  (position) => componentTwig({ ...config, component__position: position }),
  ['left', 'center', 'right'],
  'All Position Variations',
  'Position'
)}

// Size variations
${createVariations(
  (size) => componentTwig({ ...config, component__size: size }),
  ['small', 'medium', 'large'],
  'All Size Variations',
  'Size'
)}
```

### For Complex Components (e.g., Site Header/Footer)

If your component has both theme AND accent:

- **✅ Required**: "All Theme & Accent Combinations" section
- **Purpose**: Shows representative theme/accent pairs
- **Use**: `createThemeAccentCombinations()` utility with `vrt-combinations.yml` data

**Example**:

```javascript
import vrtCombinations from '../_storybook/vrt-combinations.yml';

${createThemeAccentCombinations(
  (theme, accent) => componentTwig({
    ...config,
    site_header__theme: theme,
    site_header__accent: accent
  }),
  vrtCombinations.themeAccentPairs,
  'All Theme & Accent Combinations'
)}
```

## Pre-Submission Checklist

Before submitting a new or updated playground story, verify:

### Coverage

- [ ] All theme types are tested (section, component, global if applicable)
- [ ] All style variations are tested (position, layout, size, etc.)
- [ ] All boolean flags are tested (with icon vs without, expanded vs collapsed, etc.)
- [ ] Representative combinations are tested (not every permutation, but key ones)

### Code Quality

- [ ] Using utility functions from `playground-utils.js` (not duplicating code)
- [ ] Using theme constants from `theme-constants.js` (not hardcoding arrays)
- [ ] No inline styles in VRT sections (use `.sb-section__*` classes)
- [ ] VRT section titles are descriptive

### User Experience

- [ ] Interactive section has all relevant controls
- [ ] Control labels follow naming conventions (see README.md)
- [ ] VRT sections are clearly separated and labeled
- [ ] Story loads without errors

## Performance Considerations

### Do

- ✅ Use utilities to generate VRT sections (reduces code size)
- ✅ Test representative combinations, not every permutation
- ✅ Group related variations together

### Don't

- ❌ Test every possible combination of multiple variables (combinatorial explosion)
- ❌ Duplicate large data structures across sections
- ❌ Create excessive nesting of variations

**Example**: For a component with 5 themes, 3 positions, and 2 sizes:

- **Don't**: 5 × 3 × 2 = 30 variations (too many)
- **Do**: 5 themes + 3 positions + 2 sizes = 10 variations (test each independently)

## Special Cases

### Multi-Component Stories

If your playground story includes multiple related components (e.g., different banner types):

- Test all variations for EACH component
- Use clear section headings to separate components
- Consider if components should be in separate stories

### Components with Data Dependencies

If your component requires complex data (menus, cards, etc.):

- Extract data to YML files (see README.md "When to Extract Data to YML")
- Import and use in both interactive and VRT sections
- Keep data DRY (don't duplicate)

### Components with Icons

If your component has optional icons:

- Test with and without icon
- Use `icon-utils.js` for icon handling
- Include icon variations in VRT sections

## Examples in Codebase

**Good examples to reference**:

- `components/03-organisms/calendar/calendar.playground.stories.js` - Clean structure
- `components/03-organisms/site-header/site-header.playground.stories.js` - Complex theme/accent combinations
- `components/02-molecules/accordion/accordion.playground.stories.js` - Standard pattern

## Link halo check

Links draw a halo, a stack of zero-blur `text-shadow`s coloured by `--color-text-shadow`, so the
animated underline appears to skip descenders. The halo is only invisible while its colour matches
the surface behind the link. When a global theme, section theme, component dial or a component's
own surface changes the background without resetting `--color-text-shadow`, the link looks bold
and smeared. That has regressed repeatedly (yalesites-org/YaleSites-Internal#1614, the Link Grid in
yalesites-org/YaleSites-Internal#1938), and the token tests in `00-tokens/colors/` cannot see it:
the tokens are fine, a selector just forgot one. `npm run test:link-halo`
(yalesites-org/YaleSites-Internal#1939) checks the rendered output instead.

### What it checks

For every visible `a[href]` in every story it renders, in the resting, `:hover` and
`:focus-visible` states:

- **Halo**: each zero-blur halo shadow, painted over the background behind the link, must be within
  3 per 8-bit channel of that background (`CHANNEL_TOLERANCE` in `link-halo.mjs`, room for rounding
  when the same token arrives by two routes; a visible halo is typically 150 or more). No `text-shadow`, a fully transparent one, or
  a blurred or far-offset drop shadow is not a halo, so it is not judged.
- **Contrast**: the link text against the same background must reach WCAG AA, 4.5:1, or 3:1 for
  large text (24px, or 18.66px at weight 700).

"The background behind the link" is the hit-test stack at the centre of the link text's first line
(`document.elementsFromPoint`), translucent layers composited down to the first opaque one, white
if nothing paints. A link whose text is not at that point (zero size, `display: none`,
`visibility: hidden`, `opacity: 0`, clipped by a collapsed panel, off canvas) is not visible and not
checked. A link over an image, video, SVG or a `background-image` cannot be resolved from styles, so
it is **skipped** and counted, never failed. The link's own underline gradient is the one
background image that is ignored.

`elementsFromPoint` never returns `::before`/`::after`, so the check also reads each box's
pseudo-elements. An absolutely or fixed positioned one whose box covers the sample point (offsets
resolved against its containing block) is composited in front of the box that owns it, at its own
opacity: the active primary-nav item's tint is the worked example. One painted with a gradient or
image makes the link a skip, like any other unresolvable background. In-flow pseudo-elements sit
beside the text rather than behind it and masked ones are icons, so neither counts. If a
positioned pseudo-element's geometry cannot be read, it is assumed to cover the point.

States are forced through the Chrome DevTools Protocol (`CSS.forcePseudoState`), on the link and on
its ancestors (`:hover`, and `:focus-within` for focus), so `.card:hover .card__link` rules apply.
Every worker first proves forcing works on a probe page and stops the run if it does not. All links
in a story are forced at once; each is still judged against what is behind it.

### Running it locally

```sh
npm run storybook:build   # the check reads the built .out/
npm run test:link-halo
```

Chrome comes from Puppeteer's cache; if the run cannot find it, `npx puppeteer browsers install
chrome`. Puppeteer rather than Playwright because it is already installed, cached in CI and driving
the pixel check, and this check is Chromium-only by nature.

Environment overrides:

| Variable                    | Default | Effect                                                                          |
| --------------------------- | ------- | ------------------------------------------------------------------------------- |
| `LINK_HALO_STORIES`         | all     | Only visit stories whose id matches this regex, e.g. `link-grid`                |
| `LINK_HALO_CONCURRENCY`     | 4       | Stories rendered in parallel                                                    |
| `LINK_HALO_STORY_TIMEOUT`   | 60000   | Per-story timeout in ms                                                         |
| `LINK_HALO_RESULTS_OUT`     | none    | Write every failure, skip, render error and per-render timing to this JSON file |
| `LINK_HALO_UPDATE_BASELINE` | none    | `1` is the same as `--update-baseline`                                          |

A new failure prints the check, link text, state, story title and id, the theme combination
(`global=... section=... component=...`, plus any component-specific `data-*-theme`), where in the
story the link sits, the variation heading it is under and the two colours, for example:

```text
  halo | "This is a very long link that will wrap lines" | rest
    story:  Molecules/Link grid > Link Grid (molecules-link-grid--link-grid)
    themes: global=five component=one
    where:  link-grid a.link-grid__link #2
    halo #00366b on background #ffffff
```

### The baseline

`components/_storybook/link-halo-baseline.json` lists the failures that existed when the check
landed. Exactly those are tolerated; any failure not listed fails the run. Entries are keyed by
story id, theme combination, state, check, `where` and link text, with no measured colours, so a
colour that drifts while still failing does not churn the file.

`where` is there because link text alone is not an identity: a visreg story renders several
components on each section theme, and two of them can carry the same text (the Post and Event
reference cards share their category fixtures). It is the blocks of the two nearest enclosing BEM
elements plus the link's own BEM element class, then `#2`, `#3`... for links that still share all of
it, counted in document order. Only `block__element` classes are used: behaviours add plain classes
(`link`, `external-link`, `link-purpose-*`) after render, and reading those made the same link's
key differ between two runs of one build.

- **An entry that stops failing** is reported as stale, a warning and not a failure, so a fix never
  breaks the build. Delete it, or update the baseline. An unfiltered run also reports entries for
  stories that are no longer in the index (deleted or renamed) as stale.
- **To update it**: `npm run test:link-halo -- --update-baseline`. It rewrites the entries for every
  story the run visited, drops entries for stories no longer in the index, and keeps the rest, so a
  filtered run (`LINK_HALO_STORIES=link-grid npm run test:link-halo -- --update-baseline`) only
  touches that story. A filtered run cannot tell a deleted story from one it left out, so it keeps
  those entries. It refuses to write if any story failed to render, because that would drop
  entries for stories that were never checked.
- It is a burn-down list. Adding an entry to turn a red build green is not a fix; it is for a
  failure that is known and ticketed.

### The matrix

The check reads how this Storybook applies themes rather than inventing its own:

- **Every `visreg`-tagged story, once.** Those already render the matrix: one story per global
  theme (`global-theme-stories.mjs`), each showing the component on every section theme and with
  every component dial. That is global x section x component theme for every component that has a
  `*.visreg.stories.js`, at no extra rendering cost.
- **Every other story, in every global theme**, set through the `globalTheme` Storybook global (the
  same thing the toolbar does), with whatever section and component themes its default args render.
  These cannot be left to the visreg stories: the visreg stories always wrap the component in a
  section, and the Link Grid regression only shows with no section around it.

Reduced, and why:

- **A non-visreg story with no links is rendered in the first global theme only.** A global theme is
  an attribute on `<body>`; no template branches on it, so it cannot add or remove a link. About
  half the non-visreg stories (token tables, layout shells, image atoms) have none, and rendering
  them seven times was a quarter of the run. On the build this landed against, link counts agreed
  across all seven global themes for every non-visreg story, so this skips nothing with a link.
- **One viewport**, the 1200px visreg width. Links that only exist in the mobile menu are not
  checked.
- **Non-visreg stories get only their default args.** Section and component themes for those come
  from the visreg stories; a combination neither renders is not checked.
- **Menus opened by script stay closed.** Forcing `:hover` opens what CSS opens, but a dropdown
  toggled by a behaviour (`aria-expanded`) is not clicked, so its links are hidden and not checked.
  The primary nav's active second-level item is the known case: its pseudo-element tint is handled
  (forcing its dropdown open in a scratch run composites it correctly and passes), but no story
  renders it open.
- **Remote requests are blocked** (everything `https://`). The build is served over loopback
  `http://`, so this only removes webfonts and third-party embed scripts: links lay out in the
  fallback font, which can move them but not recolour them, and links inside a third-party iframe
  were never reachable.

As of landing, a full run is 1,304 renders of 776 stories (510 link-less renders skipped), about
65,000 link samples across 3,600 story/theme combinations, in about 3m40s locally at the default
concurrency of 4. Each worker gets its own browser context: four pages in one context shared a
renderer process and took turns, which made the same run take 9 to 11 minutes. If CI gets close to its
10-minute budget, `LINK_HALO_RESULTS_OUT` records each render's time (`renders[].ms`), which is
where to look first.

## Questions?

See `components/_storybook/README.md` for full developer documentation.
