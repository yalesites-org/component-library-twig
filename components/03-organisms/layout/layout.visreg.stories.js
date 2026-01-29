import layoutTwig from './layout/_layout--example.twig';
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import '../../02-molecules/accordion/yds-accordion';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createVariations,
  createVrtDivider,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layout/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    componentTheme: {
      name: 'Layout Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
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
    divider: {
      name: 'Divider',
      type: 'boolean',
    },
  },
  args: {
    componentTheme: 'one',
    layoutOption: 'fifty-fifty',
    layoutPadding: 'default',
    divider: false,
  },
};

export const Visreg = ({
  componentTheme,
  layoutOption,
  layoutPadding,
  divider,
}) => {
  const layoutOptions = [
    'fifty-fifty',
    'thirty-thirty-thirty',
    'seventy-thirty',
  ];

  const paddingOptions = ['default', 'no-top', 'no-bottom', 'no-padding'];

  // Render function for layout variations
  const renderLayouts = (layout) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: componentTheme,
      component__layout: layout,
    });

  // Render function for theme variations
  const renderThemes = (theme) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: theme,
      component__layout: layoutOption,
    });

  // Render function for padding variations
  const renderPadding = (padding) =>
    layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: padding,
      component__theme: componentTheme,
      component__layout: layoutOption,
    });

  return `
    ${layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: componentTheme,
      component__layout: layoutOption,
    })}

    ${createVrtDivider()}

    ${createVariations(
      renderLayouts,
      layoutOptions,
      'All Layout Variations',
      'Layout Configuration',
    )}

    ${createVariations(
      renderThemes,
      componentThemes,
      'All Theme Variations',
      'Component Theme',
    )}

    ${createVariations(
      renderPadding,
      paddingOptions,
      'All Padding Variations',
      'Padding Option',
    )}

    <div class="wrap-for-screenshot">
      <h3>With Divider Enabled</h3>
      ${layoutTwig({
        ...textData,
        ...accordionData,
        ...imageData.responsive_images['4x3'],
        layout__divider: 'true',
        layout__padding: 'default',
        component__theme: componentTheme,
        component__layout: layoutOption,
      })}
    </div>
  `;
};
