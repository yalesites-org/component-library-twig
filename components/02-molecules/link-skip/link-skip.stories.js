import linkSkipTwig from './yds-link-skip.twig';

import linkSkipData from './link-skip.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Link Skip',
  tags: ['!dev'],
};

export const LinkSkip = () =>
  linkSkipTwig({
    ...linkSkipData,
  });
