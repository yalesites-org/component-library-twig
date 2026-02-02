import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Twig templates
import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

// Data files
import taxonomyDisplayData from './taxonomy-display.yml';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

const colorPairingsData = Object.keys(tokens['component-themes']);

const defaultArgs = {
  componentTheme: 'default',
  showTaxonomy: true,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Taxonomy Display',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      componentTheme: {
        name: 'Component Theme (dial)',
        type: 'select',
        options: ['default', ...colorPairingsData],
      },
      showTaxonomy: {
        name: 'Show Taxonomy',
        type: 'boolean',
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
};

export const TaxonomyDisplay = ({ componentTheme, showTaxonomy }) =>
  taxonomyDisplayTwig({
    taxonomy_display__theme: componentTheme,
    taxonomy_display__items: showTaxonomy
      ? taxonomyDisplayData.taxonomy_display__items
      : taxonomyDisplayData.taxonomy_display__empty_items,
  });
