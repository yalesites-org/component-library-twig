import imageTwig from './image/yds-image.twig';
import iconsTwig from './icons/yds-icons.twig';
import faIconsTwig from './fa-icons/yds-fa-icons.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';
import faIconData from './fa-icons/fa-icons.yml';

import './image/cl-image.scss';
import './icons/cl-icons.scss';

import componentProps from './images-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

// Not eager: only the keys are read, so eagerly importing pulled every icon SVG
// into the preview bundle to derive a list of filenames.
const svgIconModules = import.meta.glob('../../../assets/icons/*.svg');
const icons = Object.keys(svgIconModules).map((path) =>
  path.split('/').pop().replace('.svg', ''),
);

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Images',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Interactive = ({ sectionTheme, aspectRatio }) => `
  <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>Responsive Image - ${aspectRatio}</h3>
        <div class="cl-image-examples">
          <div class="cl-image-example">
            ${imageTwig(imageData.responsive_images[aspectRatio])}
          </div>
        </div>

        <h3>Figure with Caption</h3>
        ${imageTwig(figureData)}

        <h3>Sample Icons</h3>
        ${iconsTwig({ icons: icons.slice(0, 10) })}

        <h3>Font Awesome Icons</h3>
        ${faIconsTwig(faIconData)}
      </div>
    </div>
  </div>
`;

export const Images = () => `
  <div class="cl-image-examples">
    <div class="cl-image-example">
    ${imageTwig(imageData.responsive_images['16x9'])}
    </div>
    <div class="cl-image-example">
    ${imageTwig(imageData.responsive_images['3x2'])}
    </div>
    <div class="cl-image-example">
    ${imageTwig(imageData.responsive_images['1x1'])}
    </div>
    <div class="cl-image-example">
    ${imageTwig(imageData.responsive_images['1x1.6'])}
    </div>
    <div class="cl-image-example">
      ${imageTwig(imageData.responsive_images['4x3'])}
    </div>
  </div>
`;

export const Figures = () => imageTwig(figureData);

export const Icons = () => iconsTwig({ icons });

export const FAIcons = () => faIconsTwig(faIconData);
