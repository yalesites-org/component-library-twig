import quickLinksTwig from './yds-quick-links.twig';
import componentProps from './quick-links-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick-links',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: quickLinksData.quick_links__heading,
    description: quickLinksData.quick_links__description,
  },
};

export const quickLinks = ({ heading, description, image }) =>
  quickLinksTwig({
    ...quickLinksData,
    ...imageData.responsive_images['16x9'],
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
  });
