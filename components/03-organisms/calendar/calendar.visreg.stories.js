import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import { createVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Organisms/Calendar/Visreg',
  parameters: {
    controls: { disable: true },
  },
};

export const Visreg = () => {
  return `
    ${createVariations(
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
      'Event State',
      (hasEvents) =>
        hasEvents ? 'Calendar with Events' : 'Calendar without Events',
    )}
  `;
};
