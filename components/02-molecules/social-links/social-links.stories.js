import socialLinksTwig from './social-links.twig';

import socialLinksData from './social-links.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Social Links',
};

export const SocialLinks = () => socialLinksTwig(socialLinksData);
