import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Tabs',
  argTypes: {
    componentThemeColor: {
      name: 'Component Theme',
      type: 'select',
      options: ['one', 'two', 'three'],
      control: { type: 'select' },
    },
    layoutThemeColor: {
      name: 'Layout Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
      control: { type: 'select' },
    },
  },
  args: {
    componentThemeColor: 'one',
    layoutThemeColor: 'default',
  },
};

export const Tabs = ({ componentThemeColor, layoutThemeColor }) => `
  ${tabs({ ...tabData, tabs__theme: componentThemeColor })}
  <div data-component-has-divider="false" data-component-theme="${layoutThemeColor}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h2>Tabs Inside Layout</h2>
        ${tabs({
          ...tabData,
          tabs__id: '123',
          tabs__theme: componentThemeColor,
        })}
      </div>
    </div>
  </div>
`;
