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
  large text (24px, or 18.66px at weight 700). The large-text allowance differs from the functional
  element contrast gate (`00-tokens/colors/functional-element-contrast.mjs`), which holds all text
  to 4.5:1 per YaleSites-Internal#1614. It is kept so the baseline's pass/fail is unchanged, but
  never silently: the report lists every link that passes only through it (between 3:1 and 4.5:1),
  and `LINK_HALO_RESULTS_OUT` writes them as `largeTextAllowance`. A large-text contrast failure
  says "needs 3:1 (WCAG large text)". Neither affects the baseline: entries are keyed by story,
  themes, args, state, check, place and link text, never by the detail or the flag.

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
on a page are forced at once; each is still judged against what is behind it. Only links that draw
a `text-shadow` at rest are forced, with their ancestors: the halo mixins set the shadow at rest and
only recolour it in other states, and a link with no shadow is never judged. Forcing every link
gave the same 8,959 failures and the same halo sample count, and took about a third longer.

Forcing everything at once was checked against a real mouse hover and a real keyboard focus on one
link at a time, on link grid, taxonomy display, wrapped callout and the footer: 2,828 links, 1,988 of
them failing, with identical colours, halo and verdict for every one.

A link counts as visible only if the painted part of its first line box is wholly on screen when it
is hit-tested. "Painted" means the line box cut down to every ancestor whose `overflow-x` or
`overflow-y` is not `visible` (on that axis), so a link truncated with an ellipsis, or in a container
wider than a page with `overflow-x: hidden`, is judged by what shows rather than skipped; the root's
or body's overflow clips to the viewport where it is `hidden` or `clip`. `clip` and `clip-path` are
not read (the hit-test still drops text they hide). A box clipped to less than a pixel is hidden.
Otherwise the check scrolls the painted box to the middle once, horizontally too if a side is off
screen, and skips the link if it is still not fully on screen after that one re-check. The text node
that speaks for a link is the first visible one that draws a halo, by the same test the judging uses,
so an eyebrow or icon label ahead of the title, with no shadow or an ordinary blurred or transparent
one, does not make the link read as having no halo; only if no visible text node draws one is the
link counted as drawing no halo. A centre within a pixel of the viewport edge hit-tests as
nothing, and whether a link landed there depended on where the previous one had scrolled to, which
made a few card links visible in one run and hidden in the next.

### Running it locally

```sh
npm run storybook:build   # the check reads the built .out/
npm run test:link-halo
```

Chrome comes from Puppeteer's cache; if the run cannot find it, `npx puppeteer browsers install
chrome`. Puppeteer rather than Playwright because it is already installed, cached in CI and driving
the pixel check, and this check is Chromium-only by nature.

Environment overrides:

| Variable                    | Default  | Effect                                                                          |
| --------------------------- | -------- | ------------------------------------------------------------------------------- |
| `LINK_HALO_STORIES`         | all      | Only visit stories whose id matches this regex, e.g. `link-grid`                |
| `LINK_HALO_CONCURRENCY`     | CPUs, ≤4 | Pages working in parallel (`os.availableParallelism()`, at most 4)              |
| `LINK_HALO_STORY_TIMEOUT`   | 60000    | Per-story timeout in ms                                                         |
| `LINK_HALO_RESULTS_OUT`     | none     | Write every failure, skip, render error and per-render timing to this JSON file |
| `LINK_HALO_UPDATE_BASELINE` | none     | `1` is the same as `--update-baseline`                                          |

A new failure prints the check, link text, state, story title and id, the theme combination
(`global=... section=... component=...`, plus any component-specific `data-*-theme`; no `section=`
means the copy outside any section), the theme controls the story was rendered with (`args:`,
non-visreg stories only, never the section theme), where in the story the
link sits, the variation heading it is under and the two colours, for example:

```text
  halo | "This is a very long link that will wrap lines" | rest
    story:  Molecules/Link grid > Link Grid (molecules-link-grid--link-grid)
    themes: global=five component=one
    args:   themeColor=one
    where:  link-grid a.link-grid__link #2
    halo #00366b on background #ffffff
```

### The baseline

`components/_storybook/link-halo-baseline.json` lists the failures that existed when the check
landed. Exactly those are tolerated; any failure not listed fails the run. Entries are keyed by
story id, theme combination, theme controls (`args`, only when the story has any), state, check,
`where` and link text, with no measured colours, so a colour that drifts while still failing does
not churn the file. `args` is in the key because not every control shows up as a `data-*-theme`
attribute (the header accent is `data-header-accent`): without it, two accents of one header would
share a key and one could hide the other.

`where` is there because link text alone is not an identity: a visreg story renders several
components on each section theme, and two of them can carry the same text (the Post and Event
reference cards share their category fixtures). It is the blocks of the two nearest enclosing BEM
elements plus the link's own BEM element class, then `#2`, `#3`... for links that still share all of
it, counted in document order. Only `block__element` classes are used: behaviours add plain classes
(`link`, `external-link`, `link-purpose-*`) after render, and reading those made the same link's
key differ between two runs of one build.

