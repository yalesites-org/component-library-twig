import wrappedImageTwig from './yds-wrapped-image.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import WrappedImageData from './wrapped-image.yml';

import { componentThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Image/Visreg',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: componentThemes,
    },
    caption: {
      name: 'Caption',
      type: 'string',
    },
    imageAlignment: {
      name: 'Image Alignment',
      type: 'select',
      options: ['left', 'right'],
    },
    imageStyle: {
      name: 'Image Style',
      type: 'select',
      options: ['floated', 'offset'],
    },
  },
  args: {
    sectionTheme: 'one',
    caption: 'This is the caption for the 16:9 image above.',
    imageAlignment: 'left',
    imageStyle: 'floated',
  },
};

export const Visreg = ({
  sectionTheme,
  caption,
  imageAlignment,
  imageStyle,
}) => {
  // Render function for wrapped image variations
  const renderWrappedImage = (theme) => `
    <div data-component-theme="${theme}">
      ${textFieldTwig({
        text_field__content: WrappedImageData.text_one,
        text_field__width: 'site',
        text_field__alignment: 'left',
      })}
      ${wrappedImageTwig({
        ...imageData.responsive_images['3x2'],
        wrapped_image__caption: caption,
        wrapped_image__alignment: imageAlignment,
        wrapped_image__style: imageStyle,
        wrapped_image__content: WrappedImageData.text_two,
      })}
    </div>
  `;

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different wrapped image alignments and styles.',
    )}

    ${renderWrappedImage(sectionTheme)}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all wrapped image configurations for visual regression testing with Percy.
      </p>
    </div>

    ${createThemeVariations(
      renderWrappedImage,
      componentThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
