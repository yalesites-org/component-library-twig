import imageTwig from './image/yds-image.twig';
import iconsTwig from './icons/yds-icons.twig';
import faIconsTwig from './fa-icons/yds-fa-icons.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';
import faIconData from './fa-icons/fa-icons.yml';

import './image/cl-image.scss';
import './icons/cl-icons.scss';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

const svgIcons = require.context('../../../images/icons', true, /\.svg$/);
const icons = [];
svgIcons.keys().forEach((key) => {
  const icon = key.split('./')[1].split('.')[0];
  icons.push(icon);
});

export default {
  tags: ['visreg'],
  title: 'Atoms/Images/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for all image variations
  const renderImages = (theme) =>
    createSectionWrapper(
      theme,
      `
          <h4>All Aspect Ratios</h4>
          <div class="cl-image-examples">
            <div class="cl-image-example">
              <h5>16:9</h5>
              ${imageTwig(imageData.responsive_images['16x9'])}
            </div>
            <div class="cl-image-example">
              <h5>3:2</h5>
              ${imageTwig(imageData.responsive_images['3x2'])}
            </div>
            <div class="cl-image-example">
              <h5>1:1</h5>
              ${imageTwig(imageData.responsive_images['1x1'])}
            </div>
            <div class="cl-image-example">
              <h5>1:1.6</h5>
              ${imageTwig(imageData.responsive_images['1x1.6'])}
            </div>
            <div class="cl-image-example">
              <h5>4:3</h5>
              ${imageTwig(imageData.responsive_images['4x3'])}
            </div>
          </div>

          <h4>Figure with Caption</h4>
          ${imageTwig(figureData)}

          <h4>Sample Icons</h4>
          ${iconsTwig({ icons: icons.slice(0, 10) })}

          <h4>Font Awesome Icons</h4>
          ${faIconsTwig(faIconData)}
        `,
      { primaryWidth: '100%' },
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderImages,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
