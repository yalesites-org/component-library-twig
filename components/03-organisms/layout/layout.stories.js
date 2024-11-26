// Markup.
import twoColumnTwig from './two-column/_two-column--example.twig';
import layoutTwig from './layout/_layout--example.twig';

// Data files
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';

import '../../02-molecules/accordion/yds-accordion';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layouts',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    divider: {
      name: 'Divider',
      type: 'boolean',
    },
    layoutOption: {
      name: 'Layout',
      type: 'select',
      options: ['fifty-fifty', 'thirty'],
      control: { type: 'select' },
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
    layout: 'fifty-fifty',
    theme: 'one',
  },
};

export const TwoColumn = () => twoColumnTwig(textData);
export const layout = ({ divider, theme, layoutOption }) =>
  layoutTwig({
    ...textData,
    ...accordionData,
    layout__divider: divider ? 'true' : 'false',
    component__theme: theme,
    component__layout: layoutOption,
  });
