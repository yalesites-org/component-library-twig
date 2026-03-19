import secondaryNavTwig from './yds-secondary-nav.twig';
import secondaryNavData from './secondary-nav.yml';

import './yds-secondary-nav';

import { componentThemes } from '../../../_storybook/theme-constants';
import { createThemeVariations } from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Content Collection/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  // Render function for secondary nav variations
  const renderSecondaryNav = (theme) => `
    <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${theme}">
      ${secondaryNavTwig({ ...secondaryNavData, menu_theme: theme })}
    </div>
  `;

  return `
    ${createThemeVariations(
      renderSecondaryNav,
      componentThemes,
      'All Component Theme Variations',
      'Below are all component theme variations for visual regression testing.',
      'Component Theme',
    )}
  `;
};