- **An entry that stops failing** is reported as stale, a warning and not a failure, so a fix does
  not break the build, up to a limit: an unfiltered run that leaves more than 10% of the baseline
  stale fails (see "When the run fails"), so after a fix that retires that many, update the
  baseline in the same change. Delete stale entries, or update the baseline. An unfiltered run also
  reports entries for stories that are no longer in the index (deleted or renamed) as stale.
- **To update it**: `npm run test:link-halo -- --update-baseline`. It rewrites the entries for every
  story the run visited, drops entries for stories no longer in the index, and keeps the rest, so a
  filtered run (`LINK_HALO_STORIES=link-grid npm run test:link-halo -- --update-baseline`) only
  touches that story. A filtered run cannot tell a deleted story from one it left out, so it keeps
  those entries. It refuses to write if any story failed to render, because that would drop
  entries for stories that were never checked.
- It is a burn-down list. Adding an entry to turn a red build green is not a fix; it is for a
  failure that is known and ticketed.

### Scope: which components are checked

Only components whose links draw the halo, or that pick its colour for the links inside them:

- a stylesheet that includes `link`, `descender-halo-defaults` or `clickable-component-heading-link`
  from `01-atoms/controls/text-link/_yds-text-link.scss`: bare, namespaced (`atoms.link`), through
  any mixin that wraps one (resolved transitively), or under a prefix a module is forwarded with
  (`@forward './button/yds-button' as button-*` makes `atoms.button-<mixin>` count);
- a `text-shadow` that carries `--color-text-shadow`, directly or through an SCSS variable or custom
  property that does (`$halo: 0.03em 0 var(--color-text-shadow)` then `text-shadow: $halo`),
  resolved across files by name;
- a stylesheet that sets `--color-text-shadow` itself. The footer, header, accordion, skip link and
  gallery modal do this for links that another component styles, so a link can be wrong there even
  though its own SCSS is fine.

Comments are ignored. They are listed in `HALO_COMPONENTS` in
`components/_storybook/link-halo-scope.mjs`, as `<tier>/<component>`; the check plans only stories
whose file is under one of those directories, regular and visreg alike. Token documentation
(`00-tokens`), introduction pages and page examples (`05-page-examples`) are never visited, which a
unit test pins. Within a page, a link whose computed `text-shadow` has no halo shadow in that state
is counted and left alone, contrast included.

