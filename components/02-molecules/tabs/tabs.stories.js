import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

export default {
  title: 'Molecules/Tabs',
};

export const Tabs = () => `
  ${tabs({ ...tabData })}
`;
