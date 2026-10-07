import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

import taxonomyDisplayData from './taxonomy-display.yml';

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
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Taxonomy Display/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const showTaxonomy = true;

  const renderTaxonomyDisplay = (dialTheme) =>
    taxonomyDisplayTwig({
      taxonomy_display__theme: dialTheme,
      taxonomy_display__items: showTaxonomy
        ? taxonomyDisplayData.taxonomy_display__items
        : taxonomyDisplayData.taxonomy_display__empty_items,
    });

  return `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderTaxonomyDisplay('one'), {
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
          createSectionWrapper('one', renderTaxonomyDisplay(theme), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Taxonomy Display Theme Variations',
        '',
        'Taxonomy Display Theme',
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
