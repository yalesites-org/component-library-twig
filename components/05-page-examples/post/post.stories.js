// Shared Storybook args.
import argTypes from '../../04-page-layouts/cl-page-args';

// Twig files.
import postArticleTwig from './post-article.twig';
import postGridTwig from './post-grid.twig';

// Data files.
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import socialLinksData from '../../02-molecules/social-links/social-links.yml';
// JavaScript.
import '../../00-tokens/layout/yds-layout';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Post',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
};

export const PostArticle = ({
  siteName,
  pageTitle,
  meta,
  globalTheme = localStorage.getItem('yds-cl-twig-global-theme'),
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
}) =>
  postArticleTwig({
    site_name: siteName,
    page_title__heading: pageTitle,
    page_title__meta: meta,
    site_global__theme: globalTheme,
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
    image__srcset__1: imageData.responsive_images['4x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['4x3'].image__sizes,
    image__alt__1: imageData.responsive_images['4x3'].image__alt,
    image__src__1: imageData.responsive_images['4x3'].image__src,
    image__srcset__wrapped: imageData.responsive_images['3x2'].image__srcset,
    image__sizes__wrapped: imageData.responsive_images['3x2'].image__sizes,
    image__alt__wrapped: imageData.responsive_images['3x2'].image__alt,
    image__src__wrapped: imageData.responsive_images['3x2'].image__src,
    ...socialLinksData,
  });

export const postGridCustom = () => postGridTwig();