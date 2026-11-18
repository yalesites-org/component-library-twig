import dayNumberTwig from './yds-day-number.twig';

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
  title: 'Atoms/Event Calendar/Day number/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const states = [
  {
    day_number__number: '1',
    day_number__size: '36',
    day_number__label: 'none 36',
  },
  {
    day_number__number: '2',
    day_number__size: '36',
    day_number__has_events: true,
    day_number__label: 'events 36',
  },
  {
    day_number__number: '3',
    day_number__size: '36',
    day_number__today: true,
    day_number__has_events: true,
    day_number__label: 'today 36',
  },
  {
    day_number__number: '4',
    day_number__size: '36',
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'selected 36',
  },
  {
    day_number__number: '5',
    day_number__size: '36',
    day_number__today: true,
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'todaysel 36',
  },
  {
    day_number__number: '6',
    day_number__size: '36',
    day_number__past: true,
    day_number__has_events: true,
    day_number__label: 'past 36',
  },
  {
    day_number__number: '7',
    day_number__size: '36',
    day_number__other_month: true,
    day_number__label: 'other 36',
  },
  {
    day_number__number: '8',
    day_number__size: '32',
    day_number__label: 'none 32',
  },
  {
    day_number__number: '9',
    day_number__size: '32',
    day_number__has_events: true,
    day_number__label: 'events 32',
  },
  {
    day_number__number: '10',
    day_number__size: '32',
    day_number__today: true,
    day_number__has_events: true,
    day_number__label: 'today 32',
  },
  {
    day_number__number: '11',
    day_number__size: '32',
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'selected 32',
  },
  {
    day_number__number: '12',
    day_number__size: '32',
    day_number__today: true,
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'todaysel 32',
  },
  {
    day_number__number: '13',
    day_number__size: '32',
    day_number__past: true,
    day_number__has_events: true,
    day_number__label: 'past 32',
  },
  {
    day_number__number: '14',
    day_number__size: '32',
    day_number__other_month: true,
    day_number__label: 'other 32',
  },
];

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--size-spacing-5); padding: var(--size-spacing-5)">
      ${states.map((data) => dayNumberTwig(data)).join('')}
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
