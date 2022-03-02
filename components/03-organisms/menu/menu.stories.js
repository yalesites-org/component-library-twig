// Markup.
import breadcrumbsTwig from './breadcrumbs/breadcrumbs.twig';

// Data.
import breadcrumbsData from './breadcrumbs/breadcrumbs.yml';

// JavaScript.
import './breadcrumbs/breadcrumbs';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menus' };

export const Breadcrumbs = () => breadcrumbsTwig(breadcrumbsData);
