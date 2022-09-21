import galleryTwig from './grid/yds-grid.twig';

import galleryData from './grid/grid.yml';
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Galleries',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    galleryHeading: {
      name: 'Gallery heading',
      type: 'string',
      defaultValue: galleryData.gallery__heading,
    },
    items: {
      name: 'Number of images',
      type: 'number',
      defaultValue: 3,
    },
  },
};

export const ImageGrid = ({ items, galleryHeading }) => {
  const Items = [];
  for (let i = 0; i < items; i += 1) {
    Items.push(i);
  }

  return galleryTwig({
    gallery__heading: galleryHeading,
    gallery__items: Items,
    ...imageData.responsive_images['3x2'],
  });
};
