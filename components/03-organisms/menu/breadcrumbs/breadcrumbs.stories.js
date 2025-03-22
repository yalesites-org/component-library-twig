// Markup.
import breadcrumbsTwig from './yds-breadcrumbs.twig';

// Data.
import breadcrumbsData from './breadcrumbs.yml';

// JavaScript.
import './yds-breadcrumbs';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs',
  argTypes: {
    withDeep: {
      name: 'With deep',
      type: 'boolean',
    },
    deepLevel: {
      name: 'Deep Level',
      type: 'number',
      if: {
        arg: 'withDeep',
        truthy: true,
      },
    },
  },
  args: {
    withDeep: false,
    deepLevel: 2,
  },
};

export const Breadcrumbs = ({ deepLevel }) =>
  breadcrumbsTwig({ ...breadcrumbsData, breadcrumbs__deep: deepLevel });
