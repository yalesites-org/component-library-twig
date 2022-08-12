import quickLinksTwig from './quick-links.twig';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick-links',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: quickLinksData.quick__links__heading,
    },
  },
};

export const quickLinks = ({ heading }) =>
  quickLinksTwig({
    ...quickLinksData,
    ...imageData.responsive_images['16x9'],
    quick__links__heading: heading,
  });
