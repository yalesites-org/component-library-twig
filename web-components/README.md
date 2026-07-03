# YaleSites Web Components

The framework-neutral distribution of YaleSites design-system components as
[custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components),
built with [Lit](https://lit.dev). It lets non-Drupal teams consume YaleSites
components (epic #1351 — pilot in #1353, distribution package in #1365 / Wave 10).

**Scope, honestly:** the package infrastructure is complete — a self-contained
build, a behavioral test suite, publish-ready packaging, and an OutSystems
integration guide. **Two** components are wrapped so far: a trivial static one
(`<yds-divider>`) and a harder one with JavaScript behavior (`<yds-accordion>`).
Wrapping the rest of the library is per-component work that reuses the recipe below
(each SDC's Twig is re-expressed once as a Lit template — see "Honest limitations").

The approach follows the research spike decision
(`../docs/sdc/research-spike-1352-canvas-and-web-components.md`):
**Lit + Shadow DOM + CSS custom properties for theming, with `::part()` hooks.**

To consume this package from OutSystems specifically, see
[`OUTSYSTEMS.md`](OUTSYSTEMS.md).

---

## Quick start

```bash
cd web-components
nvm use            # Node 20.14.0 (repo .nvmrc); system Node 20+ also works
npm install
npm run build      # bundles to ./dist as ESM (Lit included)
npm test           # behavioral tests (Vitest + jsdom)
```

Then view the no-Drupal demo. ES module scripts do not load over `file://`, so serve
over HTTP:

```bash
# from web-components/
npx http-server . -o /demo/
# or
python3 -m http.server   # then open http://localhost:8000/demo/
```

## Consuming the package

The build emits ESM with Lit bundled in, so a consumer needs no build step and no
import map — just import the file and use the tags:

```html
<script type="module" src="/path/to/yalesites-web-components.js"></script>

<yds-divider width="50" position="left"></yds-divider>

<yds-accordion heading="FAQ" theme="one"></yds-accordion>
<script type="module">
  document.querySelector("yds-accordion").items = [
    { heading: "Question", content: "<p>Answer with <strong>HTML</strong>.</p>" },
  ];
</script>
```

Per-component bundles are also emitted (`dist/yds-divider.js`, `dist/yds-accordion.js`)
for consumers who only want one element.

---

## The recipe: wrapping an SDC as a Web Component

### 1. Re-express the markup (Twig cannot run client-side)

Each SDC's `.twig` is authored once as a Lit `render()` template. This is unavoidable,
tool-independent work: there is no browser Twig runtime, so the DOM structure and BEM
class names are reproduced by hand. Keep the class names identical so ported SCSS
selectors keep matching.

### 2. Move the SCSS into the shadow root

The component's compiled styles live in Lit's `static styles = css\`...\``, scoped to the
shadow root. Regular CSS selectors do **not** cross the shadow boundary, which is what
gives the component style isolation.

### 3. Theme with CSS custom properties (the key move)

CSS custom properties **inherit through the shadow boundary** — they resolve on the
composed tree. YaleSites design tokens (`@yalesites-org/tokens`) are already CSS custom
properties, so component internals just reference them:

```css
.divider {
  background: var(--color-divider, var(--color-gray-500, hsl(0, 0%, 46%)));
}
```

A consumer themes by setting those properties on any ancestor (typically `:root`):

```css
:root {
  --color-divider: rebeccapurple;
}
```

Every `var()` here ships a **fallback**, so the component renders correctly even when no
token stylesheet is loaded. Load `@yalesites-org/tokens/build/css/tokens.css` to get the
full, real Yale token set.

### 4. Add `::part()` for structural overrides

Custom properties re-theme values; `::part()` lets a consumer restyle internal elements
a token cannot reach:

```css
yds-accordion::part(toggle) {
  text-transform: uppercase;
}
```

### 5. Port JS behavior into the Lit lifecycle

The Drupal behavior (`Drupal.behaviors.*.attach`) moves into Lit's reactive cycle:
- initial state (accordion: "collapse all on attach") → the constructor / `willUpdate`
- event wiring → declarative `@click` bindings in the template
- imperative DOM reads that must run after render (accordion: measuring
  `scrollHeight` to animate panel height) → `updated()` / `firstUpdated()`

### Prop / slot → attribute / property / slot mapping

| SDC concept | Web Component surface |
| --- | --- |
| Scalar Twig variable (e.g. `divider__width`) | reflected **attribute** (`width="50"`) |
| Enum variable (e.g. `divider__position`) | attribute with validation in `render()` |
| Array/object variable (e.g. `accordion__items`) | JS **property** (`el.items = [...]`) — attributes are strings only |
| Rich-text/HTML variable | JS property (string of HTML), injected with `unsafeHTML` |
| Twig `{% block %}` / children | light-DOM **slots** (here: `data-accordion-heading` children, harvested) |
| Component theme (`data-component-theme`) | `theme` attribute → `data-component-theme` + token overrides |

---

## Components

### `<yds-divider>`

| Attribute | Values | Default | Notes |
| --- | --- | --- | --- |
| `width` | `100` `75` `50` `25` | `100` | Width as a % of the container |
| `position` | `left` `center` | `center` | Horizontal alignment |

Parts: `wrapper`, `inner`, `divider`. Recolor with `--color-divider`; resize the line
with `--thickness-divider`.

### `<yds-accordion>`

| Attribute / property | Values | Default | Notes |
| --- | --- | --- | --- |
| `heading` (attr) | string | — | Optional group heading above all items |
| `theme` (attr) | `default` `one`–`five` | `default` | Color accent |
| `alignment` (attr) | `center` `left` | `center` | |
| `items` (property) | `Array<{heading, content}>` | `[]` | `content` is an HTML string |

Items can also be authored in light DOM as child elements with
`data-accordion-heading` (their innerHTML becomes the panel body). Behavior: per-item
expand/collapse, an "Expand All / Collapse All" toggle (shown only with 2+ items), and
native keyboard operation (headers are real `<button>`s, so Enter/Space work).

Parts: `accordion`, `inner`, `heading`, `controls`, `toggle-all`, `item`,
`item-heading`, `toggle`, `content`, `icon`. Accent color follows
`--color-accordion-accent` (or the underlying `--color-slot-*` tokens).

---

## Honest limitations

- **Markup is re-expressed, not shared.** Twig cannot run in the browser, so each
  wrapped component duplicates the source template's structure by hand. The two
  representations can drift; keeping them in sync is manual until a generation step
  exists.
- **SSR needs Declarative Shadow DOM.** These components render client-side. Server-side
  rendering for consumers requires emitting
  [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom) (e.g. via
  `@lit-labs/ssr`); not covered in Wave 0.
- **`unsafeHTML` trust model.** Accordion `content` (and harvested light-DOM innerHTML)
  is injected with Lit's `unsafeHTML`, matching the source Twig, which prints
  author-provided rich text. Do **not** pass untrusted/user-supplied HTML without
  sanitizing it first.
- **Light-DOM harvesting is timing-sensitive.** Child items are read once in
  `connectedCallback`. With deferred module scripts (as in the demo) the children are
  parsed first, so this is safe — but the `items` **property** is the robust,
  order-independent path.
- **Theme fidelity is partial.** The full accordion SCSS resolves color slots across
  global + component themes; this pilot ports the default theme plus the non-default
  accent-bar treatment and maps `theme="one".."five"` to `--color-slot-*`. Full
  slot/global-theme fidelity is deferred.

## Testing

Behavioral tests run in Vitest + jsdom (`test/*.test.js`), covering what Percy
cannot see: divider enum-validation fallbacks and separator semantics; accordion
collapse-on-attach, per-item toggle ARIA, the "toggle all" control (present only
with 2+ items), light-DOM item harvesting, rich-content injection, and heading-level
outline (h2 vs h3 with a group heading).

```bash
npm test           # vitest run
```

Each test was mutation-verified (breaking the targeted behavior fails exactly the
test that covers it). New wrapped components should add a co-located
`test/<name>.test.js` in the same style.

## Publishing

The package is configured for publication to GitHub Packages
(`publishConfig.registry`); `prepublishOnly` runs `check`, `test`, and `build` so a
release always ships a fresh, tested bundle. Publishing itself is a **gated human
step** — it needs the `@yalesites-org` registry auth (`YALESITES_BUILD_TOKEN`) and
team sign-off, and is intentionally not automated here.

## Scope note

Nothing here touches the existing webpack/Storybook build. This directory is fully
self-contained: its own `package.json`, its own `esbuild` build (`build.mjs`), its
own Vitest config, its own `dist/`. Removing `web-components/` leaves the library
build untouched.
