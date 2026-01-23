import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import wrappedImageTwig from './yds-wrapped-image.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import WrappedImageData from './wrapped-image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Image/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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

export const Playground = ({
  sectionTheme,
  caption,
  imageAlignment,
  imageStyle,
}) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different wrapped image alignments and styles.</p>

  <div data-component-theme="${sectionTheme}">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
