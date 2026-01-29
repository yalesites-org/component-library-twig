import siteHeaderTwig from './yds-site-header.twig';
import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import siteHeaderConfigData from './site-header-config.yml';
import vrtData from '../../_storybook/vrt-combinations.yml';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import './yds-site-header';

import {
  borderThicknessOptions,
  siteHeaderThemes,
  siteHeaderAccents,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeAccentCombinations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Organisms/Site/Header/Visreg',
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
      description: 'Color theme for the site header',
      options: siteHeaderThemes,
      type: 'select',
    },
    siteHeaderAccent: {
      name: 'Header Accent Color (dial)',
      description: 'Accent color for the site header',
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

export const Visreg = ({
  borderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderAccent,
}) => {
  // Base header configuration from extracted YML
  const baseConfig = {
    ...siteHeaderConfigData.baseConfig,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
  };

  // Image configuration for background image
  const imageConfig = imageData.responsive_images['16x9'];

  // Render function for header variations
  const renderHeader = (config) =>
    siteHeaderTwig({
      ...baseConfig,
      ...config,
    });

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different header configurations including theme, accent, nav position, and menu variations.',
    )}

    ${renderHeader({
      ...(siteHeaderImage ? imageConfig : {}),
      site_header__border_thickness: borderThickness,
      site_header__nav_position: primaryNavPosition,
      site_header__theme: siteHeaderTheme,
      site_header__accent: siteHeaderAccent,
      site_header__menu__variation: menuVariation,
      site_header__background_image: siteHeaderImage,
      site_header__site_name_is_image: siteHeaderSiteNameImage,
    })}

    <hr class="sb-vrt-divider" style="margin: 4rem 0; border: none; border-top: 2px solid #ccc;" />

    <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-left: 4px solid #0053A0;">
      <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #0053A0;">Visual Regression Testing</h2>
      <p style="margin: 0; font-size: 0.95rem;">
        The variations below test all header configurations for visual regression testing with Percy.
        These cover theme combinations, navigation positions, menu variations, and image options.
      </p>
    </div>

    ${createThemeAccentCombinations(
      (theme, accent) =>
        renderHeader({
          site_header__border_thickness: '8',
          site_header__nav_position: 'left',
          site_header__theme: theme,
          site_header__accent: accent,
          site_header__menu__variation: 'basic',
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        }),
      vrtData.themeAccentPairs,
      'All Theme & Accent Combinations',
      'Sample combinations of header themes and accent colors for visual regression testing.',
    )}

    ${createVariations(
      (position) =>
        renderHeader({
          site_header__border_thickness: '8',
          site_header__nav_position: position,
          site_header__theme: 'one',
          site_header__accent: 'one',
          site_header__menu__variation: 'basic',
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        }),
      vrtData.navigationPositions,
      'All Navigation Position Variations',
      'Header with different primary navigation positions (left, center, right).',
      'Navigation Position',
    )}

    ${createVariations(
      (variation) =>
        renderHeader({
          site_header__border_thickness: '8',
          site_header__nav_position: 'left',
          site_header__theme: 'one',
          site_header__accent: 'one',
          site_header__menu__variation: variation,
          site_header__background_image: false,
          site_header__site_name_is_image: false,
        }),
      vrtData.menuVariations,
      'All Menu Variations',
      'Header with different menu variations (basic, mega, focus).',
      'Menu Variation',
    )}

    <h2>Image Variations</h2>
    <p>Header with background image and site name as image.</p>

    <div>
      <h3>With Background Image (requires focus menu variation)</h3>
      ${renderHeader({
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

    <div>
      <h3>Site Name as Image (SVG Logo)</h3>
      ${renderHeader({
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
