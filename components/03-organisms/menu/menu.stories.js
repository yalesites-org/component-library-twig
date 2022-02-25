import breadcrumbsTwig from './breadcrumbs/breadcrumbs.twig';

import breadcrumbsData from './breadcrumbs/breadcrumbs.yml';

import './breadcrumbs/breadcrumbs';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Menus' };

export const Breadcrumbs = () => breadcrumbsTwig(breadcrumbsData);
