import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteFooterTwig from './yds-site-footer.twig';
import siteFooterExamples from './_site-footer--examples.twig';

import socialLinksData from '../../02-molecules/social-links/social-links.yml';

const siteFooterThemes = { themes: tokens['site-footer-themes'] };
const siteGlobalThemes = { themes: tokens['global-themes'] };
const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);

const globalThemeLabels = {
  themes: {
    'One - Old Blues': 'one',
    'Two - New Haven Green': 'two',
    'Three - Shoreline Summer': 'three',
    'Four - Elm City Nights': 'four',
    'Five - Quiet Corner': 'five',
  },
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/Footer',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    borderThickness: {
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
  },
};

export const Footer = ({ borderThickness, siteFooterTheme }) =>
  siteFooterTwig({
    ...socialLinksData,
    site_footer__border_thickness: borderThickness,
    site_footer__theme: siteFooterTheme,
  });

Footer.argTypes = {
  siteFooterTheme: {
    options: siteFooterThemeOptions,
    type: 'select',
    defaultValue: 'one',
  },
};

export const FooterExamples = ({ borderThickness, globalTheme }) =>
  siteFooterExamples({
    ...socialLinksData,
    ...siteFooterThemes,
    ...siteGlobalThemes,
    site_global__theme: globalTheme,
    site_footer__border_thickness: borderThickness,
  });

FooterExamples.argTypes = {
  globalTheme: {
    name: 'Global Theme (lever)',
    options: globalThemeLabels.themes,
    type: 'select',
    defaultValue: 'one',
  },
};
