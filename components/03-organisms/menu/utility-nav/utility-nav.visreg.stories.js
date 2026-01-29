import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

import { siteHeaderThemes } from '../../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
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

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all utility nav configurations for visual regression testing with Percy.
        These cover all site header theme combinations.
      </p>
    </div>

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
