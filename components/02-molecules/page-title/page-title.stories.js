// Twig templates
import pageTitleTwig from './page-title.twig';

// Data files
// import textData from './text/text.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Page Title',
  argTypes: {
    meta: {
      name: 'Meta',
      type: 'string',
      defaultValue:
        '<span>By Charlyn Paradis</span><span>January 25, 2022</span>',
    },
  },
};

export const PageTitle = ({ meta }) =>
  pageTitleTwig({
    page_title__heading: 'Davis Team Project Wins Award for Research',
    page_title__meta: meta,
  });
