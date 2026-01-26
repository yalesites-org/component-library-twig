import './yds-calendar';
import calendarTwig from './yds-calendar.twig';
import monthData from './calendar.yml';

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
    <h2>Interactive Calendar Playground</h2>
    <p>Use the controls to toggle event visibility. The calendar shows month navigation and event modals.</p>

    ${calendarTwig({ month: calendarData })}

    <hr style="margin: 3rem 0; border: 1px solid #ccc;">

    <h2>Calendar States for VRT</h2>

    <div style="margin-bottom: 3rem;">
      <h3>Calendar with Events</h3>
      <p>Shows calendar with events on multiple dates</p>
      ${calendarTwig({ month: monthData })}
    </div>

    <div style="margin-bottom: 3rem;">
      <h3>Calendar without Events</h3>
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
