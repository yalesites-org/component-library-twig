import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteHeaderTwig from './yds-site-header.twig';
import siteHeaderExamples from './_site-header--examples.twig';

import utilityNavData from '../menu/utility-nav/utility-nav.yml';
import primaryNavData from '../menu/primary-nav/primary-nav.yml';

import '../../02-molecules/menu/menu-toggle/yds-menu-toggle';

// JavaScript to handle size
import './yds-site-header';

const siteHeaderThemes = { themes: tokens['site-header-themes'] };
const siteGlobalThemes = { themes: tokens['global-themes'] };
const borderThicknessOptions = Object.keys(tokens.border.thickness);
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

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
  title: 'Organisms/Site/Header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    borderThickness: {
      options: borderThicknessOptions,
      type: 'select',
      defaultValue: '8',
    },
    primaryNavPosition: {
      options: ['left', 'center', 'right'],
      type: 'select',
      defaultValue: 'left',
    },
    menuVariation: {
      name: 'Menu Variation',
      options: ['basic', 'mega'],
      type: 'select',
      defaultValue: 'basic',
    },
  },
};

export const Header = ({
  borderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  menuVariation,
}) =>
  siteHeaderTwig({
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
    site_header__menu__variation: menuVariation,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
  });

Header.argTypes = {
  siteHeaderTheme: {
    options: siteHeaderThemeOptions,
    type: 'select',
    defaultValue: 'one',
  },
};

export const HeaderExamples = ({
  borderThickness,
  primaryNavPosition,
  menuVariation,
  globalTheme,
}) =>
  siteHeaderExamples({
    ...siteGlobalThemes,
    ...siteHeaderThemes,
    site_name: 'Department of Chemistry',
    site_global__theme: globalTheme,
    site_header__border_thickness: borderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__menu__variation: menuVariation,
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
  });

HeaderExamples.argTypes = {
  globalTheme: {
    name: 'Global Theme (lever)',
    options: globalThemeLabels.themes,
    type: 'select',
    defaultValue: 'one',
  },
};
