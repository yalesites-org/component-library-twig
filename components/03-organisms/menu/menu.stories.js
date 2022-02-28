// Markup.
import utilityNavTwig from './utility-nav/utility-nav.twig';
import breadcrumbsTwig from './breadcrumbs/breadcrumbs.twig';

// Data.
import utilityNavData from './utility-nav/utility-nav.yml';
import breadcrumbsData from './breadcrumbs/breadcrumbs.yml';

// JavaScript.
import '../../02-molecules/menu/menu-toggle/menu-toggle';
import './breadcrumbs/breadcrumbs';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menus' };

export const UtilityNav = () => utilityNavTwig(utilityNavData);

export const Breadcrumbs = () => breadcrumbsTwig(breadcrumbsData);
