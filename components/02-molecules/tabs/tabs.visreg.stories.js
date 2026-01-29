import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import {
  componentThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Tabs/Visreg',
  argTypes: {
    componentTheme: {
      name: 'Tabs Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      type: 'select',
      options: componentThemes,
    },
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
  },
  args: {
    componentTheme: 'one',
    sectionTheme: 'default',
  },
};

// *** VRT: Tabs with All Section Theme Variations ***
export const Visreg = ({ componentTheme, sectionTheme }) => {
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
    ${createPlaygroundIntro(
      'Use the Storybook controls to see the tabs implement the available variations and colors.',
    )}

    ${renderTabs(sectionTheme)}

    ${createThemeVariations(
      (theme) => renderTabs(theme, `-${theme}`),
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
