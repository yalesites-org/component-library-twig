# Wave 8 (#1363) — Storybook-only completion audit

Epic [#1351](https://github.com/yalesites-org/YaleSites-Internal/issues/1351), ticket #1363.

Wave 8 asks us to complete the SDC migration for components that exist only in
Storybook (no Drupal render path) and to delete genuinely-stale ones. This audit
is the deliverable: a full inventory of what remains, its disposition, and the
deletion candidates that need maintainer sign-off before removal.

**Headline finding: there is no Storybook-only component that is both
SDC-appropriate and independent of the in-flight Views rework.** The 26 already
converted components are the ones that fit the thin-wrapper SDC pattern. What is
left in Storybook-without-a-render-path is demos, tokens, page examples, internal
sub-partials, or the Views/calendar-coupled `modal`. So Wave 8 is not a
"convert N more components" wave; it is a **re-scope / clean-up decision** for you.

Method: every non-visreg `*.stories.js` and every `yds-*.twig` entry template in
CLT was cross-referenced against all `@atoms|@molecules|@organisms` includes/embeds
across the whole repo (the `atomic` theme and the profile modules `ys_core`,
`ys_layouts`, `ys_views_basic`, `ys_views_content_resources`).

## Inventory and disposition

| Component / area | Tier | Disposition | Reason |
|---|---|---|---|
| `modal` (`yds-modal.twig` + JS) | molecule | **Convert later, coupled** | Real JS overlay, but embedded inside the Views-driven `calendar` organism (special-cases `id == 'calendar-modal'`). Not editor-placeable; conversion belongs with the interactive-molecule set (#1356) and is coupled to the Views/calendar work. Not a standalone Wave 8 win. |
| `menu`, `menu-toggle`, `menu-in-this-section-toggle`, `link-group` | molecules | **Keep as-is** | Internal building blocks embedded in nav organisms / the footer; not standalone components. |
| `secondary-nav` | organism | **Keep as-is** | Embedded in `site-in-this-section` (rendered via `book-tree.html.twig`). |
| `00-tokens/*`, `00-introduction/*` | atoms | **Keep as Storybook docs** | Token/color-swatch displays and documentation, not components. |
| `controls/control.stories.js`, `images/images.stories.js`, `galleries/gallery.stories.js` | atoms/orgs | **Keep as demo stories** | Aggregator stories over components that are already rendered elsewhere. |
| `images/fa-icons/yds-fa-icons.twig` | atom | **Keep (demo)** | A demo loop like `icons`; the real icon is the `_yds-fa-icon` partial. Not even in Storybook (`no .stories.js`). |
| `utility-nav/yds-utility-nav--example.twig` | organism | **Not a clean delete** | An `--example` demo file, but still referenced by `utility-nav.visreg.stories.js` and `_yds-utility-nav.scss` — removing it would break the visreg story and an SCSS reference, so it is not a safe standalone deletion. |
| `04-page-layouts/*`, `05-page-examples/*` | page tiers | **Keep** | Page-layout tier and full-page Storybook demos; out of the component-SDC scope. |
| `button`, `tables`, `icons`, forms (checkbox/radio/select/textfields) | atoms | **Keep (already documented non-convertible)** | SCSS-only / JS-on-WYSIWYG / demo-vs-partial / Form-API driven. See the Wave 1 notes in the epic log. |

## Deletion candidates (need your sign-off)

**None that are clean.** The sweep surfaced one demo file
(`yds-utility-nav--example.twig`), but it is still referenced by its own visreg
story and by `_yds-utility-nav.scss`, so it cannot be removed without also updating
those — not a safe standalone deletion. The token/intro/page-example stories are
legitimate Storybook documentation and should stay. I did **not** delete anything —
deletion of shared library files is exactly the kind of irreversible, sign-off-gated
action to leave to you.

## Recommendation

**Re-scope or close #1363.** There is no SDC conversion work here that is both
appropriate and independent of the Views rework, and no clean stale-file deletion.
The concrete actions are: (a) decide whether the `--example` demo is worth removing
(and updating its visreg story + SCSS), and (b) fold `modal` into the
interactive-molecule conversion set (#1356) once the Views/calendar work settles,
rather than treating it as a Wave 8 item.
