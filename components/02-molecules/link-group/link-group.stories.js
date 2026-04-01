import linkGroupTwig from './yds-link-group.twig';
import componentProps from './link-group-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import linkGroupData from './link-group.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link group',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: linkGroupData.link_group__heading_one,
  },
};

export const linkGroup = ({ heading }) =>
  linkGroupTwig({
    ...linkGroupData,
    link_group__heading_one: heading,
  });
