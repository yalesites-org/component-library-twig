// Markup.
import secondaryNavTwig from './yds-secondary-nav.twig';

// Data.
import secondaryNavData from './secondary-nav.yml';
import componentProps from './secondary-nav-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

// JavaScript
import './yds-secondary-nav';

// Theme options come from secondary-nav-props.yml, not the component-themes
// token map. Drupal only renders this nav inside In This Section, whose
// `book_navigation` theme setting offers one to five, while the token map
// also has `six` (YaleSites-Internal#1680).
const argTypes = toArgTypes(componentProps);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Content Collection',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: toArgs(componentProps),
};

export const secondaryNav = ({ themeColor }) => `
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${themeColor}">
    ${secondaryNavTwig({ ...secondaryNavData, menu_theme: themeColor })}
  </div>
`;
