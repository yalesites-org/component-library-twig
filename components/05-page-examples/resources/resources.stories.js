// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import resourcePageTwig from './resource-page.twig';
import resourceGridPageTwig from './resource-grid.twig';
import resourceListPageTwig from './resource-list.twig';

// Data files.
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import pagerData from '../../02-molecules/pager/pager-last.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import videoEmbedData from '../../01-atoms/videos/video-embed/video-embed.yml';

// JavaScript.
import '../../00-tokens/layout/yds-layout';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Resources',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...argTypes,
    showBreadcrumbs: {
      name: 'Breadcrumbs',
      type: 'boolean',
      defaultValue: true,
    },
  },
};

export const ResourcePage = ({
  siteName,
  resourceType,
  allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items'),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  siteHeaderAccent = localStorage.getItem('yds-cl-twig-site-header-accent'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterVariation = localStorage.getItem(
    'yds-cl-twig-site-footer-variation',
  ),
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  siteFooterAccent = localStorage.getItem('yds-cl-twig-site-footer-accent'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
  showBreadcrumbs,
}) => {
  return resourcePageTwig({
    site_name: siteName,
    site_animate_components: allowAnimatedItems,
    site_header__border_thickness: headerBorderThickness,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_header__accent: siteHeaderAccent,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__variation: siteFooterVariation,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    site_header__menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['2x3'],
    ...socialLinksData,
    show_breadcrumbs: showBreadcrumbs,

    resource_meta__heading: 'Resource Page',
    resource_meta__resource_type: resourceType,
    resource_meta__publish_date_label: 'Published On',
    resource_meta__publish_date: 'July 01, 2025',

    // Values for resource type: Document.
    resource_meta__download_label: 'Download',
    resource_meta__download_aria_label: 'Download file',
    resource_meta__download_url: '#.pdf',
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,

    // Values for resource type: Video.
    video_embed__content__1: videoEmbedData.video_embed__content,
  });
};
ResourcePage.argTypes = {
  resourceType: {
    name: 'Resource Type',
    type: 'select',
    options: ['video', 'document'],
    defaultValue: 'video',
  },
};
ResourcePage.args = {
  resourceType: 'video',
};

export const ResourceGrid = ({
  siteName,
  pageTitle,
  allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items'),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  siteHeaderAccent = localStorage.getItem('yds-cl-twig-site-header-accent'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterVariation = localStorage.getItem(
    'yds-cl-twig-site-footer-variation',
  ),
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  siteFooterAccent = localStorage.getItem('yds-cl-twig-site-footer-accent'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
}) =>
  resourceGridPageTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_animate_components: allowAnimatedItems,
    site_header__border_thickness: headerBorderThickness,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_header__accent: siteHeaderAccent,
    site_footer__variation: siteFooterVariation,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    site_header__menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['3x2'],
    reference_card__heading:
      'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet:
      'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: 'https://google.com',
    reference_card__date: '2022-03-30 13:00',
    reference_card__categories: [{ content: 'Video' }],
    show_categories: true,
    ...socialLinksData,
  });
ResourceGrid.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};

export const ResourceList = ({
  siteName,
  pageTitle,
  allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items'),
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation'),
  headerBorderThickness = localStorage.getItem(
    'yds-cl-twig-header-border-thickness',
  ),
  primaryNavPosition = localStorage.getItem('yds-cl-twig-primary-nav-position'),
  siteHeaderTheme = localStorage.getItem('yds-cl-twig-site-header-theme'),
  siteHeaderAccent = localStorage.getItem('yds-cl-twig-site-header-accent'),
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterVariation = localStorage.getItem(
    'yds-cl-twig-site-footer-variation',
  ),
  siteFooterTheme = localStorage.getItem('yds-cl-twig-site-footer-theme'),
  siteFooterAccent = localStorage.getItem('yds-cl-twig-site-footer-accent'),
  footerBorderThickness = localStorage.getItem(
    'yds-cl-twig-footer-border-thickness',
  ),
}) =>
  resourceListPageTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: null,
    site_animate_components: allowAnimatedItems,
    site_header__border_thickness: headerBorderThickness,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_header__accent: siteHeaderAccent,
    site_footer__variation: siteFooterVariation,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    site_header__menu__variation: menuVariation,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['3x2'],
    reference_card__heading:
      'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet:
      'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: '#',
    reference_card__date: '2022-03-30 13:00',
    reference_card__categories: [{ content: 'Video' }],
    show_categories: true,
    ...pagerData,
    ...socialLinksData,
  });
ResourceList.argTypes = {
  meta: {
    table: {
      disable: true,
    },
  },
};
