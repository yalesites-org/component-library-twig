// Twig templates
import taxonomyDisplayTwig from './yds-taxonomy-display.twig';

// Data files
import taxonomyDisplayData from './taxonomy-display.yml';
import componentProps from './taxonomy-display-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Taxonomy Display',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const TaxonomyDisplay = ({ componentTheme, showTaxonomy }) =>
  taxonomyDisplayTwig({
    taxonomy_display__theme: componentTheme,
    taxonomy_display__items: showTaxonomy
      ? taxonomyDisplayData.taxonomy_display__items
      : taxonomyDisplayData.taxonomy_display__empty_items,
  });
