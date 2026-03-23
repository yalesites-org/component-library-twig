// Markup.
import layoutTwig from './layout/_layout--example.twig';

// Data files
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';

// Image atom component - generic images for demo
import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './layout-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import '../../02-molecules/accordion/yds-accordion';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layout',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

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
