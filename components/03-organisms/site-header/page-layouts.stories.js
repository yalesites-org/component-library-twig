import siteHeaderTwig from './site-header.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Site',
  parameters: {
    layout: 'fullscreen',
  },
};

export const header = () => siteHeaderTwig();
