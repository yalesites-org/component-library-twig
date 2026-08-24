import siteHeaderTwig from './yds-site-header.twig';
import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';
import imageData from '../../01-atoms/images/image/image.yml';
import siteHeaderConfigData from './site-header-config.yml';
import vrtData from '../../_storybook/vrt-combinations.yml';
import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';
import './yds-site-header';

import {
  exampleSiteNameImageSvg,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeAccentCombinations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Organisms/Global Elements/Header/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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
      ${createThemeAccentCombinations(
        (theme, accent) =>
          renderHeader({
            site_header__border_thickness: '8',
            site_header__nav_position: 'left',
            site_header__theme: theme,
            site_header__accent: accent,
            site_header__menu__variation: 'basic',
            site_header__background_image: false,
            site_header__site_name_image: false,
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
            site_header__site_name_image: false,
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
            site_header__site_name_image: false,
          }),
        vrtData.menuVariations,
        'All Menu Variations',
        'Header with different menu variations (basic, mega, focus).',
        'Menu Variation',
      )}

      ${createVariations(
        (variation) =>
          variation === 'background-image'
            ? renderHeader({
                ...imageConfig,
                site_header__border_thickness: '8',
                site_header__nav_position: 'left',
                site_header__theme: 'one',
                site_header__accent: 'one',
                site_header__menu__variation: 'focus',
                site_header__background_image: true,
                site_header__site_name_image: false,
              })
            : renderHeader({
                site_header__border_thickness: '8',
                site_header__nav_position: 'left',
                site_header__theme: 'one',
                site_header__accent: 'one',
                site_header__menu__variation: 'basic',
                site_header__background_image: false,
                site_header__site_name_image: exampleSiteNameImageSvg,
              }),
        ['background-image', 'site-name-image'],
        'Image Variations',
        '',
        'Image Variation',
      )}
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
