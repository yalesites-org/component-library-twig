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
  title: 'Organisms/Menu/Content Collection/Visreg',
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

export const Visreg = ({ themeColor }) => {
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

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all secondary nav theme configurations for visual regression testing with Percy.
        These cover all component theme variations.
      </p>
    </div>

    ${createThemeVariations(
      renderSecondaryNav,
      componentThemes,
      'All Component Theme Variations',
      'Below are all component theme variations for visual regression testing.',
      'Component Theme',
    )}
  `;
};
