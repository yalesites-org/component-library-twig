import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import {
  createPlaygroundIntro,
  createVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Organisms/Calendar/Visreg',
  argTypes: {
    showEvents: {
      name: 'Show Events',
      type: 'boolean',
      description: 'Toggle event display',
    },
  },
  args: {
    showEvents: true,
  },
};

export const Visreg = ({ showEvents }) => {
  // Create month data with or without events
  const calendarData = showEvents
    ? monthData
    : monthData.map((week) =>
        week.map((day) => ({
          ...day,
          events: [],
        })),
      );

  return `
    ${createPlaygroundIntro(
      'Use the controls to toggle event visibility. The calendar shows month navigation and event modals.',
    )}

    <div class="wrap-for-screenshot">
      ${calendarTwig({ month: calendarData })}
    </div>

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
