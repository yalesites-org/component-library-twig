import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import imageBannerTwig from './image/yds-image-banner.twig';
import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const defaultArgs = {
  bgColor: 'one',
  size: 'tall',
  withVideo: false,
  imageCaption: 'Image Caption',
};

const sharedArgTypes = addTableDefaults(
  {
    bgColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
    size: {
      name: 'Image Size',
      type: 'select',
      options: ['tall', 'short'],
    },
    withVideo: {
      name: 'With Video',
      type: 'boolean',
    },
    imageCaption: {
      name: 'Image Caption',
      type: 'string',
    },
  },
  defaultArgs,
);

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
  title: 'Molecules/Banners/Image Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: sharedArgTypes,
};

export const ImageBanner = (args) => renderBanner(args);
ImageBanner.args = defaultArgs;
ImageBanner.argTypes = sharedArgTypes;

export const ImageBannerShort = (args) => renderBanner(args);
ImageBannerShort.args = { ...defaultArgs, size: 'short' };
ImageBannerShort.argTypes = sharedArgTypes;
ImageBannerShort.storyName = 'Short';
