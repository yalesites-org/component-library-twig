# Consuming YaleSites Web Components in OutSystems

How a non-Drupal OutSystems team consumes this package. This is the achievable
half of the epic #1351 / Wave 10 (#1365) OutSystems proof-of-concept. The
integration path below is documented and ready; the **live tenant demo is blocked**
pending access to an OutSystems environment (see "What is blocked").

The direction comes from the research spike
([`../docs/sdc/research-spike-1352-canvas-and-web-components.md`](../docs/sdc/research-spike-1352-canvas-and-web-components.md)):
OutSystems can import framework-neutral custom elements, and the only theming
channel it accepts across the shadow boundary is **CSS custom properties** — which
is exactly why these components are built with Lit + Shadow DOM + token-based
theming.

## Why a Web Component (not a Canvas Code Component)

Drupal Canvas "Code Components" are React/JSX synced by a Canvas CLI and run on a
Preact-compat runtime — a Drupal-internal decoupling story, not a cross-framework
distribution vehicle. Nothing about that toolchain runs in OutSystems. The only
artifacts that cross into OutSystems are the component *contract* (the
`.component.yml` schema) or a native **custom element**. This package is that
custom element.

## The integration path (high-code, per OutSystems docs)

OutSystems treats custom Web Components as a "high-code" extension. The steps:

### 1. Host the compiled bundle

Run the package build and host the ESM output on a URL the OutSystems app can
reach (a Resource in the module, or a CDN):

```bash
npm install
npm run build      # emits dist/*.js (ESM, Lit bundled in — no import map needed)
```

Ship `dist/yalesites-web-components.js` (registers every element) or a
per-component bundle (`dist/yds-divider.js`, `dist/yds-accordion.js`).

### 2. Register the element(s)

Load the module as an ES module script so the `customElements.define(...)` calls
run. In OutSystems this typically goes in a layout/screen "OnReady" client action
or a `<script type="module">` require, since the definitions must exist before the
tags are parsed into live elements:

```html
<script type="module" src="/resources/yalesites-web-components.js"></script>
```

### 3. Place the tags

Use the custom elements directly in the screen markup. Scalar options are
attributes; array/object inputs are JS **properties** (set from a client action,
because HTML attributes are strings only):

```html
<yds-divider width="50" position="left"></yds-divider>

<yds-accordion heading="FAQ" theme="one"></yds-accordion>
```

```javascript
// client-side, after the element is in the DOM:
document.querySelector('yds-accordion').items = [
  { heading: 'Question', content: '<p>Answer with <strong>HTML</strong>.</p>' },
];
```

### 4. Theme with CSS custom properties (the only channel that crosses the boundary)

OutSystems cannot restyle shadow-DOM internals with ordinary CSS, and it does not
run Sass in-app. Ship **compiled** CSS and set the design tokens on an ancestor
(custom properties inherit through the shadow boundary):

```css
/* an OutSystems theme stylesheet, or an @import of the compiled tokens */
:root {
  --color-divider: #00356b;      /* Yale blue */
  --color-slot-one: #00356b;     /* accordion accent */
}
```

To get the full, real Yale token set rather than the per-`var()` fallbacks baked
into each component, `@import` the compiled token stylesheet
(`@yalesites-org/tokens/build/css/tokens.css`) into the OutSystems theme. For
structural overrides a token cannot reach, use the exposed `::part()` hooks
(see the component tables in [`README.md`](README.md)):

```css
yds-accordion::part(toggle) { text-transform: uppercase; }
```

## What is confirmed vs. what is blocked

**Confirmed (from the research spike, sources cited there):** OutSystems supports
importing custom Web Components; theming across the shadow boundary is via CSS
custom properties; it is a high-code path (manual element registration, compiled
CSS, external stylesheets via `@import`). The package is built to match all three.

**Blocked — needs a human with an OutSystems tenant:** actually importing the
bundle into an OutSystems module, wiring the OnReady registration, and confirming
the elements render and theme correctly in a running OutSystems app. This cannot
be done from this environment (no OutSystems access). It is the one remaining
Wave 10 acceptance-criterion item, and it needs an OutSystems developer to run
the steps above and report back. Everything they need — the built bundle, the
registration snippet, the attribute/property/`::part()` contract, and the theming
approach — is in this package and its README.

## Note on the trust model

The accordion injects item `content` (and harvested light-DOM innerHTML) with
Lit's `unsafeHTML`, mirroring the source Twig, which prints author-provided rich
text. Do **not** pass untrusted or end-user-supplied HTML into `content` without
sanitizing it first (e.g. DOMPurify) — this applies equally in an OutSystems host.
