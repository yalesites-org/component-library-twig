import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import componentProps from './link-grid-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const argTypes = toArgTypes(componentProps);
argTypes.themeColor = {
  ...argTypes.themeColor,
  options: colorPairingsData,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid',
  tags: ['!dev'],
  argTypes,
  args: toArgs(componentProps),
};

export const linkGrid = ({ themeColor, lineTreatment }) =>
  linkGridTwig({
    link_grid__theme: themeColor,
    link_grid__line_treatment: lineTreatment,
    ...linkGridData,
  });
