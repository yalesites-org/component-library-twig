// Markup.
import breadcrumbsTwig from './breadcrumbs.twig';

// Data.
import breadcrumbsData from './breadcrumbs.yml';

// JavaScript.
// import '../../../02-molecules/menu/menu-toggle/menu-toggle';
import './breadcrumbs';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menu/Breadcrumbs' };

export const Breadcrumbs = () => breadcrumbsTwig(breadcrumbsData);
