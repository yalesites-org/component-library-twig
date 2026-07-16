import contentImageTwig from './yds-content-image.twig';

import imageData from '../../01-atoms/images/image/image.yml';
import componentProps from './image-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Molecules/Image',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    src: imageData.responsive_images['16x9'].image__src,
    alt: imageData.responsive_images['16x9'].image__alt,
    srcset: imageData.responsive_images['16x9'].image__srcset,
    sizes: imageData.responsive_images['16x9'].image__sizes,
    caption: 'This is the <a href="#">caption</a> for the 16:9 image above.',
  },
};

export const ContentImage = ({ src, alt, caption, width, srcset, sizes }) => `
  ${contentImageTwig({
    output_image_tag: true,
    image__src: src,
    image__alt: alt,
    image__srcset: srcset,
    image__sizes: sizes,
    content_image__caption: caption,
    content_image__width: width,
  })}
`;
