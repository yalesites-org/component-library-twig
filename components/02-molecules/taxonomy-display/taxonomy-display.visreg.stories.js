import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

import taxonomyDisplayData from './taxonomy-display.yml';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Taxonomy Display/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    componentTheme: {
      name: 'Taxonomy Display Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    showTaxonomy: {
      name: 'Show Taxonomy',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'default',
    componentTheme: 'one',
    showTaxonomy: true,
  },
};

export const Playground = ({ sectionTheme, componentTheme, showTaxonomy }) => {
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
    ${createPlaygroundIntro(
      'Use the controls to test taxonomy display with different themes.',
    )}

    ${renderTaxonomyDisplay(sectionTheme)}

    ${createThemeVariations(
      renderTaxonomyDisplay,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
