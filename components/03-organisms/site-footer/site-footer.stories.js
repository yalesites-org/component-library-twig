import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteFooterTwig from './yds-site-footer.twig';

import socialLinksData from '../../02-molecules/social-links/social-links.yml';
import linkGroupData from '../../02-molecules/link-group/link-group.yml';

import { addTableDefaults } from '../../_storybook/add-table-defaults';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);
const siteFooterAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

const footerDefaultArgs = {
  borderThickness: '8',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
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
  argTypes: addTableDefaults(
    {
      borderThickness: {
        options: borderThicknessOptions,
        type: 'select',
      },
    },
    footerDefaultArgs,
  ),
  args: footerDefaultArgs,
};

const footerArgs = {
  borderThickness: '8',
  siteFooterTheme: 'one',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
};

export const Footer = ({
  borderThickness,
  siteFooterTheme,
  siteFooterVariation,
  siteFooterAccent,
}) =>
  siteFooterTwig({
    ...socialLinksData,
    ...siteFooterAccents,
    ...linkGroupData,
    site_footer__border_thickness: borderThickness,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
    site_footer__content_text:
      'This is <a href="https://example.com">example text</a> for footer content <a href="https://example.com/blah">with a link</a>.',
  });

Footer.args = footerArgs;

Footer.argTypes = addTableDefaults(
  {
    borderThickness: {
      options: borderThicknessOptions,
      type: 'select',
    },
    siteFooterTheme: {
      name: 'Footer Theme (dial)',
      options: siteFooterThemeOptions,
      type: 'select',
    },
    siteFooterAccent: {
      name: 'Footer Accent Color (dial)',
      options: siteFooterAccents,
      type: 'select',
    },
    siteFooterVariation: {
      name: 'Footer Variation (dial)',
      options: ['basic', 'mega'],
      type: 'select',
    },
  },
  footerArgs,
);
