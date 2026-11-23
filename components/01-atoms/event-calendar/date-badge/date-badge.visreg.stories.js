import dateBadgeTwig from './yds-date-badge.twig';

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
  title: 'Atoms/Event Calendar/Date badge/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const single = {
  date_badge__weekday: 'Tue',
  date_badge__date: '27',
  date_badge__label: 'Tuesday, October 27',
};
const range = {
  date_badge__range: true,
  date_badge__weekday: 'Thu–Sat',
  date_badge__date: '15–17',
  date_badge__label: 'Thursday, October 15 to Saturday, October 17',
};
const states = [single, range].flatMap((base) => [
  base,
  { ...base, date_badge__today: true },
  { ...base, date_badge__past: true },
]);

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--size-spacing-3); padding: var(--size-spacing-5)">
      ${states.map((data) => dateBadgeTwig(data)).join('')}
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
