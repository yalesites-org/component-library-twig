import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import {
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  title: 'Molecules/Tabs/Visreg',
  parameters: { controls: { disable: true } },
};

// *** VRT: Tabs with All Section Theme Variations ***
export const Visreg = () => {
  const renderTabs = (dialTheme, idSuffix = '') =>
    tabs({
      ...tabData,
      tabs__id: `123${idSuffix}`,
      tabs__theme: dialTheme,
    });

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (sectionTheme) =>
          createSectionWrapper(
            sectionTheme,
            componentThemes
              .map(
                (componentTheme) => `
                  <div class="sb-section__container">
                    <h3 class="sb-section__subheading">Tabs Theme: ${componentTheme}</h3>
                    ${renderTabs(
                      componentTheme,
                      `-${sectionTheme}-${componentTheme}`,
                    )}
                  </div>
                `,
              )
              .join(''),
            { width: 'site', primaryWidth: '100%' },
          ),
        sectionThemes,
        'All Section × Tabs Theme Combinations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
