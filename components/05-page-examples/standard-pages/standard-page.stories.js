import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';
import componentProps from './standard-page-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';
import argTypesToArgs from '../../utility';
import buildPageProps from '../page-utils';
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';

// Twig files.
import standardPageTwig from './standard-page.twig';
import standardPageBannerTwig from './standard-page-with-banner.twig';
import standardPageSidebarTwig from './standard-page-with-sidebar.twig';
import standardPageQuickLinksTwig from './standard-page-with-quicklinks.twig';
import standardPageShortTwig from './standard-page-short.twig';
import standardPageSpotlightsTwig from './standard-page-spotlights.twig';

// Data files.
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from '../../02-molecules/text-with-image/text-with-image.yml';
import bannerData from '../../02-molecules/banner/banner.yml';
import grandHeroData from '../../02-molecules/banner/grand-hero.yml';
import referenceCardData from '../../02-molecules/cards/reference-card/examples/post-card.yml';
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import quickLinksData from '../../02-molecules/quick-links/quick-links.yml';
import videoData from '../../02-molecules/video/video.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import tabData from '../../02-molecules/tabs/tabs.yml';
import mediaGridData from '../../03-organisms/galleries/media-grid/media-grid.yml';
import contentSpotlightPortraitData from '../../02-molecules/content-spotlight-portrait/content-spotlight-portrait.yml';
import secondaryNavItems from '../../03-organisms/menu/secondary-nav/secondary-nav.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';
import '../../03-organisms/menu/breadcrumbs/yds-breadcrumbs';
import '../../03-organisms/menu/secondary-nav/yds-secondary-nav';
import '../../02-molecules/menu/menu-in-this-section-toggle/yds-menu-in-this-section-toggle';
import '../../03-organisms/site-in-this-section/yds-site-in-this-section';

const colorPairingsData = Object.keys(tokens['component-themes']);

const componentArgTypes = toArgTypes(componentProps);
componentArgTypes.bgColor = {
  ...componentArgTypes.bgColor,
  options: colorPairingsData,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Standard Pages',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...argTypes,
    ...componentArgTypes,
  },
  args: {
    ...argTypesToArgs(argTypes),
    ...toArgs(componentProps),
    calloutBackground: 'one',
    pageTitleDisplay: 'visible',
  },
};

// Basic page
export const Basic = (args) => {
  const { pageTitle, pageTitleDisplay, introContent, calloutBackground } = args;
  return standardPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    page_title__display: pageTitleDisplay,
    page_title__additional_classes: [pageTitleDisplay],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...imageData.responsive_images['4x3'],
  });
};

// Short page
export const BasicShort = (args) => {
  const { pageTitle, introContent, calloutBackground } = args;
  return standardPageShortTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['4x3'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...secondaryNavItems,
  });
};

// Spotlight page
export const BasicSpotlights = (args) => {
  const { pageTitle, calloutBackground } = args;
  return standardPageSpotlightsTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...contentSpotlightPortraitData,
    ...imageData.responsive_images['2x3'],
  });
};

// With Banner
export const WithBanner = (args) => {
  const {
    pageTitle,
    introContent,
    calloutBackground,
    heading,
    snippet,
    linkContent,
    contentLayout,
    bgColor,
    linkStyle,
    bannerType,
    videoHeading,
    videoCaption,
    grandHeroOverlayVariation,
    grandHeroSize,
    grandHeroWithVideo,
  } = args;
  return standardPageBannerTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...customCardData,
    banner_type: bannerType,
    banner__heading: heading,
    banner__snippet: snippet,
    banner__link__content: linkContent,
    banner__link__url: bannerData.banner__link__url,
    banner__link__style: linkStyle,
    banner__content__layout: contentLayout,
    banner__content__background: bgColor,
    grand_hero__heading: heading,
    grand_hero__snippet: snippet,
    grand_hero__link__content: linkContent,
    grand_hero__link__url: grandHeroData.grand_hero__link__url,
    grand_hero__content__background: bgColor,
    grand_hero__overlay_variation: grandHeroOverlayVariation,
    grand_hero__size: grandHeroSize,
    grand_hero__video: grandHeroWithVideo ? 'true' : 'false',
    ...imageData.responsive_images['16x9'],
    ...socialLinksData,
    ...videoData,
    video__heading: videoHeading,
    video__text: videoCaption,
    ...accordionData,
    ...tabData,
    ...mediaGridData,
  });
};
WithBanner.args = {
  bannerType: 'grand-hero',
  contentLayout: 'bottom',
  bgColor: 'one',
  heading: bannerData.banner__heading,
  snippet: bannerData.banner__snippet,
  linkContent: bannerData.banner__link__content,
  linkStyle: 'cta',
  grandHeroOverlayVariation: 'full',
  grandHeroSize: 'full',
  grandHeroWithVideo: false,
  videoHeading: videoData.video__heading,
  videoCaption: videoData.video__text,
};

// With sidebar
export const WithSidebar = (args) => {
  const { pageTitle, introContent, calloutBackground } = args;
  return standardPageSidebarTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
  });
};

// With quick links
export const WithQuickLinks = (args) => {
  const {
    pageTitle,
    quickLinksHeading,
    quickLinksDescription,
    quickLinksImage,
    quickLinksVariation,
  } = args;
  return standardPageQuickLinksTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    ...referenceCardData,
    ...socialLinksData,
    quick_links__heading: quickLinksHeading,
    quick_links__description: quickLinksDescription,
    quick_links__image: quickLinksImage,
    quick_links__variation: quickLinksVariation,
    quick_links__links: quickLinksData.quick_links__links,
  });
};
WithQuickLinks.args = {
  quickLinksHeading: quickLinksData.quick_links__heading,
  quickLinksDescription: quickLinksData.quick_links__description,
  quickLinksImage: true,
  quickLinksVariation: 'promotional',
};
