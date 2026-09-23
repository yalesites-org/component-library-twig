import utilityNavExampleTwig from './yds-utility-nav--example.twig';

import './utility-nav-dropdown-menu';

import {
  siteHeaderThemes,
  globalThemeLabels,
  globalThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import { createThemeVariations } from '../../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Organisms/Menu/Utility Nav/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => `
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
    `;

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
