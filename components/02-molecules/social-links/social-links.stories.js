import socialLinksTwig from './yds-social-links.twig';

import socialLinksData from './social-links.yml';
import componentProps from './social-links-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Social Links',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
  },
};

export const SocialLinks = () => socialLinksTwig(socialLinksData);
