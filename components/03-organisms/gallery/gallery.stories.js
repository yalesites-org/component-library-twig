import galleryTwig from './yds-gallery.twig';

import galleryData from './gallery.yml';
import imageData from '../../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Galleries',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ImageGallery = () => {
  return galleryTwig({
    ...galleryData,
    ...imageData.responsive_images['3x2'],
  });
};
