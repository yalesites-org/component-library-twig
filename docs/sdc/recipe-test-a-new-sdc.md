# Recipe: test a new SDC

First-draft from the Wave 0 pilot (epic #1351). Two depths of testing, applied at different times.

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

Percy catches visual regressions but is blind to keyboard traps, ARIA that stops updating on toggle,
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

## CI wiring

- **JS (Vitest):** wired into CLT CI — `npm run test` (run by `.github/workflows/test.yml`) now
  includes `npm run test:unit`.
- **PHP (schema validation):** runs locally via `lando composer test:sdc`. Wiring it into the
  yalesites-project CI needs a CI-compatible PHPUnit bootstrap first — the committed `phpunit.xml`
  hardcodes Lando `/app` paths, so flipping the `unit-test` composer stub blindly would break the
  build. Tracked as a follow-up (see the epic decisions log).
