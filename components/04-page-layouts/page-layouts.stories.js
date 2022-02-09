import fullWidthTwig from './full-width.twig';

/**
 * Storybook Definition.
 */
export default {
  title: 'Page Layouts/Page Layouts',
  parameters: {
    layout: 'fullscreen',
  },
};

export const fullWidth = () => fullWidthTwig();
