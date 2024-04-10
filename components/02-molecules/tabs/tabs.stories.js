import tabs from './yds-tabs.twig';

import tabData from './tabs.yml';

import './yds-tabs';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Tabs',
  argTypes: {
    width: {
      name: 'Component width',
      options: ['site', 'content'],
      type: 'select',
      defaultValue: 'site',
    },
    alignment: {
      name: 'Component alignment',
      options: ['left', 'center'],
      type: 'select',
      defaultValue: 'center',
    },
  },
};

export const Tabs = ({ width, alignment }) => `
<div class="component-wrapper" data-component-width="${width}" data-component-alignment="${alignment}">
  ${tabs(tabData)}
  ${tabs({ ...tabData, tabs__id: '123' })}
</div>
`;
