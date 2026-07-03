# Wave 6b (#1361) — Views edge-case test plan

Epic [#1351](https://github.com/yalesites-org/YaleSites-Internal/issues/1351), ticket #1361.

**Status: blocked on #1360, plan ready to execute.** Wave 6b adds the behavioral
tests that Percy is blind to for the Views-driven components — the data-shape edge
cases that break listings. It depends on Wave 6 (#1360) delivering the SDCs to test,
which is itself blocked on the Views Block Rework epic #1161 (see
`wave-6-views-driven-plan.md`). This document is the ready-to-execute test design.

## Why these components need behavioral tests

Percy catches visual regressions on a *populated* listing. It cannot catch the
failures that happen when the data shape changes: an empty result set that should
render a friendly empty state (not a crash or a bare heading), a single result that
should not show pager/collection chrome, a large result set that must paginate, and
a result missing an optional field (no image, no date, no summary) that must degrade
gracefully rather than render a broken card.

## The edge-case matrix (per Views-driven component)

Apply to each of: post-list, event-list, directory, resource-view, event-calendar.

| Case | Input | Assert |
|---|---|---|
| Empty | 0 results | No crash; the empty-state markup renders (or the block renders nothing) — never a dangling heading or an empty `<ul>` with pager chrome. |
| Single | 1 result | The card renders; collection-level chrome that only makes sense for many (pager, "view all") is absent or correct. |
| Many | > page size | Correct number of cards on page 1; pager present; no duplicate/missing rows. |
| Missing optional field | 1 result lacking image / date / summary | The card degrades gracefully — the optional element is omitted, not rendered empty or broken; no undefined-variable output. |
| Featured / display variants | each display mode the block supports (`full`, teaser, calendar) | Each display renders its expected structure. |

## Runner and location

- **Schema layer (runnable now, once the SDC exists):** extend
  `atomic/tests/src/Unit/SdcSchemaValidationTest.php` — a view-embed SDC's props
  (`view_id`, `display_id`, `argument`) validate for valid/invalid values. This is
  the cheap, no-DB layer, consistent with every other wave.
- **Render layer (the real edge-case coverage):** a **Kernel test** is required
  here, not a Unit test — rendering a View needs the entity/view system bootstrapped
  and fixture content for the empty/single/many cases. This is the first place in the
  epic that genuinely needs a Kernel test (the recipe notes Kernel tests were
  optional for the thin-wraps; for Views they are not). Location:
  `atomic/tests/src/Kernel/` (to be created). It must install the view + block
  modules and create fixture nodes per case.
- **JS layer (calendar/modal only):** the event-calendar's interactive calendar +
  modal keep the Vitest + jsdom behavioral pattern used for accordion/tabs
  (`components/**/*.test.js`).

## Dependencies and sequence

1. #1161 settles the Views block structure.
2. #1160 delivers the Views-driven SDCs (component-wrapper -> view-embed -> row cards).
3. Then this wave: schema tests immediately; the Kernel render tests once there is a
   themed SDC + fixture content to render; the calendar/modal Vitest last.

## What is committed now

This plan only. The Kernel-test harness and the per-component edge-case tests are
not written because there are no Views-driven SDCs to test yet (#1360 is blocked on
#1161). The matrix above is the executable specification for when they exist.

## Related follow-up (found during this planning)

The existing `SdcSchemaValidationTest.php` docblock claims render-level enforcement
"is covered by the Kernel test," but no `atomic/tests/src/Kernel/` directory exists
yet. This wave is the natural time to create that directory (for the Views render
tests) and correct the stale comment.
