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
};

export const ImageGrid = () => {
  return galleryTwig({
    ...galleryData,
    ...imageData.responsive_images['3x2'],
  });
};
