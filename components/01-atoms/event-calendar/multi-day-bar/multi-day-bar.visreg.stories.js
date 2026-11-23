import multiDayBarTwig from './yds-multi-day-bar.twig';

import '../../../00-tokens/effects/yds-animate';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Visual regression: every state, side by side, on each section theme.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Event Calendar/Multi-day bar/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const states = [
  {},
  { multi_day_bar__pointed_at: true },
  { multi_day_bar__past: true },
].map((data) => ({
  multi_day_bar__title: 'Workshop in arithmetic geometry',
  multi_day_bar__date_range: 'Oct 22–24',
  multi_day_bar__label_range: 'October 22 to 24',
  ...data,
}));

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="display: grid; grid-template-columns: 1fr; gap: var(--size-spacing-3); padding: var(--size-spacing-5)">
      ${states.map((data) => `<div>${multiDayBarTwig(data)}</div>`).join('')}
    </div>`,
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderStates,
    sectionThemes,
    'All Section Theme Variations',
    'Every state on each section theme, for visual regression testing.',
    'Section Theme',
  );

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
