import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

export default {
  title: 'Molecules/Tabs/Playground',
  argTypes: {
    componentTheme: {
      name: 'Component Theme',
      type: 'select',
      options: ['one', 'two', 'three'],
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
  },
  args: {
    componentTheme: 'one',
    sectionTheme: 'default',
  },
};

export const Playground = ({ componentTheme, sectionTheme }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <div data-component-has-divider="false" data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary" style="width: 100%">
        <h2>Interactive Playground</h2>
        <p>Use the StoryBook controls to see the tabs implement the available variations and colors.</p>
        ${tabs({
          ...tabData,
          tabs__id: '123',
          tabs__theme: componentTheme,
        })}
      </div>
    </div>
  </div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary" style="width: 100%">
          <h3>Section Theme: ${theme}</h3>
          ${tabs({
            ...tabData,
            tabs__id: `123-${theme}`,
            tabs__theme: componentTheme,
          })}
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
