import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import getGlobalThemes from './color-global-themes';

import colorsTwig from './colors.twig';
import colorComponentThemeTwig from './color-component-theme-pairings.twig';
import colorGlobalThemeTwig from './color-global-themes.twig';
import colorGlobalThemePairingTwig from './color-global-theme-pairings.twig';
import colorBasicThemesTwig from './color-basic-themes.twig';

import utilityNavData from '../../03-organisms/menu/utility-nav/utility-nav.yml';
import primaryNavData from '../../03-organisms/menu/primary-nav/primary-nav.yml';

// JavaScript to handle size
import '../../03-organisms/site-header/yds-site-header';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import '../../02-molecules/tabs/yds-tabs';

import quickLinksData from '../../02-molecules/quick-links/quick-links.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import tabData from '../../02-molecules/tabs/tabs.yml';
import bannerData from '../../02-molecules/banner/banner.yml';

const colorsData = {
  colors: {
    blue: tokens.color.blue,
    green: tokens.color.green,
    orange: tokens.color.orange,
    yellow: tokens.color.yellow,
    basic: tokens.color.basic,
    gray: tokens.color.gray,
  },
};

const colorComponentThemeData = { themes: tokens['component-themes'] };
const colorBasicThemeData = { themes: tokens['basic-themes'] };
const colorGlobalThemeData = { globalThemes: tokens['global-themes'] };
const siteHeaderThemes = { themes: tokens['site-header-themes'] };
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);
const siteFooterThemes = { themes: tokens['site-footer-themes'] };
const siteFooterThemeOptions = Object.keys(tokens['site-footer-themes']);
const siteHeaderAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];
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

const ctaButtonThemeOptions = Object.keys(tokens['button-cta-themes']);

// get global themes as `label` : `key` values to pass into options as array.
const siteGlobalThemeOptions = getGlobalThemes(tokens['global-themes']);

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);

export const ComponentColorSlots = () => `
  <div style="max-width: 1200px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <h1 style="color: #00356b; margin-bottom: 20px;">Component Color Slots Reference</h1>
    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px;">
      This reference lists all components in the YaleSites Design System that support color theming through "dials" or "slots".
      These controls allow you to customize the visual appearance of components while maintaining accessibility standards.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #00356b; padding: 20px; margin-bottom: 30px;">
      <h3 style="margin-top: 0;">What are Color Slots?</h3>
      <p style="margin-bottom: 0; line-height: 1.6;">
        Color slots (also called "dials" or "themes") are predefined color combinations that have been tested for accessibility.
        Each slot typically includes coordinated colors for backgrounds, text, borders, and accents that work together harmoniously.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background-color: #00356b; color: white;">
          <th style="padding: 15px; text-align: left; font-weight: 600;">Component</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Available Color Slots</th>
          <th style="padding: 15px; text-align: left; font-weight: 600;">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Banner</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Controls background theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Button (CTA)</td>
          <td style="padding: 15px;">Multiple theme options</td>
          <td style="padding: 15px;">Varies by button type and context</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Callout</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Quick Links</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Background color themes</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Pull Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Standalone Quote</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Accent theme for quote styling</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Tabs</td>
          <td style="padding: 15px;">One, Two, Three</td>
          <td style="padding: 15px;">Tab navigation theme</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6; background-color: #f8f9fa;">
          <td style="padding: 15px; font-weight: 500;">Site Header</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
        <tr style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 15px; font-weight: 500;">Site Footer</td>
          <td style="padding: 15px;">Multiple theme options + Accent colors (1-8)</td>
          <td style="padding: 15px;">Combines theme with accent color selection</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin-top: 30px;">
      <h3 style="margin-top: 0;">💡 Usage Tips</h3>
      <ul style="margin-bottom: 0; line-height: 1.8;">
        <li><strong>Global Theme:</strong> Set via the toolbar at the top of Storybook - affects overall site color palette</li>
        <li><strong>Component Themes:</strong> Individual "dial" settings for specific components</li>
        <li><strong>Accessibility:</strong> All color combinations are tested to meet WCAG 2.1 AA standards</li>
        <li><strong>Consistency:</strong> Using the same slot numbers across components creates visual cohesion</li>
      </ul>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6;">
      <h2 style="color: #00356b; margin-bottom: 15px;">Exploring Color Options</h2>
      <p style="line-height: 1.6; margin-bottom: 15px;">
        To see these color slots in action, visit these stories:
      </p>
      <ul style="line-height: 1.8;">
        <li><strong>Component Theme Color Pairings:</strong> View all component themes side-by-side</li>
        <li><strong>Global Theme Color Pairings:</strong> See how components adapt to global theme changes</li>
        <li><strong>Color Basic Themes:</strong> Review accessibility-tested background color options</li>
      </ul>
    </div>
  </div>
`;

