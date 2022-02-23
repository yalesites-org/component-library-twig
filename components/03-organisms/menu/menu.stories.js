import utilityNavTwig from './utility-nav/utility-nav.twig';

import utilityNavData from './utility-nav/utility-nav.yml';

import '../../02-molecules/menu/menu-toggle/menu-toggle';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menus' };

export const UtilityNav = () => utilityNavTwig(utilityNavData);
