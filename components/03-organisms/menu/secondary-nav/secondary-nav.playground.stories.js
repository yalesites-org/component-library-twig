import secondaryNavTwig from './yds-secondary-nav.twig';
import secondaryNavData from './secondary-nav.yml';

import './yds-secondary-nav';

import { componentThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Secondary Nav/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    themeColor: {
      name: 'Secondary Nav Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      type: 'select',
    },
  },
  args: {
    themeColor: 'one',
  },
};

export const Playground = ({ themeColor }) => {
  // Render function for secondary nav variations
  const renderSecondaryNav = (theme) => `
    <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${theme}">
      ${secondaryNavTwig({ ...secondaryNavData, menu_theme: theme })}
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different component theme variations.',
    )}

    ${renderSecondaryNav(themeColor)}

    ${createThemeVariations(
      renderSecondaryNav,
      componentThemes,
      'All Component Theme Variations',
      'Below are all component theme variations for visual regression testing.',
      'Component Theme',
    )}
  `;
};
