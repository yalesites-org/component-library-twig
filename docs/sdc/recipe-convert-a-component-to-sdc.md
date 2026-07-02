# Recipe: convert a component to a Single Directory Component (SDC)

First-draft recipe from the Wave 0 pilot (epic #1351, ticket #1353). Proven by converting
Divider, Accordion, and Callout end-to-end and verifying byte-identical rendering against the
pre-SDC baseline on real pages. Update this after every wave with anything new learned.

## The architecture: thin wrappers in `atomic/components/`

Drupal SDC only discovers components in an installed extension's own `components/` directory — it
does **not** scan `node_modules/`. So each migrated component gets a small SDC in the `atomic`
theme that **delegates** to the real template, which stays canonical in `component-library-twig`
(CLT) and keeps feeding Storybook/Percy unchanged:

```
atomic/components/<name>/
  <name>.component.yml   # the schema (props + slots), authored Canvas-forward
  <name>.twig            # a thin shim that includes/embeds @atoms|@molecules|@organisms/<name>/...
```

CSS/JS keep loading from the existing `dist/` via the `atomic/*` libraries, attached through the
SDC's `libraryOverrides` (not moved or duplicated). The `@atoms`/`@molecules`/`@organisms`
includes stay inside the shim indefinitely — that is the deliberate thin-wrapper design, not tech
debt.

## Steps

### 1. Seed the schema with the codegen script

```
node scripts/sdc/generate-sdc.js <name>          # dry run (prints)
node scripts/sdc/generate-sdc.js <name> --write   # writes atomic/components/<name>/<name>.component.yml
```

Add a spec for the component in `scripts/sdc/components.config.js` first (twig path, props path,
block `bundle`, and the `dials` map of Twig-prop → `field_style_*`). The codegen resolves the
`*-props.yml` `twigProp` indirection, remaps Storybook control types to JSON-Schema types, drops
CSS-custom-property / data-attribute props, detects slots, and generates dial enums from
`ys_themes.component_overrides.yml` **resolved against the field formatter** (see #4).

The output is a **first draft** — always review it (search for `x-codegen-todo` / `x-codegen-warning`).

### 2. Refine the schema (Canvas-forward)

- Author `title` + `description` on every prop, and `examples` on required props — Canvas uses
  these as editor labels/initial values, so doing it now means the schemas need no redo when a
  Drupal 11 / Canvas upgrade lands (see `research-spike-1352-...md`).
- **Types can diverge from Storybook controls.** A `type: boolean` prop in `*-props.yml` may be a
  real value at render time (e.g. callout's `overlayBackgroundImage` is a **URL string**). Verify
  against the Twig and the block template.
- **Optional scalar props that can receive NULL** from Drupal need a nullable type
  (`type: [string, "null"]`); SDC validates NULL against the declared type.
- Remove codegen false-positives: it detects every `{% block %}` including those inside nested
  `{% embed %}` of *other* components (e.g. an accordion that embeds the list atom surfaces
  `list__content`). Drop slots that belong to embedded sub-components.

### 3. Write the shim (`<name>.twig`)

Props are available as variables. Slots need care — this is the biggest gotcha:

- **Slots arrive as a block override** on the shim (both the SDC render element and a Twig
  `{% embed %}` from a block template). Reading a slot as a *variable* only works for the render
  element, so use the `block()` capture pattern below.
- **Name each SDC slot distinctly from the CLT block it injects into** (e.g. `callout__content`
  vs the CLT template's `callout__items`) — same-named blocks collide and the wrong one wins.
- **Thread `directory`** so nested atoms (icons) resolve the SVG sprite path — SDC does not inject
  it.

Props-only component (no slots), e.g. Divider:

```twig
{{ include('@atoms/divider/yds-divider.twig', {
  divider__width: divider__width,
  divider__position: divider__position,
}, with_context = false) }}
```

Component with a slot, e.g. Callout (`callout__content` → the CLT `callout__items` block):

```twig
{% set callout__content_slot = block('callout__content') %}
{% embed '@molecules/callout/yds-callout.twig' with {
  callout__background_color: callout__background_color,
  callout__alignment: callout__alignment,
  callout__content_slot: callout__content_slot,
  directory: directory,
} only %}
  {% block callout__items %}{{ callout__content_slot|raw }}{% endblock %}
{% endembed %}
{% if false %}{% block callout__content %}{% endblock %}{% endif %}
```

Why each line:
- `block('callout__content')` captures the override (works for both render paths).
- the captured value is passed **inside** the `with { … } only` so it is in scope in the override.
- `|raw` because `block()` returns a plain string and the content is already-rendered, trusted
  Drupal field output (double-escaping otherwise).
- `{% if false %}{% block callout__content %}{% endblock %}{% endif %}` registers the receiver block
  at compile time (so `block()` finds it) without rendering it inline (which would duplicate the
  content). A slot the CLT template consumes as a *variable* (e.g. accordion's heading) is captured
  the same way and passed through the `with`.

### 4. Wire assets via `libraryOverrides`

For a component with JS/CSS beyond the global stylesheet, depend on its existing library:

```yaml
libraryOverrides:
  dependencies:
    - atomic/accordion
```

The SDC render element attaches the component's auto-library, whose dependency pulls in the real
JS/CSS. (`include`/`embed` bypass `#attached`, so relying on the inner template to attach assets
does **not** work — this is why the dependency goes on the SDC.)

### 5. Point the Layout Builder block template at the SDC

In `atomic/templates/block/layout-builder/block--inline-block--<name>.html.twig`:

- Render props-only components with `{{ include('atomic:<name>', { … }, with_context = false) }}`.
- Render components with slots with `{% embed 'atomic:<name>' with { … } %}{% block <slot> %}…{% endblock %}{% endembed %}` — **do not use `only` here**, or the slot block override loses access to `content` and `directory`.
- **The block template is the adapter layer.** Default dial values here — older blocks can store
  NULL and the SDC enums are strict, and the schema `default` only applies to *absent* (not NULL)
  props: `content.field_style_color.0['#markup']|default('one')`. Choose the default that matches
  the pre-SDC behavior for a NULL value (trace the CLT template's own `|default(...)`).
- Remove now-redundant `{{ attach_library() }}` calls (the SDC attaches via `libraryOverrides`).

### 6. Dial enums come from the field FORMATTER, not just the config

`ys_themes.component_overrides.yml` gives `values: {machine: Label}` per component/field, but what
actually reaches the prop is the **view-display formatter** output
(`core.entity_view_display.block_content.<bundle>.default.yml`):

- `list_key` formatter → the machine **keys** (`one`…`five`, `left`, `center`, `default`).
- `list_default` formatter → the human **labels** (divider width `100/75/50/25`, position
  `Left/Center` — which the template then `|lower`s).

The split is ~35 `list_default` / ~44 `list_key` platform-wide, so codegen reads the formatter; the
`*-props.yml` `options` and the override keys are cross-checks that warn on drift, not the source.

## Verify (do not skip)

- `lando drush cr`, then render in isolation:
  `lando drush ev '$b=["#type"=>"component","#component"=>"atomic:<name>","#props"=>[...],"#slots"=>[...]]; print \Drupal::service("renderer")->renderInIsolation($b);'`
- **Capture a real before/after baseline.** Stash the atomic changes, render an affected page,
  restore, render again, and diff (strip SDC dev decorations: `data-component-id` and the
  `🥚/🥜 Component` comments, which only appear with Twig debug on). Confirm byte-identical output.
- Confirm the JS attaches on a real page (grep the page for the component's `dist/js/*.js`).
- Run the schema-validation test (`lando composer test:sdc`) and any behavioral tests
  (`npm run test:unit` in CLT).

## Gotchas cheat-sheet

- SDC does **not** inherit Twig context; props/slots only. `directory` and any other ambient
  variable a nested include needs must be threaded explicitly.
- SDC prop validation is **assertion-gated** (dev/tests only). Invalid props throw in dev, silently
  render in a `--no-dev` prod build. Tests must run with assertions on.
- A prop and a slot may not share a name (SDC rejects it) — and an SDC slot must not share a name
  with the CLT block the shim overrides.
- Prefer `include(..., with_context=false)` / explicit `with { … } only` on the shim's inner embed
  for isolation, but forward everything the inner template needs (props, slots, `directory`).
- **Rich content into an auto-escaping sink.** When the CLT template consumes a slot as a *variable*
  printed with a bare `{{ x }}` (no `|raw`) — e.g. a `<blockquote>{{ quote }}` or `<figcaption>{{ attribution }}` —
  capturing the slot as a plain string and passing it will **double-escape** rich field markup
  (the block template feeds a render array whose rendered HTML is already escaped). Capture it as
  **Markup** instead so the sink doesn't re-escape:
  `{% set x %}{{ block('slot')|raw }}{% endset %}` (a `{% set %}…{% endset %}` capture is a safe
  Markup object). If that slot is optional and the template gates on `{% if x %}`, empty it when
  blank so the check stays falsy: `{% set x = captured|trim is empty ? '' : captured %}`. (Slots
  whose sink already applies `|raw` — e.g. the text atom — don't need this.)
- **Don't drop "unused"-looking `{% set %}` vars from a block template.** The pre-SDC `{% include %}`
  (no `only`) passed block-template variables like `<comp>__width`/`<comp>__alignment` via context
  inheritance even when they weren't in the `with {…}`. Under SDC they must be explicit props the
  block template passes. Always capture a real before/after baseline to catch this.
