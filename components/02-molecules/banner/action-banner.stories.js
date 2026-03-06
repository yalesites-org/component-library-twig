import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import { addTableDefaults } from '../../_storybook/add-table-defaults';

import bannerTwig from './action/yds-action-banner.twig';
import bannerData from './banner.yml';
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
  linkStyle: 'cta',
  contentLayout: 'bottom',
  buttonAlignment: 'right',
  buttonStyleConsistency: 'mixed',
  overlayBackgroundImage: false,
};

const sharedArgTypes = addTableDefaults(
  {
    ...bannerArgTypes,
    bgColor: {
      name: 'Component Theme (dial)',
      type: 'select',
      options: colorPairingsData,
    },
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
  defaultArgs,
);

const renderBanner = ({
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

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Banners/Action Banner',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: sharedArgTypes,
};

export const ActionBanner = (args) => renderBanner(args);
ActionBanner.args = defaultArgs;
ActionBanner.argTypes = sharedArgTypes;

export const ActionBannerLeft = (args) => renderBanner(args);
ActionBannerLeft.args = { ...defaultArgs, contentLayout: 'left' };
ActionBannerLeft.argTypes = sharedArgTypes;
ActionBannerLeft.storyName = 'Left Layout';

export const ActionBannerRight = (args) => renderBanner(args);
ActionBannerRight.args = { ...defaultArgs, contentLayout: 'right' };
ActionBannerRight.argTypes = sharedArgTypes;
ActionBannerRight.storyName = 'Right Layout';
