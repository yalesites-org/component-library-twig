import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid',
  argTypes: {
    themeColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    lineTreatment: {
      name: 'Line Treatment',
      type: 'select',
      options: ['default', 'all_strong_lines', 'all_light_lines', 'no_lines'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    themeColor: 'one',
    lineTreatment: 'default',
  },
};

export const linkGrid = ({ themeColor, lineTreatment }) =>
  linkGridTwig({
    link_grid__theme: themeColor,
    link_grid__line_treatment: lineTreatment,
    ...linkGridData,
  });
