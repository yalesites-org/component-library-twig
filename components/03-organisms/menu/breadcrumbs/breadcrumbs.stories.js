// Markup.
import breadcrumbsTwig from './yds-breadcrumbs.twig';

// Data.
import breadcrumbsData from './breadcrumbs.yml';

// JavaScript.
import './yds-breadcrumbs';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Menu/Breadcrumbs',
  tags: ['!dev'],
};

export const Breadcrumbs = () => breadcrumbsTwig({ ...breadcrumbsData });
