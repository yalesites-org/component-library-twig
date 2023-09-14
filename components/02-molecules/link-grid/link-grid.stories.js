import linkGridTwig from './yds-link-grid.twig';

import linkGridData from './link-grid.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link grid',
};

export const linkGrid = () =>
  linkGridTwig({
    ...linkGridData,
  });
