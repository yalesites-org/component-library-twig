import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import fullWidthTwig from './full-width.twig';

import utilityNavData from '../03-organisms/menu/utility-nav/utility-nav.yml';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const primaryNavPositions = Object.keys(tokens.layout['flex-position']);
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Layouts/Page Layouts',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteName: {
      name: 'Site Name',
      type: 'string',
      defaultValue: 'Department of Chemistry',
    },
    headerBorderThickness: {
      name: 'Header: Border thickness',
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    primaryNavPosition: {
      name: 'Header: Primary nav position',
      options: primaryNavPositions,
      type: 'select',
      defaultValue: 'right',
    },
    utilityNavLinkContent: {
      name: 'Header: Utility nav link text',
      type: 'string',
      defaultValue: null,
    },
    utilityNavSearch: {
      name: 'Header: Search',
      type: 'boolean',
      defaultValue: false,
    },
    siteHeaderTheme: {
      name: 'Header: Theme',
      options: siteHeaderThemeOptions,
      type: 'select',
      defaultValue: 'white',
    },
    footerBorderThickness: {
      name: 'Footer: Border thickness',
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    siteFooterTheme: {
      name: 'Footer: Theme',
      options: siteFooterThemeOptions,
      type: 'select',
      defaultValue: 'blue-yale',
    },
  },
};

export const fullWidth = ({
  siteName,
  headerBorderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme,
  footerBorderThickness,
}) =>
  fullWidthTwig({
    site_name: siteName,
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    ...utilityNavData,
    utility_nav__link__content: utilityNavLinkContent,
    utility_nav__search: utilityNavSearch,
  });
