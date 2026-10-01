import imageTwig from './image/yds-image.twig';
import iconsTwig from './icons/yds-icons.twig';
import faIconsTwig from './fa-icons/yds-fa-icons.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';
import faIconData from './fa-icons/fa-icons.yml';

import './image/cl-image.scss';
import './icons/cl-icons.scss';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

// Not eager: only the keys are read, so eagerly importing pulled every icon SVG
// into the preview bundle to derive a list of filenames.
const svgIconModules = import.meta.glob('../../../assets/icons/*.svg');
const icons = Object.keys(svgIconModules).map((path) =>
  path.split('/').pop().replace('.svg', ''),
);

export default {
  tags: ['visreg'],
  title: 'Atoms/Images/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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

  return createThemeVariations(
    renderImages,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
