import primaryNavTwig from './yds-primary-nav.twig';
import primaryNavData from './primary-nav.yml';

import './yds-primary-nav';

import { siteHeaderThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
  createVrtIntro,
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

    ${createVrtIntro()}

    ${createThemeVariations(
      renderPrimaryNav,
      siteHeaderThemes,
      'All Site Header Theme & Menu Variation Combinations',
      'Below are all combinations of site header themes and menu variations for visual regression testing.',
      'Site Header Theme',
    )}
  `;
};
