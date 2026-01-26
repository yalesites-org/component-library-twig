import tokens from '@yalesites-org/tokens/build/json/tokens.json';
import siteHeaderTwig from './yds-site-header.twig';
import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import './yds-site-header';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);
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

export default {
  title: 'Organisms/Site/Header/Playground',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    borderThickness: {
      name: 'Navigation Border Thickness',
      options: borderThicknessOptions,
      type: 'select',
    },
    primaryNavPosition: {
      name: 'Navigation Position',
      options: ['left', 'center', 'right'],
      type: 'select',
    },
    menuVariation: {
      name: 'Menu Variation (focus required for background image)',
      options: ['basic', 'mega', 'focus'],
      type: 'select',
      description: 'Background image only displays with "focus" variation',
    },
    siteHeaderTheme: {
      name: 'Header Theme (dial)',
      options: siteHeaderThemeOptions,
      type: 'select',
    },
    siteHeaderAccent: {
      name: 'Header Accent Color (dial)',
      options: siteHeaderAccents,
      type: 'select',
    },
    siteHeaderImage: {
      name: 'With Background Image (requires focus menu)',
      type: 'boolean',
      description: 'Only works when Menu Variation is set to "focus"',
    },
    siteHeaderSiteNameImage: {
      name: 'Site Name is an Image',
      type: 'boolean',
    },
  },
  args: {
    borderThickness: '8',
    primaryNavPosition: 'left',
    menuVariation: 'basic',
    siteHeaderTheme: 'one',
    siteHeaderAccent: 'one',
    siteHeaderImage: false,
    siteHeaderSiteNameImage: false,
  },
};

export const Playground = ({
  borderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderAccent,
}) => {
  // Base header configuration
  const baseConfig = {
    site_name: 'Department of Chemistry',
    site_header__branding_name: 'Yale University',
    site_header__branding_link: 'https://www.yale.edu',
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
  };

  // Image configuration for background image
  const imageConfig = imageData.responsive_images['16x9'];

  // Sample theme and accent combinations for VRT
  const themeCombinations = [
    { theme: 'one', accent: 'one' },
    { theme: 'one', accent: 'five' },
    { theme: 'two', accent: 'two' },
    { theme: 'three', accent: 'three' },
  ];

  const navPositions = ['left', 'center', 'right'];
  const menuVariations = ['basic', 'mega', 'focus'];

  return `
    <h2 style="padding: 1rem;">Interactive Site Header Playground</h2>
    <p style="padding: 0 1rem 1rem;">Use the controls to test different header configurations including theme, accent, nav position, and menu variations.</p>

    ${siteHeaderTwig({
      ...baseConfig,
      ...(siteHeaderImage ? imageConfig : {}),
      site_header__border_thickness: borderThickness,
      site_header__nav_position: primaryNavPosition,
      site_header__theme: siteHeaderTheme,
      site_header__accent: siteHeaderAccent,
      site_header__menu__variation: menuVariation,
      site_header__background_image: siteHeaderImage,
      site_header__site_name_is_image: siteHeaderSiteNameImage,
    })}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Theme & Accent Combinations</h2>
    <p style="padding: 0 1rem 1rem;">Sample combinations of header themes and accent colors for visual regression testing.</p>

    ${themeCombinations
      .map(
        ({ theme, accent }) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Theme: ${theme}, Accent: ${accent}</h3>
        ${siteHeaderTwig({
          ...baseConfig,
          site_header__border_thickness: '8',
          site_header__nav_position: 'left',
          site_header__theme: theme,
          site_header__accent: accent,
          site_header__menu__variation: 'basic',
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        })}
      </div>
    `,
      )
      .join('')}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Navigation Positions</h2>
    <p style="padding: 0 1rem 1rem;">Header with different primary navigation positions (left, center, right).</p>

    ${navPositions
      .map(
        (position) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Navigation Position: ${position}</h3>
        ${siteHeaderTwig({
          ...baseConfig,
          site_header__border_thickness: '8',
          site_header__nav_position: position,
          site_header__theme: 'one',
          site_header__accent: 'one',
          site_header__menu__variation: 'basic',
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        })}
      </div>
    `,
      )
      .join('')}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Menu Variations</h2>
    <p style="padding: 0 1rem 1rem;">Header with different menu variations (basic, mega, focus).</p>

    ${menuVariations
      .map(
        (variation) => `
      <div style="margin-bottom: 3rem;">
        <h3 style="padding: 1rem; background: #f0f0f0;">Menu Variation: ${variation}</h3>
        ${siteHeaderTwig({
          ...baseConfig,
          site_header__border_thickness: '8',
          site_header__nav_position: 'left',
          site_header__theme: 'one',
          site_header__accent: 'one',
          site_header__menu__variation: variation,
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        })}
      </div>
    `,
      )
      .join('')}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2 style="padding: 1rem;">VRT: Image Variations</h2>
    <p style="padding: 0 1rem 1rem;">Header with background image and site name as image.</p>

    <div style="margin-bottom: 3rem;">
      <h3 style="padding: 1rem; background: #f0f0f0;">With Background Image (requires focus menu variation)</h3>
      ${siteHeaderTwig({
        ...baseConfig,
        ...imageConfig,
        site_header__border_thickness: '8',
        site_header__nav_position: 'left',
        site_header__theme: 'one',
        site_header__accent: 'one',
        site_header__menu__variation: 'focus',
        site_header__background_image: true,
        site_header__site_name_is_image: false,
      })}
    </div>

    <div style="margin-bottom: 3rem;">
      <h3 style="padding: 1rem; background: #f0f0f0;">Site Name as Image (SVG Logo)</h3>
      ${siteHeaderTwig({
        ...baseConfig,
        site_header__border_thickness: '8',
        site_header__nav_position: 'left',
        site_header__theme: 'one',
        site_header__accent: 'one',
        site_header__menu__variation: 'basic',
        site_header__background_image: false,
        site_header__site_name_is_image: true,
      })}
    </div>
  `;
};
