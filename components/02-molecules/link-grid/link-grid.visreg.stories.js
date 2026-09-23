import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Link grid/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const lineTreatments = [
    'default',
    'all_strong_lines',
    'all_light_lines',
    'no_lines',
  ];

  const renderLinkGrid = (dialTheme, lineTreatment = 'default') =>
    linkGridTwig({
      link_grid__theme: dialTheme,
      link_grid__line_treatment: lineTreatment,
      ...linkGridData,
    });

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderLinkGrid('one'), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderLinkGrid(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Link Grid Theme Variations',
        '',
        'Link Grid Theme',
      )}
      ${createVariations(
        (lineTreatment) =>
          createSectionWrapper('one', renderLinkGrid('one', lineTreatment), {
            width: 'site',
            primaryWidth: '100%',
          }),
        lineTreatments,
        'All Line Treatment Variations',
        '',
        'Line Treatment',
      )}
    `;
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
