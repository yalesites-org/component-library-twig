# Building a new Layout Builder block as an SDC

Use this when you are creating a **brand-new** YaleSites block and want it to be a
Single Directory Component from the start. If you are converting an existing
component, use [recipe-convert-a-component-to-sdc.md](recipe-convert-a-component-to-sdc.md)
instead — this guide reuses the same patterns but starts from nothing.

The end state is the same thin-wrapper shape every migrated component uses: the
markup/SCSS/JS is canonical in `component-library-twig`, and a small SDC in the
`atomic` theme carries the schema and delegates to it. Read
[migration-guide.md](migration-guide.md) for why the wrapper lives in `atomic`.

## 1. Build the component in the library (as usual)

Author the component in `component-library-twig` the normal way (see the repo
root `README.md` and `CONTRIBUTING.md`): a `components/0X-<tier>/<name>/`
directory with `yds-<name>.twig`, `_yds-<name>.scss`, an optional
`yds-<name>.js` Drupal behavior, `<name>-props.yml`, and the Storybook
`.stories.js` / `.mdx` / `.visreg.stories.js` files. Get it rendering and
documented in Storybook first. Nothing about SDC changes this step.

Decide the component's inputs now, because they map directly onto the schema:

- **Props** — scalar values (strings, enums, numbers, booleans). Dial-style
  options (theme, color, alignment) become string enums.
- **Slots** — anything that is rendered markup or a render array (a heading, a
  body, a list of items). Render arrays cannot pass JSON-schema scalar validation,
  so they must be slots, not props.

## 2. Author the SDC schema in `atomic`

Create `atomic/components/<name>/<name>.component.yml`. Author it Canvas-forward —
every prop gets a `title` and `description`, required props get an `example`:

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: <Human Name>
status: stable
group: Atoms   # or Molecules / Organisms — matches the component's tier
description: >
  One-line summary. Note this is a thin SDC wrapper over the component library's
  @<tier>/<name>/yds-<name>.twig template.
props:
  type: object
  properties:
    <name>__theme:
      type: string
      title: Theme
      description: Color theme dial for the component.
      enum: ['one', 'two', 'three', 'four', 'five']
      default: 'one'
    <name>__heading_text:
      # Optional scalar that Drupal may pass as NULL needs a nullable type.
      type: ['string', 'null']
      title: Heading
      description: Optional heading shown above the body.
slots:
  <name>__body:
    title: Body
    description: The main rendered content.
```

Rules that bite if you skip them:

- **A prop and a slot may not share a name**, and an SDC slot must not share a
  name with the CLT block the shim overrides.
- **Optional scalar props that Drupal can pass as NULL need `type: ['string',
  'null']`.** SDC validates NULL against the declared type; a bare `type: string`
  rejects it. Give the schema a `default` too, but note the default only applies
  to *absent* props, not NULL ones (the block template handles NULL — step 4).
- **Enums are string enums**; quote heterogeneous keys (`'one'`, `'true'`,
  `'100%'`).

If the component has dials, prefer generating the schema instead of hand-typing
it: add a spec to `scripts/sdc/components.config.js` (in `yalesites-project`) and
run `node scripts/sdc/generate-sdc.js <name> --write`. The codegen resolves dial
enums from `ys_themes.component_overrides.yml` against the field formatter, so the
enum values match what Drupal will actually pass.

## 3. Write the shim (`<name>.twig`)

The shim delegates to the canonical template. Props are in scope as variables;
slots need the `block()` capture pattern.

Props-only:

```twig
{{ include('@molecules/<name>/yds-<name>.twig', {
  <name>__theme: <name>__theme,
}, with_context = false) }}
```

With a slot (capture the slot override, pass it into the inner embed, and register
a non-rendering receiver block so `block()` resolves at compile time):

```twig
{% set <name>__body_slot = block('<name>__body') %}
{% embed '@molecules/<name>/yds-<name>.twig' with {
  <name>__theme: <name>__theme,
  <name>__body_slot: <name>__body_slot,
  directory: directory,
} only %}
  {% block <name>__items %}{{ <name>__body_slot|raw }}{% endblock %}
{% endembed %}
{% if false %}{% block <name>__body %}{% endblock %}{% endif %}
```

If the slot feeds an auto-escaping sink in the template (a bare `{{ x }}`, not
`{{ x|raw }}`), capture it as Markup instead so it is not double-escaped:
`{% set x %}{{ block('<name>__body')|raw }}{% endset %}`. The recipe has the full
explanation and the emptiness guard for optional slots. **Thread `directory`**
whenever the component (or a nested atom) renders an icon.

## 4. Create the Drupal block and its template

A new block is more than the component — it needs the Drupal plumbing that an
existing block already has:

1. **Block content type + fields.** Create the `block_content` bundle and its
   fields (body, dial fields such as `field_style_color` / `field_style_alignment`,
   etc.) via config in `yalesites_profile`.
2. **View-display formatter.** In
   `core.entity_view_display.block_content.<bundle>.default.yml`, choose the dial
   field formatter deliberately: `list_key` outputs machine keys (`one`..`five`),
   `list_default` outputs labels. **This decides the enum values your schema must
   accept** — see recipe section 6.
3. **Dial config.** If the block has dials, add them to
   `ys_themes.component_overrides.yml` (`<bundle> -> <field> -> {values, default}`).
4. **Block template.** Create
   `atomic/templates/block/layout-builder/block--inline-block--<name>.html.twig`
   and render the SDC from it. This is the adapter layer:
   - Props-only: `{{ include('atomic:<name>', { ... }, with_context = false) }}`.
   - With slots: `{% embed 'atomic:<name>' with { ... } %}{% block <slot> %}...{% endblock %}{% endembed %}` —
     **do not use `only` on the block template's embed**, or the slot block loses
     access to `content` and `directory`.
   - **Default legacy NULLs here**, because the schema default does not cover NULL:
     `content.field_style_color.0['#markup']|default('one')`. Choose the default
     that matches the component's own pre-existing `|default(...)` behavior.
   - Thread `directory` if the component renders icons.

## 5. Wire assets

If the component has CSS/JS beyond the global stylesheet, add its library to the
SDC (not the inner template — `include`/`embed` bypass `#attached`):

```yaml
# in <name>.component.yml
libraryOverrides:
  dependencies:
    - atomic/<name>
```

Define `atomic/<name>` in `atomic.libraries.yml` pointing at the compiled
`dist/` assets, as existing component libraries do.

## 6. Test and verify

- Add a schema-validation case to `atomic/tests/src/Unit/SdcSchemaValidationTest.php`
  (valid data passes, invalid data fails) and run `lando composer test:sdc`. See
  [recipe-test-a-new-sdc.md](recipe-test-a-new-sdc.md).
- If the component is interactive, add a Vitest behavioral test and prove it is
  meaningful (break the behavior, confirm the test fails, restore).
- Render the block on a page and confirm it looks right. Render **twice on a fresh
  `drush cr`** — a single render can be cache-served and hide a prop-validation
  500 for a NULL prop.
- Confirm the component's JS attaches (grep the page for its `dist/js/*.js`).

## 7. Ship it

Run the review gate (`/simplify`, `/code-review`, `/security-review` when the diff
touches user input, assets, or output escaping), lint with `composer code-sniff`,
and open PRs. Because a new component touches `component-library-twig` and
`atomic` (and `yalesites-project` for config), use matching branch names across
the repos so the multidev builds — see the `/yalesites-pr` skill.
