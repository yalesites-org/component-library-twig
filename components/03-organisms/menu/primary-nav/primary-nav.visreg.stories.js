import primaryNavTwig from './yds-primary-nav.twig';
import primaryNavData from './primary-nav.yml';

import './yds-primary-nav';

import {
  siteHeaderThemes,
  globalThemes,
} from '../../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Primary Nav/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
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

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderPrimaryNav,
        siteHeaderThemes,
        'All Header Theme Variations',
        'Below are all combinations of site header themes and menu variations for visual regression testing.',
        'Header Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
