import primaryNavTwig from './yds-primary-nav.twig';
import primaryNavData from './primary-nav.yml';

import './yds-primary-nav';

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
  title: 'Organisms/Menu/Primary Nav/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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

  return createThemeVariations(
    renderPrimaryNav,
    siteHeaderThemes,
    'All Header Theme Variations',
    'Below are all combinations of site header themes and menu variations for visual regression testing.',
    'Header Theme',
  );
};

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
