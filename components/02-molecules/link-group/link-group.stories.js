import linkGroupTwig from './yds-link-group.twig';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import linkGroupData from './link-group.yml';

const linkGroupArgs = {
  heading: linkGroupData.link_group__heading,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link group',
  tags: ['!dev'],
  argTypes: addTableDefaults(
    {
      heading: {
        name: 'Heading',
        type: 'string',
      },
    },
    linkGroupArgs,
  ),
  args: linkGroupArgs,
};

export const linkGroup = ({ heading }) =>
  linkGroupTwig({
    ...linkGroupData,
    link_group__heading: heading,
  });

linkGroup.args = linkGroupArgs;
