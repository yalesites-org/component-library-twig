import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

export default {
  title: 'Organisms/Tabs',
  tags: ['!dev'],
};

export const Interactive = {
  render: () => `
    <div data-component-has-divider="false" data-section-theme="default" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary" style="width: 100%">
          ${tabs({
            ...tabData,
            tabs__id: '123',
          })}
        </div>
      </div>
    </div>
  `,
};
