import image from './image/responsive-image.twig';
import figure from './image/figure.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const images = () => `
  <h2>16:9</h2>
  ${image(imageData.responsive_images['16x9'])}
  <h2>3:2</h2>
  ${image(imageData.responsive_images['3x2'])}
`;

export const figures = () => figure(figureData);
