import image from './image/responsive-image.twig';
import figure from './image/figure.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const images = () => image(imageData);

export const figures = () => figure(figureData);
