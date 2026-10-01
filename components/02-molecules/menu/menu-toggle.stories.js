// Markup.
import menuToggleTwig from './menu-toggle/yds-menu-toggle.twig';

import { siteHeaderThemes } from '../../_storybook/theme-constants';

/**
 * Storybook Definition.
 *
 * The mobile menu button — the primary navigation control for every visitor on
 * a narrow viewport. It ships inside `yds-site-header.twig` and, until this
 * story, appeared in no story of its own, so none of its colour pairings had
 * ever been measured (yalesites-org/YaleSites-Internal#1757, from the control
 * parity audit in `docs/storybook-drupal-control-parity.md`).
 *
 * It is rendered here inside `.site-header[data-header-theme]` rather than on
 * its own, and that is the whole point of the story. The bars are painted with
 * `var(--color-text)`, which is defined ONLY inside that themed wrapper — a
 * bare `.menu-toggle` resolves it to whatever the page happens to carry and
 * would measure clean while being wrong.
 *
 * On a real page the button sits one level deeper, in `.site-header__mobile-
 * header`, which is `display: none` above the mobile breakpoint. That wrapper
 * paints itself with `var(--color-background)`, which the theme block maps to
 * the same `--color-site-header-background` used here, so the pairing shown is
 * the pairing that ships; skipping it only keeps the story visible at any
 * width.
 *
 * Header **accent** is deliberately not varied: `data-header-accent` only
 * remaps `--color-site-header-border-color`, which this component never reads.
 * Global theme is not varied either — unlike most components, the three header
 * themes map text and background to fixed primitives rather than to palette
 * slots, so the toggle's contrast is the same under every global theme. Those
 * two facts are why three rows cover it completely.
 *
 * Deliberately carries no `tags: ['!dev']`: that would take the entry out of
 * the sidebar, which is only safe when an `*.mdx` supplies one in its place.
 * This component has no MDX page, so it follows `Molecules/Modal`,
 * `Organisms/Galleries` and `Templates/Two Column (70/30)` and stays untagged.
 */
export default {
  title: 'Molecules/Menu Toggle',
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * One themed header strip carrying the toggle in a single state.
 *
 * `data-main-menu-state` is what drives the appearance — the bars fold into an
 * X under `[data-main-menu-state='open']` — while `aria-expanded` is the
 * button's own accessible state. They are set together so the two never
 * disagree, which is also how `yds-menu-toggle.js` maintains them at runtime.
 */
const headerStrip = (theme, open) => `
  <div
    class="site-header"
    data-header-theme="${theme}"
    data-main-menu-state="${open ? 'open' : 'closed'}"
  >
    ${menuToggleTwig({
      main_menu_toggle__aria_expanded: open ? 'true' : 'false',
    })}
  </div>
`;

export const MenuToggle = () =>
  siteHeaderThemes
    .map(
      (theme) => `
        <div class="sb-section__group">
          <p class="sb-section__subheading">Header theme ${theme} — closed</p>
          ${headerStrip(theme, false)}
          <p class="sb-section__subheading">Header theme ${theme} — open</p>
          ${headerStrip(theme, true)}
        </div>
      `,
    )
    .join('');

MenuToggle.storyName = 'Menu Toggle';
