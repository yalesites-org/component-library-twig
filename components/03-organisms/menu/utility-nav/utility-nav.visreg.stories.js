import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

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
  title: 'Organisms/Menu/Utility Nav/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  return createGlobalThemeVariations(
    () => `
      <div class="utility-nav--examples">
        ${createThemeVariations(
          (theme) =>
            utilityNavExampleTwig({
              site_header__theme: theme,
            }),
          siteHeaderThemes,
          'All Header Theme Variations',
          'Below are all site header theme variations for visual regression testing.',
          'Header Theme',
        )}
      </div>
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
