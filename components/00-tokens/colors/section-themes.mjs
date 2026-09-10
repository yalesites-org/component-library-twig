/**
 * The section-theme slot mapping, with no Node dependencies
 * (YaleSites-Internal#1632).
 *
 * Split out of `section-background-contrast.mjs` so the Storybook bundle can
 * import it. That module reads the token package through `createRequire` and
 * prints a report from `process.argv`, both of which webpack refuses to bundle
 * ("Reading from node:module is not handled by plugins"). The data and the slot
 * resolution are the parts a browser needs, and neither of them needs Node.
 *
 * `section-background-contrast.mjs` re-exports both, so its own API -- and the
 * drift test that reads `_yds-layout.scss` and compares against SECTION_THEMES
 * -- is unchanged.
 */

/**
 * How `_yds-layout.scss` maps each section theme onto global-theme slots.
 *
 * Transcribed from `components/03-organisms/layout/layout/_yds-layout.scss`
 * (the `&[data-section-theme='N']` blocks). Kept as data here rather than
 * parsed out of the SCSS, because a regex over Sass would be the fragile part
 * of this script -- but that means the two can drift, so
 * `section-background-contrast.test.mjs` reads the SCSS and asserts they agree.
 *
 * Note `background`/`content` are the properties actually painted:
 * `--color-layout-theme` becomes `background-color` and `--color-layout-content`
 * becomes `color` on `.yds-layout`, so every block inside inherits them unless
 * it overrides them.
 *
 * Two separate border-ish roles are modelled, because they are different
 * properties with different consumers:
 *
 * - `border` is `--color-layout-border`, UNCHANGED by #1613. It is not only a
 *   border colour -- the CTA atom draws its filled-button background from it --
 *   so it was deliberately left alone. It still fails 3:1 on two pairings; see
 *   the report.
 * - `divider` is `--color-divider`, which #1613 re-points to the section's
 *   content colour. It drives the always-on 70/30 column separator and the
 *   divider atom.
 */
export const SECTION_THEMES = {
  one: {
    border: 'slot-four',
    background: 'slot-one',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  two: {
    border: 'slot-seven',
    background: 'slot-four',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
  three: {
    border: 'slot-four',
    background: 'slot-five',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  four: {
    border: 'slot-four',
    background: 'slot-two',
    content: 'slot-eight',
    heading: 'slot-eight',
    link: 'slot-eight',
  },
  five: {
    border: 'slot-seven',
    background: 'slot-nine',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
  six: {
    border: 'slot-seven',
    background: 'slot-three',
    content: 'slot-seven',
    heading: 'slot-seven',
    link: 'slot-seven',
  },
};

/**
 * Resolve one global theme's slots, applying the theme-four slot swap.
 *
 * `_yds-layout.scss` swaps slot-two and slot-five for global theme four only
 * ("Switch colors slot in order to have the selected background colors per
 * component theme"). Ignoring it would report theme four's section themes
 * three and four against the wrong colors, which is precisely the pair #1614
 * found straddling the 3:1 threshold -- so the swap has to be modelled.
 *
 * @param {string} themeName Global theme key, e.g. `four`.
 * @param {Object} globalThemes The token package's `global-themes` map. Passed
 *   in rather than imported so this module stays free of Node built-ins; the
 *   wrapper in `section-background-contrast.mjs` supplies it for Node callers.
 */
export function resolveGlobalTheme(themeName, globalThemes) {
  const { colors } = globalThemes[themeName];
  const slots = { ...colors };

  if (themeName === 'four') {
    slots['slot-two'] = colors['slot-five'];
    slots['slot-five'] = colors['slot-two'];
  }

  return slots;
}
