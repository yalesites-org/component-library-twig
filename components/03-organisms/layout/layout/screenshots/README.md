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

| Pattern                                                                                | Count | What it shows                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1614-{before,after}-global-<n>-<label>-callout-heading-dial-<d>-section-<s>.png`      | 8     | The Wrapped Callout heading, which read a fixed slot-seven declared on `.wrapped-callout` itself and so could never be reached by the section. Dark-on-dark before, section foreground after.                                                                                                                                   |
| `1614-{before,after}-global-<n>-<label>-link-grid-heading-dial-<d>-section-<s>.png`    | 8     | The Link Grid block heading on dials `two` and `six`, the two the white-heading rule does not cover.                                                                                                                                                                                                                            |
| `1614-{before,after}-global-<n>-<label>-link-grid-dial-one-section-default.png`        | 4     | The UNTHEMED section, added by component-library-twig#714. Two defects in one image: the block heading is absent from the "before" entirely (the link grid's light-on-dark dial carve-out resolved white on the white page, 1.00:1), and every link carries a heavy descender halo in the dial's colour rather than the page's. |
| `1614-{before,after}-global-<n>-<label>-link-grid-link-hover-dial-one-section-six.png` | 4     | Link Grid links with `:hover` forced, on section six. Mid-blue and near-illegible before (1.82:1), near-black after (5.77:1+).                                                                                                                                                                                                  |
| `1614-{before,after}-global-<n>-<label>-callout-link-hover-dial-one-section-one.png`   | 4     | The Wrapped Callout's callout-half link with `:hover` forced, on section one. Dim mid-blue on dark navy before (1.24:1), white after (7.10:1+). This is the link that matched none of the four link selectors the section's `@each` loop covers, so it failed on all six section backgrounds.                                   |

Element captures, not full pages: the #1614 fixtures hold 42-49 sections each and a
full-page image of one is unreadable at any size a ticket comment will show.

Two global themes only — one (Old Blues) and four (Onha, where the slot-two/slot-five swap
applies). These are illustrations; the exhaustive evidence is all 7595 measured cells,
summarised in `components/00-tokens/colors/functional-element-contrast.txt`.

The `section-default` pair is byte-identical between global theme one and global theme four,
in both states, and that is correct rather than stale CSS: an unthemed section paints no
background, so the surface is the page white in every palette, and neither the link grid's
`--color-heading` nor a link's resting colour is global-theme-scoped there. Verified with
`cmp` rather than assumed.

The three `hover` captures force `:hover` through CDP (`CSS.forcePseudoState`) on the links
inside the captured section only, and emulate `prefers-reduced-motion: reduce`. Both are
load-bearing: a real pointer can only hover one link at a time, and the link atom transitions
`color` over 0.15s inside `@media (prefers-reduced-motion: no-preference)`, so an unsuppressed
screenshot photographs a colour part-way to its target. That race is not hypothetical — it
produced two different verdicts for identical CSS in the first run of the measurement sweep.

Regenerate with `node scripts/local/1614-capture.mjs <before|after> <output-dir>` in
yalesites-project. The four warnings above apply unchanged, with one deliberate difference for
the three pairs added by #714: their "before" is the **branch tip**, not the branch base,
because they evidence a round of review feedback on work already committed to this branch —
the state the reviewer tested is what "before" has to mean there. Warning 4's advice (take
"before" from the base) is still right for the original #1614 captures above.

Note the unstyled blue link visible in the callout BODY copy in **both** states of every
callout capture. That is deliberate: it is yalesites-org/YaleSites-Internal#1625, out of
#1614's scope, and it is the only failure left in the generated table.
