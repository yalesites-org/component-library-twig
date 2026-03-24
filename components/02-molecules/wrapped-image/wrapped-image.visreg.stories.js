import wrappedImageTwig from './yds-wrapped-image.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import WrappedImageData from './wrapped-image.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Image/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const caption = 'This is the caption for the 16:9 image above.';
  const imageAlignment = 'left';
  const imageStyle = 'floated';

  const renderWrappedImage = () => `
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
  `;

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(sectionTheme, renderWrappedImage(), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
