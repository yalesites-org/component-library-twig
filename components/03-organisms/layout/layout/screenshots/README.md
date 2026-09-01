# Section background contrast evidence — YaleSites-Internal#1613

Rendered proof for the section-colour contrast audit. Captured from a real Drupal render on
the local Lando site rather than from Storybook, because the audit is about what the cascade
actually resolves to inside a Layout Builder section — the failure mode #1614 hit was a custom
property that resolved only by inheriting from an ancestor, which a token-only computation
reports as passing.

## How to regenerate

Two fixture builders live in `yalesites-project/scripts/local/`:

```bash
lando drush php:script scripts/local/1613-section-contrast-fixture.php   # section backgrounds
lando drush php:script scripts/local/1613-block-contrast-fixture.php     # blocks on those backgrounds
```

Each builds one node per section type holding one section per section-theme option, so a
single full-page capture per global theme covers every background at once.

Global theme is a sitewide setting; sweep it with:

```bash
lando drush ev "\Drupal::service('ys_themes.theme_settings_manager')->setSetting('global_theme','<one..seven>');"
```

Four things will silently give you wrong images if you skip them:

1. **Capture at ≥1400px wide.** `$break-2xl` is 1400px, and below it a 70/30 section renders
   stacked — no side-by-side columns and `.yds-layout__secondary`'s `border-left` computes to
   `0px`, so the column separator this work re-points is simply not in the picture.
2. **Cache-bust the URL** (`?cb=$(date +%s%N)`). The browser otherwise serves a disk-cached
   page and you photograph the previous global theme while the database says otherwise.
3. **Read the rendered `data-global-theme` back** after each capture to confirm it changed.
4. **Take "before" from the branch base**, not from your own HEAD:
   `git checkout origin/1616-section-color-parity -- <the changed .scss files>`. Stashing
   reverts to your last commit, which — once you have committed anything — is not the
   baseline, and the resulting pair understates or hides the change.

Finally, byte-compare each before/after pair. A byte-identical pair means you photographed
stale CSS, unless you can say why that page contains nothing the change touches.

## Naming and coverage

| Pattern                                                   | Count | What it shows                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{before,after}-one-column-global-<n>-<label>.jpg`        | 14    | One column, one section per background option, containing a text block with a heading, body copy and a link. **These pairs are byte-identical by design** — a One column section holding only a text block contains nothing this change touches. They are the _prerequisite_ evidence: every background option paints, in every global theme. |
| `{before,after}-seventy-thirty-global-<n>-<label>.jpg`    | 14    | Same, for 70/30. These pairs **do** differ: the always-on column separator goes from a fixed mid-grey (`--color-gray-500`, measured `rgb(117,117,117)`) to the section's own foreground — white on section themes one/three/four, near-black on two/five/six.                                                                                 |
| `blocks-{before,after}-one-column-global-<n>-<label>.jpg` | 14    | The block fixture: `custom_cards`, `directory`, `reference_card`, `wrapped_image`, `content_spotlight_portrait` (all changed), plus `button_link` and `divider` (unchanged, included as regression evidence because they consume `--color-layout-border` and `--color-divider`).                                                              |
| `blocks-after-seventy-thirty-global-<n>-<label>.jpg`      | 7     | The same blocks in a 70/30 section. **End state only.** The before/after comparison for these blocks is in the One column set above — the properties involved inherit identically in both layouts — and the 70/30-specific change is evidenced by the section-level pair. Recorded here rather than left implicit.                            |

`<n>` is the global theme number, `<label>` its palette name: one=Old Blues,
two=New Haven Green, three=Shoreline Summer, four=Onha, five=It's Your Yale, six=AI,
seven=Whitney Humanities Center.

## What to look for

- **Prerequisite.** All six background options render on both section types in all 7 global
  themes. The ticket's "backgrounds may not paint" blocker does not reproduce on
  `1616-section-color-parity`; it is resolved, not outstanding.
- **The 70/30 separator**, in the `seventy-thirty` pairs.
- **Card borders, overlines, eyebrows and prefixes**, in the `blocks-` pairs. They stop being
  fixed grey/blue palette values and follow the section, so they stay legible on the dark
  backgrounds (section themes one, three and four).

Images are downscaled and JPEG-encoded to keep repository weight reasonable, so they are
evidence of the _visible_ change rather than a source of exact colour values. The exact
numbers are in `components/00-tokens/colors/section-background-contrast.txt`, which is
generated and reproducible.

## #1614 — functional-element contrast

Added by yalesites-org/YaleSites-Internal#1614, which audited the three blocks #1613 left
alone (accordion, `link_grid`, `wrapped_text_callout`).

| Pattern | Count | What it shows |
| --- | --- | --- |
| `1614-{before,after}-global-<n>-<label>-callout-heading-dial-<d>-section-<s>.png` | 8 | The Wrapped Callout heading, which read a fixed slot-seven declared on `.wrapped-callout` itself and so could never be reached by the section. Dark-on-dark before, section foreground after. |
| `1614-{before,after}-global-<n>-<label>-link-grid-heading-dial-<d>-section-<s>.png` | 8 | The Link Grid block heading on dials `two` and `six`, the two the white-heading rule does not cover. |

Element captures, not full pages: the #1614 fixtures hold 36-42 sections each and a
full-page image of one is unreadable at any size a ticket comment will show.

Two global themes only — one (Old Blues) and four (Onha, where the slot-two/slot-five swap
applies). These are illustrations; the exhaustive evidence is all 4410 measured cells,
summarised in `components/00-tokens/colors/functional-element-contrast.txt`.

Regenerate with `node scripts/local/1614-capture.mjs <before|after> <output-dir>` in
yalesites-project. The four warnings above apply unchanged — in particular, take "before"
from the branch base rather than from a stash, which is how these were captured.

Note the unstyled blue link visible in the callout body copy in **both** states. That is
deliberate: it is yalesites-org/YaleSites-Internal#1625, out of #1614's scope.
