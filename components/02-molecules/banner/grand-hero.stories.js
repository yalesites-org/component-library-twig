import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

const grandHeroArgTypes = {
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
  overlayVariation: 'full',
  size: 'full',
  withVideo: false,
};

const sharedArgTypes = addTableDefaults(
  {
    ...grandHeroArgTypes,
    bgColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
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
  defaultArgs,
);

const renderBanner = ({
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

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Grand Hero',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: sharedArgTypes,
};

export const GrandHeroBanner = (args) => renderBanner(args);
GrandHeroBanner.args = defaultArgs;
GrandHeroBanner.argTypes = sharedArgTypes;

export const GrandHeroBannerContained = (args) => renderBanner(args);
GrandHeroBannerContained.args = {
  ...defaultArgs,
  overlayVariation: 'contained',
};
GrandHeroBannerContained.argTypes = sharedArgTypes;
GrandHeroBannerContained.storyName = 'Contained Overlay';
