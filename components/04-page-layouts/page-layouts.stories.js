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
    headerBorderThickness: {
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    primaryNavPosition: {
      options: primaryNavPositions,
      type: 'select',
      defaultValue: 'right',
    },
    siteHeaderTheme: {
      options: siteHeaderThemeOptions,
      type: 'select',
      defaultValue: 'white',
    },
    footerBorderThickness: {
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    siteFooterTheme: {
      options: siteFooterThemeOptions,
      type: 'select',
      defaultValue: 'blue-yale',
    },
  },
};

export const fullWidth = ({
  headerBorderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  siteFooterTheme,
  footerBorderThickness,
}) =>
  fullWidthTwig({
    site_name: 'Department of Chemistry',
    site_header__border_thickness: headerBorderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_footer__border_thickness: footerBorderThickness,
    site_footer__theme: siteFooterTheme,
    ...utilityNavData,
  });
