import tabs from './yds-tabs.twig';
import tabData from './tabs.yml';
import './yds-tabs';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
  componentThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createThemeVariations,
  createSectionWrapper,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Organisms/Tabs/Visreg',
  parameters: { controls: { disable: true } },
};

// *** VRT: Tabs with All Section Theme Variations ***
const renderGlobalTheme = () => {
  const renderTabs = (dialTheme, idSuffix = '') =>
    tabs({
      ...tabData,
      tabs__id: `123${idSuffix}`,
      tabs__theme: dialTheme,
    });

  return `
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
    `;
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
