import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Tabs/Visreg',
  parameters: { controls: { disable: true } },
};

// *** VRT: Tabs with All Section Theme Variations ***
export const Visreg = () => {
  const componentTheme = 'one';

  // Render function for tabs variations
  const renderTabs = (theme, idSuffix = '') => `
    <div data-component-has-divider="false" data-component-theme="${theme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary" style="width: 100%">
          ${tabs({
            ...tabData,
            tabs__id: `123${idSuffix}`,
            tabs__theme: componentTheme,
          })}
        </div>
      </div>
    </div>
  `;

  return `
    ${createThemeVariations(
      (theme) => renderTabs(theme, `-${theme}`),
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
