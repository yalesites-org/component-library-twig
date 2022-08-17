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
    description: {
      name: 'Description',
      type: 'string',
      defaultValue: quickLinksData.quick__links__description,
    },
    linkContent: {
      name: 'Link Content',
      type: 'string',
      defaultValue: quickLinksData.quick__links__link__content,
    },
    linkStyle: {
      name: 'Link Style',
      type: 'select',
      options: ['cta', 'text-link'],
      defaultValue: 'cta',
    },
  },
};

export const quickLinks = ({ heading, description, linkContent, linkStyle }) =>
  quickLinksTwig({
    ...quickLinksData,
    ...imageData.responsive_images['16x9'],
    quick__links__heading: heading,
    quick__links__description: description,
    quick__links__link__content: linkContent,
    quick__links__style: linkStyle,
  });
