import bannerTwig from './action/yds-action-banner.twig';
import componentProps from './action-banner-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import bannerData from './banner.yml';
import imageData from '../../01-atoms/images/image/image.yml';

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
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: bannerData.banner__heading,
    snippet: bannerData.banner__snippet,
    linkContent: bannerData.banner__link__content,
    linkContentTwo: bannerData.banner__link__content_two,
  },
};

export const ActionBanner = (args) => renderBanner(args);

export const ActionBannerLeft = (args) => renderBanner(args);
ActionBannerLeft.args = { contentLayout: 'left' };
ActionBannerLeft.storyName = 'Left Layout';

export const ActionBannerRight = (args) => renderBanner(args);
ActionBannerRight.args = { contentLayout: 'right' };
ActionBannerRight.storyName = 'Right Layout';
