// Twig templates
import pageTitleTwig from './page-title.twig';

// Data files
// import textData from './text/text.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Page Title' };

export const PageTitle = () =>
  pageTitleTwig({
    page_title__heading: 'Davis Team Project Wins Award for Research',
    page_title__meta: 'By Charlyn Paradis | January 25, 2022',
  });
