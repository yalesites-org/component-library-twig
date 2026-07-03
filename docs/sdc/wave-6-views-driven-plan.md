# Wave 6 (#1360) — Views-driven components: conversion plan

Epic [#1351](https://github.com/yalesites-org/YaleSites-Internal/issues/1351), ticket #1360.

**Status: blocked on coordination, plan ready to execute.** Wave 6 covers the
listing components that Drupal Views renders (post/event lists, directory, resource
view, event calendar). This document is the ready-to-execute plan; the code is
deliberately not written yet because these components are coupled to the in-flight
Views Block Rework epic **#1161** and their block templates are being actively
modified right now (recent commits `YOR-27`, heading_links conditionals). Writing
SDCs against them today would conflict with that work.

## Why these are not thin-wraps like the other 26

The converted components delegate to a single `@molecules|@organisms/<name>` Twig
include. The Views-driven blocks do not — they render a **Drupal View**, whose
row/card markup lives in the View's own field/row templates, not a component
include. Two shapes exist (confirmed by reading the block templates):

| Block | Render mechanism |
|---|---|
| `post-list` | `drupal_view('post_list', 'full', <heading>)` — direct view render |
| `event-list` | `drupal_view('event_list', 'full', <heading>)` — direct view render |
| `resource-view` | embeds `@organisms/component-wrapper` around view params |
| `event-calendar` | embeds `@organisms/component-wrapper` (+ the `calendar` organism / `modal`) |
| `directory` | to be traced (neither a bare `drupal_view` nor `component-wrapper` at a glance) |
| generic `view` | embeds `@organisms/component-wrapper` around `field_view_params` |

So there is no single molecule to wrap. The SDC target is one of:

1. **A "view embed" SDC** — schema of `{ view_id, display_id, argument }` + a
   heading slot; the shim renders `drupal_view(...)`. Stable regardless of the
   row internals #1161 reworks, because it wraps the *embed API*, not the rows.
2. **The row/card component** — SDC-ify the card the View renders per row. This is
   the higher-value but higher-coupling option and overlaps the Wave 5 card
   collections; it depends on #1161's final row structure.
3. **`component-wrapper`** — the shared organism several of these embed. It is
   high-blast (8+ usages across resource-view, event-calendar, the generic view,
   and more), so it needs its own careful conversion with baseline verification.

## Coordination points with #1161 (must resolve before coding)

- Are the `post_list` / `event_list` View **display IDs** (`full`) and their
  arguments stable under #1161, or is #1161 changing how these blocks invoke Views?
  Option 1 (view-embed SDC) is only safe if the embed interface is stable.
- Is #1161 reworking the **row/card templates**? If so, option 2 must wait for the
  final row structure to avoid authoring a schema against soon-to-change markup.
- Does #1161 touch `component-wrapper`? If so, sequence the component-wrapper SDC
  after #1161 to avoid a merge conflict on a high-blast shared organism.

## Recommended sequence (once #1161 is settled)

1. Convert **`component-wrapper`** first (shared, high-blast) with a full
   before/after baseline on the pages that embed it — it unblocks resource-view,
   event-calendar, and the generic view.
2. Add the **view-embed SDC** (option 1) for post-list / event-list — low-risk,
   wraps the stable `drupal_view` interface; schema `{view_id, display_id,
   argument}` + heading slot.
3. Only then consider **row/card SDCs** (option 2), coordinated with the Wave 5
   card-collection work, against #1161's final row structure.
4. Each step: schema test + a Views edge-case behavioral test (see the Wave 6b test
   plan, `wave-6b-views-test-plan.md`) + baseline verification + the review gate.

## What is committed now

This plan only. No SDC code for Views-driven components has been written, to avoid
conflicting with the active #1161 work. The recipe (`recipe-convert-a-component-to-sdc.md`)
and codegen are ready to apply the moment the coordination questions above are
answered.
