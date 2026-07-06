import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import { sectionThemes, globalThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
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

export const Visreg = () => {
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

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderCalendarVariations(), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
