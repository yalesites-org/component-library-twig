import quickLinksTwig from './yds-quick-links.twig';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import quickLinksData from './quick-links.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const quickLinksArgs = {
  heading: quickLinksData.quick_links__heading,
  description: quickLinksData.quick_links__description,
  image: true,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Quick-links',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: addTableDefaults(
    {
      heading: {
        name: 'Heading',
        type: 'string',
      },
      description: {
        name: 'Description',
        type: 'string',
      },
      image: {
        name: 'With image',
        type: 'boolean',
      },
    },
    quickLinksArgs,
  ),
  args: quickLinksArgs,
};

export const quickLinks = ({ heading, description, variation, image }) =>
  quickLinksTwig({
    ...quickLinksData,
    ...imageData.responsive_images['16x9'],
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__variation: variation,
    quick_links__image: image,
  });

quickLinks.args = quickLinksArgs;
