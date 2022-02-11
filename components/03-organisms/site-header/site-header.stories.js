import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import siteHeaderTwig from './site-header.twig';
import siteHeaderExamples from './_site-header--examples.twig';

const colorPairingsData = { themes: tokens['component-themes'] };

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site',
  parameters: {
    layout: 'fullscreen',
  },
};

export const header = () =>
  siteHeaderTwig({ site_name: 'Department of Chemistry' });

export const headerExamples = () =>
  siteHeaderExamples({
    ...colorPairingsData,
    site_name: 'Department of Chemistry',
  });