export const ColorGlobalThemes = () =>
  colorGlobalThemeTwig(colorGlobalThemeData);

export const ColorBasicThemes = () => `
  <h2>These pairings are selected to support accessibility standards.</h2>
  <p>This page is useful to check the accessibility of various components against the available background colors.</p>

  ${colorBasicThemesTwig(colorBasicThemeData)}
`;

export const ComponentThemeColorPairings = ({
  heading,
  description,
  image,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderTwig,
  siteHeaderTheme,
  siteFooterTheme,
  siteHeaderAccent,
  siteFooterAccent,
  siteFooterVariation,
}) =>
  colorComponentThemeTwig({
    ...imageData.responsive_images['16x9'],
    ...tabData,
    ...bannerData,
    ...siteHeaderTwig,
    ...siteHeaderThemes,
    ...siteFooterThemes,
    ...colorComponentThemeData,
    ...utilityNavData,
    ...primaryNavData,
    ...siteHeaderAccents,
    ...siteFooterAccents,
    ...ctaButtonThemeOptions,
    site_header__site_name: 'Department of Chemistry',
    site_header__site_link: '/',
    site_header__border_thickness: '8',
    site_header__nav_position: primaryNavPosition,
    site_header__menu__variation: menuVariation,
    site_header__theme: siteHeaderTheme,
    site_header__background_image: siteHeaderImage,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__site_name_image: siteHeaderSiteNameImage,
    site_header__accent: siteHeaderAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
    quick_links__background_color: qlTheme,
    callout__background_color: calloutTheme,
    cta_button__component_theme: ctaButtonTheme,
    quick_links__links: quickLinksData.quick_links__links,
    tabs__theme: tabTheme,
    banner__content__background: bannerTheme,
    pull_quote__accent_theme: quoteTheme,
    standalone_quote__accent_theme: standaloneQuoteTheme,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
  });
ComponentThemeColorPairings.argTypes = {
  primaryNavPosition: {
    name: 'Header: Navigation Position',
    options: ['left', 'center', 'right'],
    type: 'select',
  },
  menuVariation: {
    name: 'Header: Menu Variation',
    options: ['basic', 'mega', 'focus'],
    type: 'select',
  },
  siteHeaderTheme: {
    name: 'Header: Theme (dial)',
    options: siteHeaderThemeOptions,
    type: 'select',
  },
  siteHeaderAccent: {
    name: 'Header: Accent Color (dial)',
    options: siteHeaderAccents,
    type: 'select',
  },
  siteHeaderImage: {
    name: 'Header: With image',
    type: 'boolean',
  },
  siteHeaderSiteNameImage: {
    name: 'Header: Site Name is an Image',
    type: 'boolean',
  },
  bannerTheme: {
    name: 'Banner Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  ctaButtonTheme: {
    name: 'Button CTA Theme (dial)',
    type: 'select',
    options: ctaButtonThemeOptions,
  },
  qlTheme: {
    name: 'Quick Links Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  quoteTheme: {
    name: 'Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  standaloneQuoteTheme: {
    name: 'Standalone Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  calloutTheme: {
    name: 'Callout Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  tabTheme: {
    name: 'Tabs Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  siteFooterTheme: {
    name: 'Footer: Theme (dial)',
    options: siteFooterThemeOptions,
    type: 'select',
  },
  siteFooterAccent: {
    name: 'Footer: Accent Color (dial)',
    options: siteFooterAccents,
    type: 'select',
  },
  siteFooterVariation: {
    name: 'Footer: Variation (dial)',
    options: ['basic', 'mega'],
    type: 'select',
  },
};

ComponentThemeColorPairings.args = {
  primaryNavPosition: 'left',
  menuVariation: 'basic',
  siteHeaderTheme: 'one',
  siteHeaderAccent: 'one',
  siteHeaderImage: false,
  siteHeaderSiteNameImage: false,
  bannerTheme: 'one',
  ctaButtonTheme: 'one',
  qlTheme: 'one',
  quoteTheme: 'one',
  standaloneQuoteTheme: 'one',
  calloutTheme: 'one',
  tabTheme: 'one',
  siteFooterTheme: 'one',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
};

