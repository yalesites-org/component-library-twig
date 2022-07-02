import tabs from './tabs.twig';

import tabData from './tabs.yml';

import './tabs';

/**
 * Storybook Definition.
 */
export default { title: 'Molecules/Tabs' };

export const Tabs = () => `
  ${tabs(tabData)}
  ${tabs(tabData)}
`;
