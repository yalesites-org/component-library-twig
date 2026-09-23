# Research Spike #1352 — Drupal Canvas readiness & external-framework consumption

**Prepared:** 2026-07-02 · **Context:** YaleSites on Drupal core 10.6.12 · Part of Epic #1351

Every load-bearing claim is tagged **CONFIRMED** (with the source that was fetched/surfaced) or
**INFERRED**. This memo answers the ticket's acceptance criteria and sets two decisions the Wave 0
pilot depends on: (1) whether the thin-wrapper SDC shape is sufficient, and (2) Shadow DOM vs light
DOM for the Web Component wrappers.

---

## 1. What our target Canvas version requires structurally from an SDC

**A thin-wrapper SDC is Canvas-ready.** Canvas does **not** require assets to be co-located and does
**not** require the Twig to be self-contained. What Canvas imposes is a stricter *metadata/schema*
contract than core SDC. The migration cost is in the schema, not the asset layout.

- CONFIRMED — Minimum SDC is `*.component.yml` + `*.twig`; CSS/JS are optional
  (project.pages.drupalcode.org/canvas/sdc-components/; core SDC FAQ on drupal.org).
- CONFIRMED — Assets need not be co-located; the `.component.yml` `libraryOverrides` key attaches
  external Drupal libraries (Canvas docs: "Required Drupal libraries should be defined in the
  `libraryOverrides` section"). **This is exactly the thin-wrapper model.**
- CONFIRMED — A shim Twig may `{% include %}`/`{% embed %}` another template (even by raw path), so a
  wrapper that delegates rendering to the CLT template is valid SDC.
- CONFIRMED caveat — `include`/`embed` **bypass the Render API's `#attached`**, so assets on the
  *included* template do not auto-attach. The clean fix is to declare assets on the *wrapper's own*
  `libraryOverrides` (the SDC render element attaches that). Known SDC wrinkle, not a Canvas blocker
  (core issue #3484580).

**Canvas-specific schema constraints beyond core SDC** (author schemas to these NOW so they don't need
redoing when D11/Canvas arrives — CONFIRMED via Canvas docs + issue queue titles/snippets):
- Canvas currently **requires a props schema even for slot-only components** (relaxation tracked in
  canvas #3552069). Give every component a `props` block.
- **Required props should ship an `example`** (Canvas seeds the editor with it; active work to also
  accept `default`).
- **`object`-typed props require a `$ref`**; **image props must be objects** (`{url, alt}`), not bare
  URL strings; rich-text props render in a reduced CKEditor5 toolbar.
- Props should carry **`title` + `description`** (they become editor labels); props defined but unused
  in Twig get flagged.

## 2. Which Canvas / Drupal release to validate against

- CONFIRMED — **Canvas 1.7.1 (2026-07-01) requires Drupal core `^11.2`** (drupal.org/project/canvas).
  The 1.x line moves fast (1.0 Dec 2025 → 1.7 Jul 2026) with frequent security point releases.
- Correction to a stale premise circulating in blogs: "latest is 1.3.2 on Core 11.3.5" is **out of
  date** — authoritative drupal.org data shows 1.7.1.
- **Recommendation:** do not pin validation to a specific Canvas patch yet. Canvas is unreachable
  until we're on Core 11.2+, which we are not. Validate Canvas-readiness *indirectly* now by authoring
  schemas to the Canvas constraints above; do live Canvas validation only once a D11 upgrade lands, and
  target whatever Canvas minor is current then.

## 3. Exposing a YaleSites component to a non-Drupal team — realistic vs. not

- CONFIRMED — Canvas "Code Components" are **React/JSX** rendered by Preact-compat, stored as config
  entities, synced by `@drupal-canvas/cli`. The in-browser editor + Code Components are **React-only**;
  other frameworks need the separate `canvas_extjs` module.
- **React team:** plausible-but-frictional, and only if we *authored* components as Canvas Code
  Components — our library is Twig+SCSS SDC, which the CLI does not export. Consuming our existing
  components this way would be a **rewrite**. (INFERRED from the architecture.)
- **OutSystems team:** consuming Canvas Code Components as running code is **not realistic** (presumes a
  React/Preact runtime + Canvas sync toolchain). The only things that cross that boundary are the
  component *contract* (the `.component.yml` JSON-Schema) or a framework-neutral **Web Component**.
- **Takeaway:** Canvas Code Components are a Drupal-internal *React* decoupling story, **not** a
  cross-framework distribution mechanism. For "any team runs our component," the vehicle is a native
  **Web Component** (see §5), not a Canvas Code Component. Confidence: HIGH.

## 4. Thin-wrapper vs. fully self-contained — recommendation

**Stay with thin wrappers.** Canvas-readiness is a schema-authoring exercise, not a demand to bundle
self-contained assets. The thin-wrapper shape (schema + Twig shim + `libraryOverrides` → existing CLT
libraries) is valid SDC *and* valid Canvas SDC. The fully self-contained form remains a possible later
end-state, not a prerequisite. Confidence: HIGH.

## 5. Shadow DOM vs light DOM for Web Component wrappers — recommendation

**Use Shadow DOM + CSS-custom-property tokens, with `::part()` for structural overrides. Wrap with Lit.**

- CONFIRMED — **CSS custom properties inherit through the shadow boundary** (inheritance resolves on
  the composed tree); regular CSS rules do not. So tokens defined on `:root` cascade *into* shadow
  trees. A consumer themes by setting those custom properties from outside; authors expose `::part()`
  for deeper overrides. (MDN, open-wc, web.dev/Nordhealth, javascript.info.)
- CONFIRMED — **Carbon, Porsche, and Shoelace/Web Awesome all chose Shadow DOM + CSS-variable tokens**
  (+ `::part()`); Carbon and Shoelace/Web Awesome are built on **Lit**. (Their own styling docs.)
- CONFIRMED — **OutSystems supports importing custom Web Components and theming only via CSS custom
  properties across the shadow boundary** (OutSystems Eng. blog "Web Components: A Native Component
  Model for UI"). It's a "high-code" path: register the custom element manually (e.g. layout
  `OnReady`), ship compiled CSS (no in-app Sass), external stylesheets via `@import`.
- **Why this fits YaleSites:** our design tokens are *already* CSS custom properties (the `tokens`
  repo / `:root`), so token-piercing works for free once component internals use `var(--token)`.

**Honest costs (not blockers):** we must publish + maintain an explicit theming API (which tokens +
which `::part()`s); component SCSS must be pulled into the shadow root (mechanical, since tokens are
already variables); SSR for consumers needs Declarative Shadow DOM; consumers who want to restyle
un-exposed internals will be frustrated (mitigate with generous `::part()`).

**Tooling:** **Lit** — ~5 KB, no build step required, closest to the standard, handles Shadow DOM +
`static styles` + reactive props with minimal boilerplate; matches Carbon/Shoelace prior art. The
unavoidable, tool-independent work: Twig can't run client-side, so each wrapped component's markup is
re-expressed once as a Lit template (or produced server-side as Declarative Shadow DOM), compiled SCSS
moves into the shadow `styles`, and `Drupal.behaviors` init moves into `connectedCallback`/
`firstUpdated`. Vanilla `customElements` is the zero-dependency alternative; Stencil only earns its
complexity if we must auto-generate typed React/Vue/Angular wrapper packages simultaneously.

## 6. Drupal 11 roadmap — TEAM QUESTION (external facts only)

- CONFIRMED — **Drupal 10 EOL is 2026-12-09**; 10.6 is the *final* D10 minor (security support to Dec
  2026). Drupal 11 stable line is 11.3.x; next milestone D11.5/D12.0 ~week of 2026-12-07.
- CONFIRMED — Canvas needs Core `^11.2`, so **Canvas is strictly downstream of a D11 upgrade**.
- **I cannot confirm YaleSites' internal upgrade roadmap.** External facts say a Core 11 upgrade is a
  hard deadline (~5 months out from this memo) *independent of Canvas*. **→ Team question: is a D11
  upgrade scheduled, and when?** That answer determines how soon the Canvas half of Goal 2 matters
  (near-term vs. Phase 4+).

---

## Lowest-confidence claims to double-check before this drives a decision
(a) Porsche v4 still Stencil-built (INFERRED — not load-bearing); (b) exact current D11 patch level
(search-surfaced, not fetched from the schedule page); (c) Canvas's precise PHP pin (INFERRED from
D11's PHP 8.3+ floor). None change the recommendations.

## Net decisions handed to Wave 0
1. Thin-wrapper SDC + `libraryOverrides` — proceed.
2. Author schemas with typed props + `title`/`description`/`example` (Canvas-forward).
3. Web Component wrappers: Shadow DOM + CSS-custom-property tokens + `::part()`, built with Lit.
