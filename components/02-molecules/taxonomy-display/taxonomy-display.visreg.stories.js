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
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Taxonomy Display Theme: ${componentTheme}</h3>
                    ${renderTaxonomyDisplay(componentTheme)}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Taxonomy Display Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
