import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import bannerTwig from './action/yds-action-banner.twig';
import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import imageBannerTwig from './image/yds-image-banner.twig';
import videoBannerTwig from './video/yds-video-banner.twig';

import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import videoBannerData from '../../01-atoms/videos/video-embed/video-embed.yml';

import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const bannerArgTypes = {
  heading: {
    name: 'Heading',
    type: 'string',
  },
  snippet: {
    name: 'Snippet',
    type: 'string',
  },
  linkContent: {
    name: 'Link Content',
    type: 'string',
  },
  linkContentTwo: {
    name: 'Link Content Two',
    type: 'string',
  },
};

const defaultArgs = {
  heading: bannerData.banner__heading,
  snippet: bannerData.banner__snippet,
  linkContent: bannerData.banner__link__content,
  linkContentTwo: bannerData.banner__link__content_two,
  bgColor: 'one',
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: addTableDefaults(
    {
      bgColor: {
        name: 'Component Theme (dial)',
        type: 'select',
        options: colorPairingsData,
      },
    },
    defaultArgs,
  ),
};

export const ActionBanner = ({
  heading,
  snippet,
  linkContent,
  linkContentTwo,
  linkStyle,
  contentLayout,
  bgColor,
  overlayBackgroundImage,
  buttonAlignment,
  buttonStyleConsistency,
}) =>
  bannerTwig({
    ...imageData.responsive_images['16x9'],
    banner__heading: heading,
    banner__snippet: snippet,
    banner__link__content: linkContent,
    banner__link__url: linkStyle !== 'none' ? bannerData.banner__link__url : '',
    banner__link__content_two: linkStyle !== 'none' ? linkContentTwo : '',
    banner__link__url_two:
      linkStyle !== 'none' ? bannerData.banner__link__url_two : '',
    banner__link__style: linkStyle,
    banner__content__layout: contentLayout,
    banner__content__background: bgColor,
    banner__button__alignment: buttonAlignment,
    banner__button__style__consistency: buttonStyleConsistency,
    banner__overlay_background_image: overlayBackgroundImage
      ? imageData.responsive_images.pattern
      : '',
  });
const actionBannerArgs = {
  ...defaultArgs,
  linkStyle: 'cta',
  contentLayout: 'bottom',
  buttonAlignment: 'right',
  buttonStyleConsistency: 'mixed',
  overlayBackgroundImage: false,
};

ActionBanner.argTypes = addTableDefaults(
  {
    ...bannerArgTypes,
    linkStyle: {
      name: 'Link Style',
      type: 'select',
      options: ['cta', 'text-link', 'none'],
    },
    contentLayout: {
      name: 'Content Layout',
      type: 'select',
      options: ['bottom', 'left', 'right'],
    },
    buttonAlignment: {
      name: 'Button Alignment',
      type: 'select',
      options: ['left', 'center', 'right'],
    },
    buttonStyleConsistency: {
      name: 'Button Style Consistency',
      type: 'select',
      options: ['mixed', 'both_primary', 'both_secondary'],
    },
    overlayBackgroundImage: {
      name: 'Overlay Background Image',
      type: 'boolean',
    },
  },
  actionBannerArgs,
);

ActionBanner.args = actionBannerArgs;

export const GrandHeroBanner = ({
  heading,
  snippet,
  linkContent,
  linkContentTwo,
  bgColor,
  overlayVariation,
  size,
  withVideo,
}) =>
  grandHeroTwig({
    ...imageData.responsive_images['16x9'],
    grand_hero__heading: heading,
    grand_hero__snippet: snippet,
    grand_hero__link__content: linkContent,
    grand_hero__link__url: grandHeroData.grand_hero__link__url,
    grand_hero__link__content_two: linkContentTwo,
    grand_hero__link__url_two: grandHeroData.grand_hero__link__url_two,
    grand_hero__content__background: bgColor,
    grand_hero__overlay_variation: overlayVariation,
    grand_hero__size: size,
    grand_hero__video: withVideo ? 'true' : 'false',
  });
const grandHeroBannerArgs = {
  heading: bannerData.banner__heading,
  snippet: bannerData.banner__snippet,
  linkContent: bannerData.banner__link__content,
  linkContentTwo: bannerData.banner__link__content_two,
  bgColor: 'one',
  overlayVariation: 'full',
  size: 'full',
  withVideo: false,
};

GrandHeroBanner.argTypes = addTableDefaults(
  {
    ...bannerArgTypes,
    overlayVariation: {
      name: 'Content Overlay',
      type: 'select',
      options: ['contained', 'contained-narrow', 'full'],
    },
    size: {
      name: 'Content Size',
      type: 'select',
      options: ['reduced', 'full', 'mini'],
    },
    withVideo: {
      name: 'With Video',
      type: 'boolean',
    },
  },
  grandHeroBannerArgs,
);

GrandHeroBanner.args = grandHeroBannerArgs;

export const ImageBanner = ({ bgColor, size, withVideo, imageCaption }) =>
  imageBannerTwig({
    ...imageData.responsive_images['16x9'],
    image_banner__content__background: bgColor,
    image_banner__overlay_variation: 'full',
    image_banner__size: size,
    image_banner__video: withVideo ? 'true' : 'false',
    image_banner__caption: imageCaption,
  });
const imageBannerArgs = {
  bgColor: 'one',
  size: 'tall',
  withVideo: false,
  imageCaption: 'Image Caption',
};

ImageBanner.argTypes = addTableDefaults(
  {
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
  imageBannerArgs,
);

ImageBanner.args = imageBannerArgs;

export const VideoBanner = ({ width }) =>
  videoBannerTwig({
    video_banner__content: videoBannerData.video_embed__content,
    video_banner__width: width,
  });
const videoBannerArgs = {
  width: 'max',
};

VideoBanner.argTypes = addTableDefaults(
  {
    width: {
      name: 'Video Width',
      type: 'select',
      options: ['max', 'full'],
    },
  },
  videoBannerArgs,
);
VideoBanner.args = videoBannerArgs;
