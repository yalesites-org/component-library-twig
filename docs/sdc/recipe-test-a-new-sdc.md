# Recipe: test a new SDC

How to test a new SDC, drawn from what worked across the migration (epic #1351). Pick the depth
that matches the component:

| Component | Tests to add |
|---|---|
| Any SDC | Schema validation (section 1) |
| Interactive (JS behavior) | Schema validation plus a Vitest behavioral test (section 2) |
| Has a CSS or markup contract worth pinning | A `node --test` guard (section 3) |

Visual-regression snapshots stay the baseline for appearance. These tests cover what snapshots cannot.

## 1. Lightweight schema-validation test — every wave

Cheap, mechanical, no browser, no database. Confirms the authored schema accepts valid data and
rejects invalid data (wrong enum, missing required) — i.e. that the dial→enum generation is correct
and can't silently drift. Baked into every wave's own acceptance criteria.

- **Runner:** PHPUnit (Unit), using `justinrainbow/json-schema` (available via `drupal/core-dev`).
- **Location:** `atomic/tests/src/Unit/SdcSchemaValidationTest.php` (extend it as waves add components).
- **Run:** `lando composer test:sdc` (filters `--group sdc`).
- **Pattern:** load the component's `props` schema from its `*.component.yml`, validate a
  valid-data object (expect no errors) and an invalid-data object (expect errors). Example (Callout
  invalid dial):

```php
$errors = $this->validate('callout', ['callout__background_color' => 'not-a-real-theme']);
$this->assertNotEmpty($errors);
```

This proves the schema is *correct*, not merely that the file exists. Render-level enforcement —
that SDC actually applies the schema when assertions are on — was verified on Lando for the pilot
(an invalid enum throws `Twig\Error\RuntimeError: … Does not have a value in the enumeration`). A
Kernel test that renders a themed SDC and asserts the throw is a worthwhile follow-up but is
finicky (theme install + external `@namespace` resolution in the test container); it is not required
for a wave's sign-off.

## 2. Deep behavioral test — interactive components only (Waves 3b, 6b)

Visual-regression snapshots catch rendering changes but are blind to keyboard traps, ARIA that stops updating on toggle,
focus order breaking after a markup change, and (for Views-driven components) data-shape edge cases.
Those get real behavioral tests.

- **Runner:** Vitest + jsdom (stood up in Wave 0). Config: `vitest.config.js`. Run: `npm run test:unit`.
- **Location:** co-located `components/**/<name>.test.js`.
- **Pattern (interactive, from Accordion):** build a DOM fixture mirroring the rendered markup,
  load the `Drupal.behaviors.<name>` script (it assigns to a global `Drupal`), `attach()` it, then
  assert initial state, activation (click — native buttons make this the keyboard path too), ARIA
  state changes, and any all-items control. See
  `components/02-molecules/accordion/yds-accordion.test.js`.
- **Pattern (Views-driven, Wave 6b):** render each display mode with empty / single / many results
  and a result missing an optional field; assert no crash and correct markup.
- **Prove the test is meaningful:** temporarily break the behavior it targets and confirm the test
  fails, then restore. (Verified for Accordion: mutating `expand()` failed 3/5 tests; restoring
  passed all 5.)

## 3. Contract guards — CSS, tokens, template output

For rules that a screenshot can miss (a contrast ratio, a `flex-shrink` that keeps a badge inside
its box, a token that must not be used), add a Node test next to the code.

- **Runner:** the built-in `node --test`. Run all with `npm run test:unit:node`, or one file with
  `node --test components/<path>/<name>.test.mjs`.
- **Location:** co-located `*.test.mjs` (or under `lib/`).
- **Pattern:** compile the component's SCSS with `sass`, parse it with `postcss`, and assert on the
  resulting rules. See `components/01-atoms/forms/views-filter-more-badge.test.mjs`.
- Name the ticket in the file header comment so the next reader knows why the rule exists.

## CI wiring

- **JS (Vitest and `node --test`):** wired into CLT CI. `npm run test` (run by
  `.github/workflows/test.yml`) includes `npm run test:unit`, which runs both runners.
- **PHP (schema validation):** runs locally via `lando composer test:sdc`. Wiring it into the
  yalesites-project CI needs a CI-compatible PHPUnit bootstrap first — the committed `phpunit.xml`
  hardcodes Lando `/app` paths, so flipping the `unit-test` composer stub blindly would break the
  build. Tracked as a follow-up (see the epic decisions log).
