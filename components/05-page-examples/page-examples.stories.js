import argTypes from '../04-page-layouts/page-args';

import standardPageTwig from './standard-page.twig';

import utilityNavData from '../03-organisms/menu/utility-nav/utility-nav.yml';
import breadcrumbData from '../03-organisms/menu/breadcrumbs/breadcrumbs.yml';
import imageData from '../01-atoms/images/image/image.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Page Examples',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
};

export const StandardPage = ({
  siteName,
  headerBorderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme,
  footerBorderThickness,
}) =>
  standardPageTwig({
    site_name: siteName,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
  });
