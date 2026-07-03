# SDC migration guide

The overview of the YaleSites component-library migration to Single Directory
Components (SDC), epic [#1351](https://github.com/yalesites-org/YaleSites-Internal/issues/1351).
For the step-by-step conversion procedure see
[recipe-convert-a-component-to-sdc.md](recipe-convert-a-component-to-sdc.md); this
document is the "why" and the "where are we."

## Why SDC

Drupal core ships SDC since 10.3, and Drupal Canvas (the site-builder that will
land with a Drupal 11 upgrade) consumes SDCs as its component contract. Migrating
gives each YaleSites component a machine-readable schema (typed props with
titles, descriptions, and examples) that the Layout Builder — and eventually
Canvas — can validate against and build editing UI from, without changing where
the component's markup, styles, or behavior live.

The forcing function is the calendar. Per the
[research spike](research-spike-1352-canvas-and-web-components.md) (which cites the
Drupal.org sources it drew from, as of 2026-07-02): Drupal 10 reaches end-of-life
in late 2026 with 10.6 as the final D10 minor, and Canvas requires core `^11.2` —
so Canvas is strictly downstream of a D11 upgrade. Re-verify those release dates
against Drupal.org before they drive a scheduling decision. Authoring schemas
Canvas-forward now means they do not need to be redone when D11/Canvas arrive.

## The architecture: thin wrappers in `atomic`

Drupal SDC only discovers components in an installed extension's own `components/`
directory — it does **not** scan `node_modules/`. So each migrated component gets
a small SDC in the `atomic` theme that **delegates** to the real template, which
stays canonical in this library:

```
atomic/components/<name>/
  <name>.component.yml   # schema (props + slots)
  <name>.twig            # thin shim: include/embed @atoms|@molecules|@organisms/<name>/...
```

- **Markup** stays canonical in `component-library-twig`, still driving Storybook
  and Percy. The shim's `@atoms`/`@molecules`/`@organisms` includes are permanent
  by design — that is the thin-wrapper contract, not tech debt.
- **CSS/JS** keep loading from the existing compiled `dist/` via the current
  `atomic/*` libraries, attached through the SDC's `libraryOverrides`. Nothing is
  moved or duplicated.
- **Dial enums** (the theme/color/alignment options) are generated from
  `ys_themes.component_overrides.yml` resolved against each field's view-display
  formatter, never hand-typed, so they cannot drift from what Drupal actually
  passes.

This shape is valid core SDC and valid Canvas SDC. A fully self-contained SDC
(template + partials moved into `atomic/components/`) remains a possible later
end-state but is not a prerequisite.

## Rendering path

A migrated component is reachable two ways, both exercised in the migration:

1. **Render element** — `['#type' => 'component', '#component' => 'atomic:<name>',
   '#props' => [...], '#slots' => [...]]`. Used for programmatic/isolated render
   and (eventually) Canvas.
2. **Layout Builder block** — the block template
   `atomic/templates/block/layout-builder/block--inline-block--<name>.html.twig`
   is repointed at the SDC (`include('atomic:<name>', ...)` for props-only
   components, `embed 'atomic:<name>'` with slot blocks for components with
   slots). The block template is the **adapter layer**: it reads the Drupal field
   values, applies defaults for legacy NULLs, and threads `directory`.

## Current status

As of this writing the migration has converted **26 components** to thin-wrapper
SDCs, each schema-validated and verified to render identically to its pre-SDC
baseline on real pages (or in isolation where no on-site content exists):

Tiers below are by where the canonical template lives in this library (the
`@atoms`/`@molecules`/`@organisms` namespace each shim delegates to):

- **Atoms (9):** divider, heading, text, cta, text-link, text-copy-button, lists,
  date-time, image.
- **Molecules (16):** callout, accordion, inline-message, pull-quote,
  wrapped-image, wrapped-callout, link-grid, quick-links, embed, video, tabs,
  link-skip, read-time, taxonomy-display, basic-meta, text-with-image (rendered as
  the content spotlight block).
- **Organisms (1):** tiles.

Testing infrastructure is stood up and wired into CI where possible:

- **Schema-validation tests** (PHPUnit + `justinrainbow/json-schema`) in
  `atomic/tests/src/Unit/SdcSchemaValidationTest.php`, run with
  `lando composer test:sdc`. One assertion pair per component: valid data passes,
  invalid data (bad enum / missing required) fails.
- **Behavioral tests** (Vitest + jsdom) for interactive components, co-located in
  this repo (`components/**/<name>.test.js`), run with `npm run test:unit` and
  wired into CLT CI via `npm run test`.

The remaining components are staged with the recipe and codegen ready to apply.
The tractable majority is mechanical; the genuine long poles are documented in
the epic decisions log and summarized under "Known limits" below.

## How a remaining component gets migrated

1. Add a spec to `scripts/sdc/components.config.js` (in `yalesites-project`) and
   run the codegen: `node scripts/sdc/generate-sdc.js <name> --write`. Review the
   first-draft schema (search for `x-codegen-todo` / `x-codegen-warning`).
2. Refine the schema Canvas-forward and write the shim, following
   [recipe-convert-a-component-to-sdc.md](recipe-convert-a-component-to-sdc.md).
3. Repoint the Layout Builder block template at the SDC.
4. **Capture a real before/after baseline** on an affected page and confirm the
   output is byte-identical (normalizing SDC dev decorations and cache tokens).
   Render twice on a fresh `drush cr` — a single render can be cache-served and
   hide a prop-validation 500.
5. Add a schema-validation test (and a behavioral test if interactive).
6. Run the review gate (`/simplify`, `/code-review`, `/security-review`), lint
   (`composer code-sniff`), commit, and push on the ticket's branch.

## Known limits (decisions the back half of the epic depends on)

- **Thin wrappers break for slots that depend on component-internal state.** When
  the consumer's slot markup itself uses state generated *inside* the component (a
  `random()` id, a loop `key`, a `base_class`) — as in tabs, where each panel's
  `id` and each label's `aria-controls` are `tab-{id}-{key}` — the `block()`
  capture renders the slot outside that scope and the state is undefined. Tabs was
  solved by **threading the shared state explicitly** from the consumer through
  the shim and the partials; the alternative is a fully self-contained SDC. This
  choice recurs for modal, alert, menu, nested card/collection organisms, and
  Views-driven components.
- **Data-driven and high-blast components need dedicated work**, not a batch: the
  meta components (entity metadata), page-title (every page's title, six slots),
  and the Views-driven components (Wave 6, which must coordinate with the in-flight
  Views Block Rework epic #1161).
- **The Web Component distribution package and the OutSystems proof-of-concept**
  (Wave 10) require an OutSystems tenant that is not available in this
  environment; the plain-HTML Web Component wrappers are proven (see the research
  spike), the OutSystems import demo is blocked pending that access.

## A note on the name "migration guide"

This repository also contains `STORYBOOK-MIGRATION-GUIDE.md` at its root. That is
a **different** document — it covers migrating a component to the two-page
Storybook documentation structure (MDX + visreg), not SDC. This SDC documentation
set lives under `docs/sdc/` and does not modify it.
