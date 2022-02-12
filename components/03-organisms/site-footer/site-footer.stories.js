import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteFooterTwig from './site-footer.twig';
import siteFooterExamples from './_site-footer--examples.twig';

const siteFooterThemes = { themes: tokens['site-footer-themes'] };
// const borderThicknessOptions = Object.keys(tokens.border.thickness);
// const primaryNavPositions = Object.keys(tokens.layout['flex-position']);
// const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site/Footer',
  parameters: {
    layout: 'fullscreen',
  },
  // argTypes: {
  //   borderThickness: {
  //     options: borderThicknessOptions,
  //     type: 'select',
  //     defaultValue: '8',
  //   },
  //   primaryNavPosition: {
  //     options: primaryNavPositions,
  //     type: 'select',
  //     defaultValue: 'right',
  //   },
  //   siteFooterTheme: {
  //     options: siteFooterThemeOptions,
  //     type: 'select',
  //     defaultValue: 'white',
  //   },
  // },
};

export const Footer = () => siteFooterTwig();

export const footerExamples = () => siteFooterExamples({ ...siteFooterThemes });
