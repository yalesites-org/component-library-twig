import image from './image/responsive-image.twig';
import figure from './image/figure.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';

import './image/cl-image.scss';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Images' };

export const images = () => `
  <h2>Aspect Ratios</h2>
  <p>These are the current aspect ratios that we use in components that require a programmatic crop.</p>
  <div class="cl-image-examples">
    <div class="cl-image-example">
    <h2>16:9</h2>
    ${image(imageData.responsive_images['16x9'])}
    </div>
    <div class="cl-image-example">
    <h2>3:2</h2>
    ${image(imageData.responsive_images['3x2'])}
    </div>
    <div class="cl-image-example">
    <h2>1:1</h2>
    ${image(imageData.responsive_images['1x1'])}
    </div>
    <div class="cl-image-example">
    <h2>1:1.6</h2>
    ${image(imageData.responsive_images['1x1.6'])}
    </div>
    <div class="cl-image-example">
      <h2>4:3</h2>
      ${image(imageData.responsive_images['4x3'])}
    </div>
  </div>
`;

export const figures = () => figure(figureData);
