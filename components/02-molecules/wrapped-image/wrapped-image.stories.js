import wrappedImageTwig from './yds-wrapped-image.twig';
import textFieldTwig from '../text/yds-text-field.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import WrappedImageData from './wrapped-image.yml';
import componentProps from './wrapped-image-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Wrapped Image',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const WrappedImage = ({ caption, imageAlignment, imageStyle }) => `
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
