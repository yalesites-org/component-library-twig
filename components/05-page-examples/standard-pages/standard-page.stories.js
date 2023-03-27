import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import standardPageTwig from './standard-page.twig';
import standardPageBannerTwig from './standard-page-with-banner.twig';
import standardPageSidebarTwig from './standard-page-with-sidebar.twig';
import standardPageQuickLinksTwig from './standard-page-with-quicklinks.twig';
import standardPageBannerLeftAlignTwig from './standard-page-with-banner-left-align.twig';
// import standardPageVideoTwig from './standard-page-with-video.twig';
import standardPageShortTwig from './standard-page-short.twig';

// Data files.
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import textWithImageData from '../../02-molecules/text-with-image/text-with-image.yml';
import bannerData from '../../02-molecules/banner/banner.yml';
import grandHeroData from '../../02-molecules/banner/grand-hero.yml';
import referenceCardData from '../../02-molecules/cards/reference-card/examples/news-card.yml';
import customCardData from '../../02-molecules/cards/custom-card/custom-card.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import quickLinksData from '../../02-molecules/quick-links/quick-links.yml';
import videoData from '../../02-molecules/video/video.yml';
import accordionData from '../../02-molecules/accordion/accordion.yml';
import tabData from '../../02-molecules/tabs/tabs.yml';
import mediaGridData from '../../03-organisms/galleries/media-grid/media-grid.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';

const colorPairingsData = Object.keys(tokens['component-themes']);

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
    introContent: {
      name: 'Intro Content',
      options: [
        'none',
        'image',
        'wrapped-image',
        'text-with-image--focus-content',
        'text-with-image--focus-image',
        'text-with-image--focus-equal',
        'collection-featured',
        'collection-secondary',
      ],
      type: 'select',
      defaultValue: 'none',
    },
    calloutBackground: {
      name: 'Callout Background Color',
      type: 'select',
      options: ['blue-yale', 'gray-700'],
      defaultValue: 'blue-yale',
    },
  },
};

export const Basic = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  introContent,
  calloutBackground,
}) =>
  standardPageTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['4x3'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
  });

export const BasicShort = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  introContent,
  calloutBackground,
}) =>
  standardPageShortTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['4x3'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
  });

export const WithBanner = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
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
}) =>
  standardPageBannerTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
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
    ...socialLinksData,
    ...videoData,
    video__heading: videoHeading,
    video__text: videoCaption,
    ...accordionData,
    ...tabData,
    ...mediaGridData,
  });
WithBanner.argTypes = {
  bannerType: {
    name: 'Banner Type',
    type: 'select',
    options: ['action', 'grand-hero'],
    defaultValue: 'grand-hero',
  },
  contentLayout: {
    name: 'Banner Content Layout',
    type: 'select',
    options: ['bottom', 'left', 'right'],
    defaultValue: 'bottom',
  },
  bgColor: {
    name: 'Banner Content Background Color',
    type: 'select',
    options: colorPairingsData,
    defaultValue: 'gray-800',
  },
  heading: {
    name: 'Banner Heading',
    type: 'string',
    defaultValue: bannerData.banner__heading,
  },
  snippet: {
    name: 'Banner Snippet',
    type: 'string',
    defaultValue: bannerData.banner__snippet,
  },
  linkContent: {
    name: 'Banner Link Content',
    type: 'string',
    defaultValue: bannerData.banner__link__content,
  },
  linkStyle: {
    name: 'Link Style',
    type: 'select',
    options: ['cta', 'text-link'],
    defaultValue: 'cta',
  },
  grandHeroOverlayVariation: {
    name: 'Grand Hero Content Overlay',
    type: 'select',
    options: ['contained', 'full'],
    defaultValue: 'full',
  },
  grandHeroSize: {
    name: 'Grand Hero Content Size',
    type: 'select',
    options: ['reduced', 'full'],
    defaultValue: 'full',
  },
  grandHeroWithVideo: {
    name: 'Grand Hero With Video',
    type: 'boolean',
    defaultValue: false,
  },
  videoHeading: {
    name: 'Video Heading',
    type: 'string',
    defaultValue: videoData.video__heading,
  },
  videoCaption: {
    name: 'Video Caption',
    type: 'string',
    defaultValue: videoData.video__text,
  },
  ...accordionData,
};

export const WithBannerLeftAlign = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  introContent,
  calloutBackground,
  heading,
  snippet,
  linkContent,
  contentLayout,
  bgColor,
  linkStyle,
  bannerType,
  grandHeroOverlayVariation,
  grandHeroSize,
  grandHeroWithVideo,
  videoHeading,
  videoCaption,
  QLheading,
  QLdescription,
  QLimage,
  QLvariation,
}) =>
  standardPageBannerLeftAlignTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...customCardData,
    ...socialLinksData,
    ...videoData,
    ...accordionData,
    ...tabData,
    ...mediaGridData,
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
    quick_links__heading: QLheading,
    quick_links__description: QLdescription,
    quick_links__image: QLimage,
    quick_links__variation: QLvariation,
    quick_links__links: quickLinksData.quick_links__links,
    video__heading: videoHeading,
    video__text: videoCaption,
  });
