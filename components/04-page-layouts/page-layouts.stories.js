import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import fullWidthTwig from './full-width.twig';

const borderThicknessOptions = Object.keys(tokens.border.thickness);
const primaryNavPositions = Object.keys(tokens.layout['flex-position']);
const siteHeaderThemeOptions = Object.keys(tokens['site-header-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Layouts/Page Layouts',
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
      options: primaryNavPositions,
      type: 'select',
      defaultValue: 'right',
    },
    siteHeaderTheme: {
      options: siteHeaderThemeOptions,
      type: 'select',
      defaultValue: 'white',
    },
  },
};

export const fullWidth = ({
  borderThickness,
  primaryNavPosition,
  siteHeaderTheme,
}) =>
  fullWidthTwig({
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
    site_header__nav_position: primaryNavPosition,
    site_header__theme: siteHeaderTheme,
  });