`NO_HALO_LINKS` in the same file lists the in-scope components whose stories have no halo link to
judge, each with its reason, and the run fails if that list is wrong in either direction (see "When
the run fails"). Two kinds are on it today. Page chrome (header, skip link) sets the halo colour, but
every link it renders is a nav, branding or CTA link with no halo. The rest style a halo link the check cannot
judge. Quick links, the secondary nav (`menu`) and In This Section have no way to render one: quick
links renders every link as a CTA button, and the two navs render only menu items, which carry
`data-link-style` and so are excluded from their `a:not([data-link-style])` halo rule. Their templates
would have to change before a story could show one. Image captions, the callout, the quote callout
and the wrapped image carry a link in their story data and are judged, and so is the gallery
modal caption, which the gallery visreg stories open in a play function.

**A second, narrower width for some components.** `NARROW_VIEWPORT_COMPONENTS` in the same file
lists the components whose stories are rendered again at `NARROW_VIEWPORT_WIDTH` (768px), each with
its reason. Today that is only the banner: at 1200px the action banner's text sits over its image in
every layout, so the "Text Links" story's `.cta-banner__link` is skipped as over an image, and below
the 992px breakpoint the text stacks under the image and is judged (YaleSites-Internal#1955). A
narrow render is an extra page in the same plan, so it adds about 60 renders rather than doubling
the run, and its failures carry `"viewport": 768` in the baseline, so the same link failing at both
widths is two entries. `NO_HALO_LINKS` is checked over both widths together: an excluded component
that has a halo link judged at either width fails the run.

**The scope guard.** `link-halo-scope.test.mjs` runs in `npm run test:unit`. It scans every
stylesheet the build ships, `components/` and `lib/` (the link-treatment styles in `lib/` load with
every story), and fails if:

- a component draws the halo or sets its colour but is not in `HALO_COMPONENTS`. Fix: add the
  `<tier>/<component>` it names to `HALO_COMPONENTS`;
- a stylesheet outside any component (`lib/`) draws the halo or sets its colour. No story is known
  to cover it. Fix: move the rule into the component under `components/` whose links it styles;
- a listed component has no `*.stories.js`. Fix: add a story;
- a listed component no longer draws the halo or sets its colour. Fix: remove it from
  `HALO_COMPONENTS`;
- a halo user sits in an excluded tier. Fix: move the styles into a component. The token tier
  defining each theme's `--color-text-shadow` is expected and allowed.

### The matrix

Rendering a story is the slow part, and a global or section theme is only an attribute on an
ancestor. So the check renders each story once and copies it, on one page, into every theme
combination (`planPages` in `link-halo.mjs`; `cloneMarkup` and `mountMatrix` in
`check-link-halo.mjs`):

- **Every regular story** is rendered once per combination of its theme controls other than the
  section theme (a component dial, a header theme and accent; the check reads the controls from the
  preview and keeps those that choose a theme, `themeArgs`). Each render is copied into all seven
  global themes, crossed with:
  - no section and each of the seven section themes, in the section wrapper the visreg stories use
    (`createSectionWrapper`). No section is kept because the Link Grid regression only showed there;
  - or, for a story with its own "Section Theme" control (the controls stories), each value of it,
    set on the section the story already renders;
  - or no section at all for page chrome, `SECTIONLESS_COMPONENTS`: the site alert and skip link
    sit above the header, and the header and footer are siblings of `<main>`, which holds the
    sections (`04-page-layouts/_yds-base.twig`). No site can put them in a section theme.
- **Every visreg story** is rendered once per set of stories that differ only in global theme
  (`OldBluesSectionTwo`, `NewHavenGreenSectionTwo`...) and copied into all seven, each copy keyed by
  the story that shows that theme, so its baseline keys are the same as rendering each one.

The global theme wrapper is a `data-global-theme` element, as on the real page's
`.layout-container`. The preview also puts the toolbar's global theme on `<body>`, and the global
theme rules are descendant selectors (`[data-global-theme='one'] [data-section-theme='two']
.accordion &`), so left there it would style every copy as theme one as well as its own. While the
matrix is on the page, `data-global-theme` is taken off `<body>` and every other ancestor of it and
put back afterwards (`parkGlobalThemes` and `restoreGlobalThemes` in `link-halo.mjs`), so each copy
is styled by its own wrapper only. A story's own `data-global-theme` wrappers inside the copied
markup are set to the copy's theme. Each page is a new container, removed once it is sampled. Before copying, the
check waits for the story's fonts and images and two frames, with no fixed delay. It also opens what
a visitor would open to read the links: the accordion's own "Expand All" control
(`OPEN_BEFORE_COPY` in `check-link-halo.mjs`), without which every accordion link was hidden and
none was judged. Every planned page is rendered; none is skipped because of another page's result,
so the set of pages never depends on timing.

That copying gives exactly what one render per combination gives was checked on link grid, taxonomy
display, wrapped callout and the footer (16,044 of 16,044 halo samples identical, including all
2,814 failing ones), on the controls stories' section control (7,203 of 7,203), and against the
visreg stories' own sections (7,245 identical).

A full run is 326 renders copied into 12,824 theme combinations, about 105,000 links. Two runs of
one build give identical failures and identical hidden-link counts.

### When the run fails

- **A new failure**: a halo or contrast failure not in the baseline.
- **A render error** that a one-at-a-time retry does not clear.
- **It judged nothing**: no halo link sample at all, whatever the filter.
- **A component went quiet**: in an unfiltered run, a component the run rendered had no halo link
  judged and is not in `NO_HALO_LINKS`, or one in `NO_HALO_LINKS` had some. Either its links
  stopped being visible or drawing the halo, or the list needs updating. A filtered run skips this
  check, since its filter may select only a component's stories without halo links.
- **Too much of the baseline is stale**: an unfiltered run that no longer reproduces more than 10%
  of the baseline entries (`STALE_SHARE_LIMIT` in `link-halo.mjs`). A fix retires a handful of
  entries, or one component's worth; losing a tenth of every known failure at once far more likely
  means the check stopped seeing links. If the fixes are real, `--update-baseline` records them.
  Below the limit, stale entries are a warning.

`--update-baseline` refuses to write when the run judged nothing or a component went quiet, as it
does when a render failed.

Reduced, and why:

- **Over 64 combinations, theme controls are varied one at a time** rather than crossed. No
  in-scope story reaches that today; the run names any that do.
- **Quick links renders at its default component theme.** Its SCSS styles every component
  theme, but neither its stories nor Drupal offer a dial for it.
- **Two viewports at most.** Every story is checked at the 1200px visreg width; only the
  components in `NARROW_VIEWPORT_COMPONENTS` are checked again at 768px. Links that only exist in
  the mobile menu are not checked.
- **Menus opened by script stay closed.** Forcing `:hover` opens what CSS opens, but a dropdown
  toggled by a behaviour (`aria-expanded`) is not clicked, so its links are hidden and not checked.
- **Remote requests are blocked** (everything `https://`). This only removes webfonts and
  third-party embed scripts: links lay out in the fallback font, which can move them but not
  recolour them.

Run time: a full run takes 85 to 130 seconds locally at the default four workers (10-core laptop;
10 workers took 184s and 20 took 191s, so the pool is capped at four). The 768px banner pass added
about 20 seconds (77s without it, 95s and 99s with it, on one laptop). `LINK_HALO_RESULTS_OUT`
records each render's time (`renders[].ms`, and `renders[].renderMs` for the part spent rendering
rather than copying and sampling).

## Questions?

See `components/_storybook/README.md` for full developer documentation.
