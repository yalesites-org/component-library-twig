import componentProps from './link-grid-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

/**
 * Storybook Definition.
 *
 * The color options come from `link-grid-props.yml`, the stated source of
 * truth. They used to be overridden with the keys of the `component-themes`
 * token set, which stops at `five` and so hid the neutral `six` option this
 * component has offered in the CMS color dial all along.
 */
export default {
  title: 'Molecules/Link grid',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const linkGrid = ({ themeColor, lineTreatment }) =>
  linkGridTwig({
    link_grid__theme: themeColor,
    link_grid__line_treatment: lineTreatment,
    ...linkGridData,
  });
