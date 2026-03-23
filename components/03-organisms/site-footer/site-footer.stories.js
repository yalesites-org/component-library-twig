import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteFooterTwig from './yds-site-footer.twig';

import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import linkGroupData from '../../02-molecules/link-group/link-group.yml';

import componentProps from './site-footer-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);

const argTypes = toArgTypes(componentProps);
argTypes.borderThickness = {
  ...argTypes.borderThickness,
  options: borderThicknessOptions,
};
argTypes.siteFooterTheme = {
  ...argTypes.siteFooterTheme,
  options: siteFooterThemeOptions,
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Global Elements/Footer',
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args: {
    ...toArgs(componentProps),
    borderThickness: '8',
  },
};

export const Footer = ({
  borderThickness,
  siteFooterTheme,
  siteFooterVariation,
  siteFooterAccent,
}) =>
  siteFooterTwig({
    ...socialLinksData,
    ...linkGroupData,
    site_footer__border_thickness: borderThickness,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
    site_footer__content_text:
      'This is <a href="https://example.com">example text</a> for footer content <a href="https://example.com/blah">with a link</a>.',
  });
