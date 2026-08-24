import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import {
  sectionThemes,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Organisms/Calendar/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const renderCalendarVariations = () =>
    createVariations(
      (hasEvents) =>
        calendarTwig({
          month: hasEvents
            ? monthData
            : monthData.map((week) =>
                week.map((day) => ({
                  ...day,
                  events: [],
                })),
              ),
        }),
      [true, false],
      'All Calendar Variations',
      '',
      'Event State',
      (hasEvents) =>
        hasEvents ? 'Calendar with Events' : 'Calendar without Events',
    );

  return createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderCalendarVariations(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    '',
    'Section Theme',
  );
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
