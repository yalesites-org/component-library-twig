import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

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
  title: 'Organisms/Menu/Utility Nav/Visreg',
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
  },
  args: {
    siteHeaderTheme: 'one',
  },
};

export const Visreg = ({ siteHeaderTheme }) => {
  return `
    ${createPlaygroundIntro(
      'Use the controls to test different site header theme variations.',
    )}

    <div class="utility-nav--examples">
      ${utilityNavExampleTwig({
        site_header__theme: siteHeaderTheme,
      })}
    </div>

    ${createVrtIntro()}

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
