import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

import taxonomyDisplayData from './taxonomy-display.yml';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
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

export const Visreg = () => {
  const showTaxonomy = true;

  const renderTaxonomyDisplay = (dialTheme) =>
    taxonomyDisplayTwig({
      taxonomy_display__theme: dialTheme,
      taxonomy_display__items: showTaxonomy
        ? taxonomyDisplayData.taxonomy_display__items
        : taxonomyDisplayData.taxonomy_display__empty_items,
    });

  return createGlobalThemeVariations(
    () => `
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
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
