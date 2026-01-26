import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';
import { createPlaygroundIntro } from '../../_storybook/playground-utils';

export default {
  title: 'Organisms/Calendar/Playground',
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

export const Playground = ({ showEvents }) => {
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

    ${calendarTwig({ month: calendarData })}

    <hr class="sb-section__divider">

    <h2>Calendar States for VRT</h2>

    <div class="sb-section__container">
      <h3 class="sb-section__subheading">Calendar with Events</h3>
      <p>Shows calendar with events on multiple dates</p>
      ${calendarTwig({ month: monthData })}
    </div>

    <div class="sb-section__container">
      <h3 class="sb-section__subheading">Calendar without Events</h3>
      <p>Shows empty calendar month</p>
      ${calendarTwig({
        month: monthData.map((week) =>
          week.map((day) => ({
            ...day,
            events: [],
          })),
        ),
      })}
    </div>
  `;
};