WithBannerLeftAlign.argTypes = {
  bannerType: {
    name: 'Banner Type',
    type: 'select',
    options: ['action', 'grand-hero'],
    defaultValue: 'grand-hero',
  },
  contentLayout: {
    name: 'Banner Content Layout',
    type: 'select',
    options: ['bottom', 'left', 'right'],
    defaultValue: 'bottom',
  },
  bgColor: {
    name: 'Banner Content Background Color',
    type: 'select',
    options: colorPairingsData,
    defaultValue: 'gray-800',
  },
  heading: {
    name: 'Banner Heading',
    type: 'string',
    defaultValue: bannerData.banner__heading,
  },
  snippet: {
    name: 'Banner Snippet',
    type: 'string',
    defaultValue: bannerData.banner__snippet,
  },
  linkContent: {
    name: 'Banner Link Content',
    type: 'string',
    defaultValue: bannerData.banner__link__content,
  },
  linkStyle: {
    name: 'Link Style',
    type: 'select',
    options: ['cta', 'text-link'],
    defaultValue: 'cta',
  },
  grandHeroOverlayVariation: {
    name: 'Grand Hero Content Overlay',
    type: 'select',
    options: ['contained', 'full'],
    defaultValue: 'full',
  },
  grandHeroSize: {
    name: 'Grand Hero Content Size',
    type: 'select',
    options: ['reduced', 'full'],
    defaultValue: 'full',
  },
  grandHeroWithVideo: {
    name: 'Grand Hero With Video',
    type: 'boolean',
    defaultValue: false,
  },
  QLheading: {
    name: 'Quick Links Heading',
    type: 'string',
    defaultValue: quickLinksData.quick_links__heading,
  },
  QLdescription: {
    name: 'Quick Links Description',
    type: 'string',
    defaultValue: quickLinksData.quick_links__description,
  },
  QLimage: {
    name: 'With image',
    type: 'boolean',
    defaultValue: true,
  },
  QLvariation: {
    name: 'Quick Links Variation',
    type: 'select',
    options: ['promotional', 'subtle'],
    defaultValue: 'subtle',
  },
  videoHeading: {
    name: 'Video Heading',
    type: 'string',
    defaultValue: videoData.video__heading,
  },
  videoCaption: {
    name: 'Video Caption',
    type: 'string',
    defaultValue: videoData.video__text,
  },
};

export const WithSidebar = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  introContent,
  calloutBackground,
}) =>
  standardPageSidebarTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
  });

export const WithQuickLinks = ({
  siteName,
  pageTitle,
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  heading,
  description,
  image,
  variation,
}) =>
  standardPageQuickLinksTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
    ...referenceCardData,
    ...socialLinksData,
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
    quick_links__variation: variation,
    quick_links__links: quickLinksData.quick_links__links,
  });
WithQuickLinks.argTypes = {
  heading: {
    name: 'Quick Links Heading',
    type: 'string',
    defaultValue: quickLinksData.quick_links__heading,
  },
  description: {
    name: 'Quick Links Description',
    type: 'string',
    defaultValue: quickLinksData.quick_links__description,
  },
  image: {
    name: 'With image',
    type: 'boolean',
    defaultValue: true,
  },
  variation: {
    name: 'Quick Links Variation',
    type: 'select',
    options: ['promotional', 'subtle'],
    defaultValue: 'promotional',
  },
};

// commenting out video page for now.
// export const withVideo = ({
//   siteName,
//   pageTitle,
//   headerBorderThickness,
//   primaryNavPosition,
//   siteHeaderTheme,
//   utilityNavLinkContent,
//   utilityNavSearch,
//   siteFooterTheme,
//   footerBorderThickness,
//   videoHeading,
//   videoCaption,
//   menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
// }) =>
//   standardPageVideoTwig({
//     site_name: siteName,
//     page_title__heading: pageTitle,
//     page_title__meta: null,
//     site_header__border_thickness: headerBorderThickness,
//     site_header__nav_position: primaryNavPosition,
//     site_header__theme: siteHeaderTheme,
//     site_footer__border_thickness: footerBorderThickness,
//     site_footer__theme: siteFooterTheme,
//     utility_nav__items: utilityNavData.items,
//     primary_nav__items: primaryNavData.items,
//     menu__variation: menuVariation,
//     utility_nav__link__content: utilityNavLinkContent,
//     utility_nav__link__url: '#',
//     utility_nav__search: utilityNavSearch,
//     breadcrumbs__items: breadcrumbData.items,
//     ...imageData.responsive_images['16x9'],
//     ...referenceCardData,
//     ...socialLinksData,
//     ...videoData,
//     video__heading: videoHeading,
//     video__text: videoCaption,
//   });
// withVideo.argTypes = {
//   videoHeading: {
//     name: 'Video Heading',
//     type: 'string',
//     defaultValue: videoData.video__heading,
//   },
//   videoCaption: {
//     name: 'Video Caption',
//     type: 'string',
//     defaultValue: videoData.video__text,
//   },
// };
