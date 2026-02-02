import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const linkGridArgs = {
  themeColor: 'one',
  lineTreatment: 'default',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid',
  tags: ['!dev'],
  argTypes: addTableDefaults(
    {
      themeColor: {
        name: 'Component Theme (dial)',
        type: 'select',
        options: colorPairingsData,
      },
      lineTreatment: {
        name: 'Line Treatment',
        type: 'select',
        options: ['default', 'all_strong_lines', 'all_light_lines', 'no_lines'],
      },
    },
    linkGridArgs,
  ),
  args: linkGridArgs,
};

export const linkGrid = ({ themeColor, lineTreatment }) =>
  linkGridTwig({
    link_grid__theme: themeColor,
    link_grid__line_treatment: lineTreatment,
    ...linkGridData,
  });

linkGrid.args = linkGridArgs;
