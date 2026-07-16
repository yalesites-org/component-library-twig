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
  tags: ['visreg'],
  title: 'Organisms/Tabs/Visreg',
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
    () => `
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderTabs('one', `-${theme}`), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      )}
      ${createThemeVariations(
        (theme) =>
          createSectionWrapper('one', renderTabs(theme, `-${theme}`), {
            width: 'site',
            primaryWidth: '100%',
          }),
        componentThemes,
        'All Tabs Theme Variations',
        '',
        'Tabs Theme',
      )}
    `,
    globalThemes,
    'All Global Theme Variations',
  );
};
