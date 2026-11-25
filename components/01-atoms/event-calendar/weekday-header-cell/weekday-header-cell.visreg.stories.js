import weekdayHeaderCellTwig from './yds-weekday-header-cell.twig';

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
 * Visual regression: both alignments, side by side, on each section theme. Each
 * cell gets a width, the way the grid sets one, so the alignment shows.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Event Calendar/Weekday header cell/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const states = ['start', 'center'].map((alignment) => ({
  weekday_header_cell__text: 'Mon',
  weekday_header_cell__label: 'Monday',
  weekday_header_cell__alignment: alignment,
}));

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--size-spacing-5); padding: var(--size-spacing-5)">
      ${states
        .map(
          (data) =>
            `<div style="width: var(--size-spacing-11)">${weekdayHeaderCellTwig(
              data,
            )}</div>`,
        )
        .join('')}
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
