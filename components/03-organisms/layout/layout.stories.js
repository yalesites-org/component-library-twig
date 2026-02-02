// Markup.
import twoColumnTwig from './two-column/_two-column--example.twig';
import layoutTwig from './layout/_layout--example.twig';

// Data files
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import '../../02-molecules/accordion/yds-accordion';

const defaultArgs = {
  divider: false,
  layoutOption: 'fifty-fifty',
  layoutPadding: 'default',
  theme: 'default',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layout',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      divider: {
        name: 'Divider',
        type: 'boolean',
      },
      layoutOption: {
        name: 'Layout',
        type: 'select',
        options: ['fifty-fifty', 'thirty-thirty-thirty', 'seventy-thirty'],
      },
      layoutPadding: {
        name: 'Padding',
        type: 'select',
        options: {
          'Default (current padding)': 'default',
          'No top padding': 'no-top',
          'No bottom padding': 'no-bottom',
          'No padding (top and bottom)': 'no-padding',
        },
      },
      theme: {
        name: 'Component Theme',
        type: 'select',
        options: ['default', 'one', 'two', 'three', 'four'],
      },
    },
    defaultArgs,
  ),
  args: defaultArgs,
};

export const TwoColumn = () => twoColumnTwig(textData);
export const layout = ({ divider, theme, layoutOption, layoutPadding }) =>
  layoutTwig({
    ...textData,
    ...accordionData,
    ...imageData.responsive_images['4x3'],
    layout__divider: divider ? 'true' : 'false',
    layout__padding: layoutPadding,
    component__theme: theme,
    component__layout: layoutOption,
  });
