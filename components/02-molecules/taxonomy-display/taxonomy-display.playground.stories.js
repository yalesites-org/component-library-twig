import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

import taxonomyDisplayData from './taxonomy-display.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

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
      type: 'select',
      options: colorPairingsData,
    },
    componentTheme: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    showTaxonomy: {
      name: 'Show Taxonomy',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'one',
    componentTheme: 'one',
    showTaxonomy: true,
  },
};

export const Playground = ({ sectionTheme, componentTheme, showTaxonomy }) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test taxonomy display with different themes.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
