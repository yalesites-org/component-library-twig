// Shared Storybook args.
import argTypes from '../../04-page-layouts/page-args';

// Twig files.
import eventPageTwig from './event-page.twig';

// Data files.
import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';
import breadcrumbData from '../../03-organisms/menu/breadcrumbs/breadcrumbs.yml';
import imageData from '../../01-atoms/images/image/image.yml';

// JavaScript.
import '../../00-tokens/layout/layout';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Examples/Events',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
};

export const EventPage = ({
  siteName,
  headerBorderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme,
  footerBorderThickness,
}) =>
  eventPageTwig({
    site_name: siteName,
    page_title__heading:
      'Parlika (2016) film screening + Q&A with film director Sahraa Karimi',
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__link__url: '#',
    utility_nav__search: utilityNavSearch,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['16x9'],
    image__srcset__1: imageData.responsive_images['4x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['4x3'].image__sizes,
    image__alt__1: imageData.responsive_images['4x3'].image__alt,
    image__src__1: imageData.responsive_images['4x3'].image__src,
    image__srcset__pop_out: imageData.responsive_images['3x2'].image__srcset,
    image__sizes__pop_out: imageData.responsive_images['3x2'].image__sizes,
    image__alt__pop_out: imageData.responsive_images['3x2'].image__alt,
    image__src__pop_out: imageData.responsive_images['3x2'].image__src,
  });
