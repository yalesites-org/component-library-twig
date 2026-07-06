import grandHeroTwig from './grand-hero/yds-grand-hero.twig';
import componentProps from './grand-hero-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import bannerData from './banner.yml';
import grandHeroData from './grand-hero.yml';
import imageData from '../../01-atoms/images/image/image.yml';

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
  title: 'Organisms/Banners/Grand Hero',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    overlayVariation: 'full',
    heading: bannerData.banner__heading,
    snippet: bannerData.banner__snippet,
    linkContent: bannerData.banner__link__content,
    linkContentTwo: bannerData.banner__link__content_two,
  },
};

export const GrandHeroBanner = (args) => renderBanner(args);

export const GrandHeroBannerContained = (args) => renderBanner(args);
GrandHeroBannerContained.args = { overlayVariation: 'contained' };
GrandHeroBannerContained.storyName = 'Contained Overlay';
