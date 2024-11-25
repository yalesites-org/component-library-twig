// Markup.
import twoColumnTwig from './two-column/_two-column--example.twig';
import fiftyFiftyTwig from './fifty-fifty/_fifty-fifty--example.twig';

// Data files
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';

import '../../02-molecules/accordion/yds-accordion';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layout/Two Column',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    divider: {
      name: 'Divider',
      type: 'boolean',
    },
    theme: {
      name: 'Component Theme',
      type: 'select',
      options: ['one', 'two', 'three', 'four'],
      control: { type: 'select' },
    },
  },
  args: {
    divider: false,
  },
};

export const TwoColumn = () => twoColumnTwig(textData);
export const FiftyFifty = ({ divider, theme }) =>
  fiftyFiftyTwig({
    ...textData,
    ...accordionData,
    layout_divider: divider,
    component_theme: theme,
  });
