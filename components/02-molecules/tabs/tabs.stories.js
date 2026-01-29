import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import { componentThemes } from '../../_storybook/theme-constants';

export default {
  title: 'Molecules/Tabs',
  tags: ['!dev'],
  argTypes: {
    tabs__theme: {
      name: 'Tabs Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      control: 'select',
      options: componentThemes,
    },
  },
  args: {
    tabs__theme: 'one',
  },
};

export const Interactive = {
  argTypes: {
    tabs__theme: {
      name: 'Tabs Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      control: 'select',
      options: componentThemes,
    },
  },
  args: {
    tabsTheme: 'one',
  },
  render: ({ tabsTheme }) => `
    <div data-component-has-divider="false" data-component-theme="default" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary" style="width: 100%">
          ${tabs({
            ...tabData,
            tabs__id: '123',
            tabs__theme: tabsTheme,
          })}
        </div>
      </div>
    </div>
  `,
};
