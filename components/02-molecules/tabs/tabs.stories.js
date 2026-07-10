import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import componentProps from './tabs-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

export default {
  title: 'Organisms/Tabs',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Interactive = {
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
