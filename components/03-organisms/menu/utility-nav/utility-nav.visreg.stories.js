import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

import { siteHeaderThemes } from '../../../_storybook/theme-constants';
import { createThemeVariations } from '../../../_storybook/playground-utils';

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
  return `
    <div class="utility-nav--examples">
      ${createThemeVariations(
        (theme) =>
          utilityNavExampleTwig({
            site_header__theme: theme,
          }),
        siteHeaderThemes,
        'All Site Header Theme Variations',
        'Below are all site header theme variations for visual regression testing.',
        'Site Header Theme',
      )}
    </div>
  `;
};
