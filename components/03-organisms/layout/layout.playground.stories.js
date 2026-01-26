import layoutTwig from './layout/_layout--example.twig';
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import '../../02-molecules/accordion/yds-accordion';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Layouts/Playground',
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

export const Playground = ({
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

  // Render function for layout variations
  const renderLayouts = (theme) =>
    layoutOptions
      .map(
        (layout) => `
      <h3>Layout: ${layout}</h3>
      ${layoutTwig({
        ...textData,
        ...accordionData,
        ...imageData.responsive_images['4x3'],
        layout__divider: 'false',
        layout__padding: 'default',
        component__theme: theme,
        component__layout: layout,
      })}
    `,
      )
      .join('');

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different layout options, padding, and themes.',
    )}

    ${layoutTwig({
      ...textData,
      ...accordionData,
      ...imageData.responsive_images['4x3'],
      layout__divider: divider ? 'true' : 'false',
      layout__padding: layoutPadding,
      component__theme: componentTheme,
      component__layout: layoutOption,
    })}

    ${createThemeVariations(
      renderLayouts,
      componentThemes,
      'All Theme & Layout Variations',
      'Below are all combinations of component themes and layout options for visual regression testing.',
      'Component Theme',
    )}
  `;
};
