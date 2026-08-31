# Single Directory Components (SDC) on YaleSites

This directory is the documentation set for the YaleSites migration of the Twig
component library to Drupal [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
(SDC), tracked by epic [#1351](https://github.com/yalesites-org/YaleSites-Internal/issues/1351).

## What an SDC is here

A YaleSites SDC is a **thin wrapper** that lives in the `atomic` theme
(`atomic/components/<name>/`) and delegates rendering to the canonical Twig
template, which stays in this repository (`component-library-twig`) and keeps
feeding Storybook and Percy unchanged. Each wrapper is two files:

```
atomic/components/<name>/
  <name>.component.yml   # the schema: typed props + slots (authored Canvas-forward)
  <name>.twig            # a shim that include/embeds @atoms|@molecules|@organisms/<name>/...
```

Drupal SDC only discovers components in an installed extension's own
`components/` directory; it does **not** scan `node_modules/`. That constraint is
why the wrapper lives in `atomic` while the real template, SCSS, and JS stay
canonical in this library. See the migration guide for the full rationale.

## The documents

| Document | Read it when |
|---|---|
| [migration-guide.md](migration-guide.md) | You want the overview: why SDC, the architecture, current status, and how the remaining components get migrated. |
| [recipe-convert-a-component-to-sdc.md](recipe-convert-a-component-to-sdc.md) | You are converting an **existing** CLT component to an SDC. The step-by-step, with every gotcha found in the migration. |
| [building-a-new-block-as-sdc.md](building-a-new-block-as-sdc.md) | You are building a **brand-new** Layout Builder block and want it to be an SDC from day one. |
| [recipe-test-a-new-sdc.md](recipe-test-a-new-sdc.md) | You need to test an SDC (schema-validation for every component; behavioral for interactive ones). |
| [research-spike-1352-canvas-and-web-components.md](research-spike-1352-canvas-and-web-components.md) | You need the Canvas-readiness and Web Component background that set the direction. |

## The two non-obvious rules, up front

1. **SDC prop validation is assertion-gated.** Invalid props (a bad enum, a wrong
   type) throw in dev and test (PHP assertions on) but render silently in a
   `--no-dev` production build. Author schemas correctly and test them; do not
   rely on production to catch a schema mismatch.
2. **SDC does not inherit Twig context.** Only declared props and slots are in
   scope inside a component. Anything a nested template needs — most commonly
   `directory` for the icon sprite path — must be threaded through explicitly.

Both are explained in depth in the recipe.
