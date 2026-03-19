import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

import taxonomyDisplayData from './taxonomy-display.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

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
  const componentTheme = 'one';
  const showTaxonomy = true;

  // Render function for taxonomy display variations
  const renderTaxonomyDisplay = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${taxonomyDisplayTwig({
            taxonomy_display__theme: componentTheme,
            taxonomy_display__items: showTaxonomy
              ? taxonomyDisplayData.taxonomy_display__items
              : taxonomyDisplayData.taxonomy_display__empty_items,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      renderTaxonomyDisplay,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
