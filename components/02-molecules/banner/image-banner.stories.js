import imageBannerTwig from './image/yds-image-banner.twig';
import componentProps from './image-banner-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import imageData from '../../01-atoms/images/image/image.yml';

const renderBanner = ({ bgColor, size, withVideo, imageCaption }) =>
  imageBannerTwig({
    ...imageData.responsive_images['16x9'],
    image_banner__content__background: bgColor,
    image_banner__overlay_variation: 'full',
    image_banner__size: size,
    image_banner__video: withVideo ? 'true' : 'false',
    image_banner__caption: imageCaption,
  });

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Banners/Image Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    imageCaption: 'Image Caption',
  },
};

export const ImageBanner = (args) => renderBanner(args);

export const ImageBannerShort = (args) => renderBanner(args);
ImageBannerShort.args = { size: 'short' };
ImageBannerShort.storyName = 'Short';

export const ImageBannerMini = (args) => renderBanner(args);
ImageBannerMini.args = { size: 'mini' };
ImageBannerMini.storyName = 'Mini';
