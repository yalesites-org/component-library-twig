import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import layoutTwig from './layout/_layout--example.twig';
import textData from '../../02-molecules/text/text-field.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import imageData from '../../01-atoms/images/image/image.yml';

import '../../02-molecules/accordion/yds-accordion';

const colorPairingsData = Object.keys(tokens['component-themes']);

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
      name: 'Component Theme',
      type: 'select',
      options: colorPairingsData,
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
  const themes = colorPairingsData;
  const layoutOptions = [
    'fifty-fifty',
    'thirty-thirty-thirty',
    'seventy-thirty',
  ];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different layout options, padding, and themes.</p>

  ${layoutTwig({
    ...textData,
    ...accordionData,
    ...imageData.responsive_images['4x3'],
    layout__divider: divider ? 'true' : 'false',
    layout__padding: layoutPadding,
    component__theme: componentTheme,
    component__layout: layoutOption,
  })}

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Theme & Layout Variations</h2>
  <p>Below are all combinations of component themes and layout options for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 4rem; padding: 1rem; border: 2px solid #ccc;">
      <h3 style="margin: 0 0 1.5rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid #333;">Component Theme: ${theme}</h3>
      ${layoutOptions
        .map(
          (layout) => `
        <div style="margin-bottom: 2rem;">
          <h4 style="color: #222; background: #f5f5f5; padding: 0.5rem 1rem; margin-bottom: 1rem;">Layout: ${layout}</h4>
          ${layoutTwig({
            ...textData,
            ...accordionData,
            ...imageData.responsive_images['4x3'],
            layout__divider: 'false',
            layout__padding: 'default',
            component__theme: theme,
            component__layout: layout,
          })}
        </div>
      `,
        )
        .join('')}
    </div>
  `,
    )
    .join('')}
  `;
};
