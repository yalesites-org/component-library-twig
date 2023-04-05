import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteFooterTwig from './yds-site-footer.twig';
import siteFooterExamples from './_site-footer--examples.twig';

import socialLinksData from '../../02-molecules/social-links/social-links.yml';

const siteFooterThemes = { themes: tokens['site-footer-themes'] };
const siteGlobalThemes = { themes: tokens['global-themes'] };
const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);
const siteGlobalThemeOptions = Object.keys(tokens['global-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/Footer',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    globalTheme: {
      options: siteGlobalThemeOptions,
      type: 'select',
      defaultValue: 'one',
    },
    borderThickness: {
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    siteFooterTheme: {
      options: siteFooterThemeOptions,
      type: 'select',
      defaultValue: 'one',
    },
  },
};

export const Footer = ({ borderThickness, siteFooterTheme, globalTheme }) =>
  siteFooterTwig({
    ...socialLinksData,
    site_global__theme: globalTheme,
    site_footer__border_thickness: borderThickness,
    site_footer__theme: siteFooterTheme,
  });

export const FooterExamples = ({ borderThickness, globalTheme }) =>
  siteFooterExamples({
    ...socialLinksData,
    ...siteFooterThemes,
    ...siteGlobalThemes,
    site_global__theme: globalTheme,
    site_footer__border_thickness: borderThickness,
  });
