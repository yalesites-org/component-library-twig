import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteHeaderTwig from './site-header.twig';
import siteHeaderExamples from './_site-header--examples.twig';

const colorPairingsData = { themes: tokens['component-themes'] };
const borderThicknessOptions = Object.keys(tokens.border.thickness);

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
  },
};

export const header = ({ borderThickness }) =>
  siteHeaderTwig({
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
  });

export const headerExamples = ({ borderThickness }) =>
  siteHeaderExamples({
    ...colorPairingsData,
    site_name: 'Department of Chemistry',
    site_header__border_thickness: borderThickness,
  });
