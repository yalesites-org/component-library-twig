import primaryNavTwig from './yds-primary-nav.twig';
import primaryNavData from './primary-nav.yml';

import './yds-primary-nav';

import { siteHeaderThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteHeaderTheme: {
      name: 'Site Header Theme',
      description: 'Theme for site header',
      options: siteHeaderThemes,
      type: 'select',
    },
    menuVariation: {
      name: 'Menu Variation',
      options: ['basic', 'mega', 'focus'],
      type: 'select',
    },
  },
  args: {
    siteHeaderTheme: 'one',
    menuVariation: 'basic',
  },
};

export const Visreg = ({ siteHeaderTheme, menuVariation }) => {
  const variations = ['basic', 'mega', 'focus'];

  // Render function for primary nav with theme/variation combinations
  const renderPrimaryNav = (theme) =>
    variations
      .map(
        (variation) => `
      <h3>Menu Variation: ${variation}</h3>
      <div style="position: relative; padding-top: var(--size-spacing-site-gutter); margin-bottom: 2rem;" data-site-header-nav-position='left' data-component-width="max" data-header-theme="${theme}">
        ${primaryNavTwig({ ...primaryNavData, menu__variation: variation })}
      </div>
    `,
      )
      .join('');

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different site header theme and menu variation combinations.',
    )}

    <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="${siteHeaderTheme}">
      ${primaryNavTwig({ ...primaryNavData, menu__variation: menuVariation })}
    </div>

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all primary nav configurations for visual regression testing with Percy.
        These cover all site header theme and menu variation combinations.
      </p>
    </div>

    ${createThemeVariations(
      renderPrimaryNav,
      siteHeaderThemes,
      'All Site Header Theme & Menu Variation Combinations',
      'Below are all combinations of site header themes and menu variations for visual regression testing.',
      'Site Header Theme',
    )}
  `;
};
