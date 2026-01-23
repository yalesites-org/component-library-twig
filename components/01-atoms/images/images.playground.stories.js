import imageTwig from './image/yds-image.twig';
import iconsTwig from './icons/yds-icons.twig';
import faIconsTwig from './fa-icons/yds-fa-icons.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';
import faIconData from './fa-icons/fa-icons.yml';

import './image/cl-image.scss';
import './icons/cl-icons.scss';

const svgIcons = require.context('../../../images/icons', true, /\.svg$/);
const icons = [];
svgIcons.keys().forEach((key) => {
  const icon = key.split('./')[1].split('.')[0];
  icons.push(icon);
});

export default {
  title: 'Atoms/Images/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
    aspectRatio: {
      name: 'Aspect Ratio',
      type: 'select',
      options: ['16x9', '3x2', '1x1', '1x1.6', '4x3'],
    },
  },
  args: {
    sectionTheme: 'default',
    aspectRatio: '16x9',
  },
};

export const Playground = ({ sectionTheme, aspectRatio }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different aspect ratios and themes.</p>

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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary" style="width: 100%">
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
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