export const GlobalThemeColorPairings = ({
  heading,
  description,
  image,
  globalTheme,
  calloutTheme,
  ctaButtonTheme,
  qlTheme,
  quoteTheme,
  standaloneQuoteTheme,
  tabTheme,
  bannerTheme,
  primaryNavPosition,
  menuVariation,
  siteHeaderTwig,
  siteHeaderTheme,
  siteHeaderAccent,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteFooterTheme,
  siteFooterAccent,
  siteFooterVariation,
}) =>
  colorGlobalThemePairingTwig({
    ...imageData.responsive_images['16x9'],
    ...colorGlobalThemeData,
    ...colorGlobalThemeTwig,
    ...tabData,
    ...bannerData,
    ...siteHeaderTwig,
    ...siteHeaderThemes,
    ...siteFooterThemes,
    ...utilityNavData,
    ...primaryNavData,
    ...siteHeaderAccents,
    ...siteFooterAccents,
    site_global__theme: globalTheme,
    site_header__site_name: 'Department of Chemistry',
    site_header__site_link: '/',
    site_header__border_thickness: '8',
    site_header__nav_position: primaryNavPosition,
    site_header__menu__variation: menuVariation,
    site_header__theme: siteHeaderTheme,
    site_header__background_image: siteHeaderImage,
    site_header__branding_link: 'https://www.yale.edu',
    site_header__site_name_image: siteHeaderSiteNameImage,
    site_header__accent: siteHeaderAccent,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    quick_links__heading: heading,
    quick_links__description: description,
    quick_links__image: image,
    quick_links__background_color: qlTheme,
    callout__background_color: calloutTheme,
    cta_button__component_theme: ctaButtonTheme,
    quick_links__links: quickLinksData.quick_links__links,
    tabs__theme: tabTheme,
    banner__content__background: bannerTheme,
    pull_quote__accent_theme: quoteTheme,
    standalone_quote__accent_theme: standaloneQuoteTheme,
    site_footer__theme: siteFooterTheme,
    site_footer__accent: siteFooterAccent,
    site_footer__variation: siteFooterVariation,
  });

GlobalThemeColorPairings.argTypes = {
  globalTheme: {
    name: 'Site: Global Theme (lever)',
    options: siteGlobalThemeOptions,
    type: 'select',
  },
  primaryNavPosition: {
    name: 'Header: Navigation Position',
    options: ['left', 'center', 'right'],
    type: 'select',
  },
  menuVariation: {
    name: 'Header: Menu Variation',
    options: ['basic', 'mega', 'focus'],
    type: 'select',
  },
  siteHeaderTheme: {
    name: 'Header: Theme (dial)',
    options: siteHeaderThemeOptions,
    type: 'select',
  },
  siteHeaderAccent: {
    name: 'Header: Accent Color (dial)',
    options: siteHeaderAccents,
    type: 'select',
  },
  siteHeaderImage: {
    name: 'Header: With Image',
    type: 'boolean',
  },
  siteHeaderSiteNameImage: {
    name: 'Header: Site Name Is An Image',
    type: 'boolean',
  },
  bannerTheme: {
    name: 'Banner Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  ctaButtonTheme: {
    name: 'Button CTA Theme (dial)',
    type: 'select',
    options: ctaButtonThemeOptions,
  },
  qlTheme: {
    name: 'Quick Links Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  quoteTheme: {
    name: 'Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  standaloneQuoteTheme: {
    name: 'Standalone Quote Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  calloutTheme: {
    name: 'Callout Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  tabTheme: {
    name: 'Tabs Theme (dial)',
    type: 'select',
    options: ['one', 'two', 'three'],
  },
  siteFooterTheme: {
    name: 'Footer: Theme (dial)',
    options: siteFooterThemeOptions,
    type: 'select',
  },
  siteFooterAccent: {
    name: 'Footer: Accent Color (dial)',
    options: siteFooterAccents,
    type: 'select',
  },
  siteFooterVariation: {
    name: 'Footer: Variation (dial)',
    options: ['basic', 'mega'],
    type: 'select',
  },
};

GlobalThemeColorPairings.args = {
  globalTheme: 'one',
  primaryNavPosition: 'left',
  menuVariation: 'basic',
  siteHeaderTheme: 'one',
  siteHeaderAccent: 'one',
  siteHeaderImage: false,
  siteHeaderSiteNameImage: false,
  bannerTheme: 'one',
  ctaButtonTheme: 'one',
  qlTheme: 'one',
  quoteTheme: 'one',
  standaloneQuoteTheme: 'one',
  calloutTheme: 'one',
  tabTheme: 'one',
  siteFooterTheme: 'one',
  siteFooterAccent: 'one',
  siteFooterVariation: 'basic',
};
