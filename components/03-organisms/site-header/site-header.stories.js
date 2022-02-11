import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteHeaderTwig from './site-header.twig';
import siteHeaderExamples from './_site-header--examples.twig';

const colorPairingsData = { themes: tokens['component-themes'] };
const borderThicknessOptions = Object.keys(tokens.border.thickness);
const primaryNavPositions = Object.keys(tokens.layout['flex-position']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site',
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
  },
};

export const header = ({ borderThickness, primaryNavPosition }) =>
  siteHeaderTwig({
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
    site_header__nav_position: primaryNavPosition,
  });

export const headerExamples = ({ borderThickness, primaryNavPosition }) =>
  siteHeaderExamples({
    ...colorPairingsData,
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
    site_header__nav_position: primaryNavPosition,
  });
