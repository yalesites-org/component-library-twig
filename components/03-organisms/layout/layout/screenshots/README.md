# Section background contrast evidence — YaleSites-Internal#1613

Rendered proof for the section-colour contrast audit. Captured from a real Drupal render on
the local Lando site (not Storybook), because the audit is about what the cascade actually
resolves to inside a Layout Builder section — the failure mode #1614 hit was a custom
property that only resolved by inheriting from an ancestor.

## How to regenerate

Two fixture builders live in `yalesites-project/scripts/local/`:

```bash
lando drush php:script scripts/local/1613-section-contrast-fixture.php   # section backgrounds
lando drush php:script scripts/local/1613-block-contrast-fixture.php     # blocks on those backgrounds
```

Each builds one node per section type holding one section per section-theme option, so a
single full-page capture per global theme covers every background at once — 7 captures per
page instead of one per (block × background × theme).

Global theme is a sitewide setting; sweep it with:

```bash
lando drush ev "\Drupal::service('ys_themes.theme_settings_manager')->setSetting('global_theme','<one..seven>');"
```

Two traps when re-running: append a cache-busting query string to the URL (the browser
otherwise serves a disk-cached page and you photograph the wrong global theme), and read the
rendered `data-global-theme` back after each capture to confirm it changed.

## Naming

`{before|after}-{one-column|seventy-thirty}-global-<n>-<label>.jpg`
: The **section** fixture — a text block with a heading, body copy and a link in each of the
  six section-theme backgrounds. Proves every background option paints, and shows the
  section-supplied foreground on it. `seventy-thirty` also shows the always-on column
  separator, which is what the `--color-divider` change affects.

`blocks-{before|after}-one-column-global-<n>-<label>.jpg`
: The **block** fixture — `custom_cards`, `directory`, `reference_card`, `wrapped_image`,
  `content_spotlight_portrait`, plus `button_link` and `divider` (unchanged, but they consume
  properties the shared rule re-points, so they need regression evidence).

`<n>` is the global theme number, `<label>` its palette name: one=Old Blues,
two=New Haven Green, three=Shoreline Summer, four=Onha, five=It's Your Yale, six=AI,
seven=Whitney Humanities Center.

## What the pairs show

- **`before-*` — the prerequisite check.** All six background options render on both section
  types in all 7 global themes. The ticket's "backgrounds may not paint" blocker does not
  reproduce on `1616-section-color-parity`; it is resolved, not outstanding.
- **`before-*` vs `after-*`.** The 70/30 column separator changes from a fixed mid-grey
  (`--color-gray-500`, which the section could not reach) to the section's own foreground.
- **`blocks-before-*` vs `blocks-after-*`.** Card borders, overlines, eyebrows and prefixes
  stop being fixed grey/blue palette values and follow the section, so they stay legible on
  the dark backgrounds (section themes one, three and four).

Images are downscaled to 700px wide and JPEG-encoded to keep the repository weight
reasonable; the numeric evidence is in
`components/00-tokens/colors/section-background-contrast.txt`, which is generated and exact.
