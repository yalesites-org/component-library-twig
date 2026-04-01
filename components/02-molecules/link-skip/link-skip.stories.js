import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Link skip',
  tags: ['!dev'],
};

export const LinkSkip = () =>
  linkSkipTwig({
    ...linkSkipData,
  });
