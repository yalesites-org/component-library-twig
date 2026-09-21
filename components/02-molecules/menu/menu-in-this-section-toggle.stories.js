// Markup.
import sectionToggleTwig from './menu-in-this-section-toggle/yds-menu-in-this-section-toggle.twig';

import { componentThemes } from '../../_storybook/theme-constants';

/**
 * Storybook Definition.
 *
 * The "In This Section" button — the control that opens the section navigation
 * on a narrow viewport. It ships inside `yds-site-in-this-section.twig` and,
 * until this story, appeared in no story of its own, so none of its colour
 * pairings had ever been measured (yalesites-org/YaleSites-Internal#1757, from
 * the control parity audit in `docs/storybook-drupal-control-parity.md`).
 *
 * It is rendered here inside `.in-this-section[data-component-theme]` rather
 * than on its own, and that is the whole point of the story. The icon and
 * label are painted with `var(--color-link-base)`, which is defined ONLY
 * inside that themed wrapper — a bare `.secondary-menu-toggle` resolves it to
 * whatever the page happens to carry and would measure clean while being
 * wrong.
 *
 * **This component is mobile-only.** `.in-this-section .secondary-menu-toggle`
 * is `display: none` above the mobile breakpoint, and the rules that give it a
 * background live inside that same media query, so the story sets a mobile
 * viewport. At a wider viewport it correctly renders nothing.
 *
 * Unlike `Molecules/Menu Toggle`, this one IS global-theme dependent: component
 * themes one, two and three map `--color-link-base` to `--color-slot-one`,
 * which the global theme repoints. Use the global theme toolbar to walk the
 * palettes. Themes four and five set no `--color-link-base` of their own, so
 * they inherit — that inheritance is exactly what this story makes visible.
 *
 * Deliberately carries no `tags: ['!dev']`: that would take the entry out of
 * the sidebar, which is only safe when an `*.mdx` supplies one in its place.
 * This component has no MDX page, so it follows `Molecules/Modal`,
 * `Organisms/Galleries` and `Templates/Two Column (70/30)` and stays untagged.
 */
export default {
  title: 'Molecules/In This Section Toggle',
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
};

/**
 * One themed section wrapper carrying the toggle in a single state.
 *
 * `aria-expanded` is not decoration here — it is the whole open state. The
 * icon's 180deg rotation, the gray-100 background and the `::after` divider
 * that is only drawn while closed all key off it, which is why the label is
 * swapped alongside it exactly as `yds-menu-in-this-section-toggle.js` does at
 * runtime.
 */
const sectionWrapper = (theme, open) => `
  <div
    class="in-this-section"
    data-component-theme="${theme}"
    data-secondary-menu-state="${open ? 'open' : 'closed'}"
  >
    ${sectionToggleTwig({
      secondary_menu_toggle__aria_expanded: open ? 'true' : 'false',
      secondary_menu_toggle__text: open ? 'Close' : 'In This Section',
    })}
  </div>
`;

export const InThisSectionToggle = () =>
  componentThemes
    .map(
      (theme) => `
        <div class="sb-section__group">
          <p class="sb-section__subheading">Component theme ${theme} — closed</p>
          ${sectionWrapper(theme, false)}
          <p class="sb-section__subheading">Component theme ${theme} — open</p>
          ${sectionWrapper(theme, true)}
        </div>
      `,
    )
    .join('');

InThisSectionToggle.storyName = 'In This Section Toggle';
