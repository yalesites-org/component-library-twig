import officeHoursTwig from './yds-office-hours.twig';
import data from './office-hours.yml';
import { sectionThemes } from '../../_storybook/theme-constants';
import { createSectionWrapper } from '../../_storybook/playground-utils';

import './yds-office-hours';

const days = (...labels) =>
  data.office_hours__days.filter((day) => labels.includes(day.label));

/**
 * Each option is a schedule an editor can enter in Drupal. Every option sets
 * the props the old per-state stories set.
 */
const schedules = {
  'Full week': { office_hours__upcoming: data.office_hours__upcoming },
  'Normal hours': { office_hours__days: days('Sunday', 'Wednesday') },
  'Two slots': { office_hours__days: days('Thursday') },
  'Closed day': { office_hours__days: days('Monday', 'Wednesday') },
  'Open all day': { office_hours__days: days('Saturday', 'Sunday') },
  Comment: { office_hours__days: days('Thursday', 'Wednesday') },
  'Today row': { office_hours__days: days('Monday', 'Tuesday', 'Wednesday') },
  'Exception row': { office_hours__days: days('Thursday', 'Friday') },
  'Upcoming changes': {
    office_hours__days: days('Tuesday', 'Wednesday'),
    office_hours__upcoming: data.office_hours__upcoming,
  },
  // The status line is computed from each row's weekday and the current time,
  // so this option changes with the clock.
  'Live status': {
    office_hours__days: data.office_hours__days.map((day, weekday) => ({
      ...day,
      today: false,
      weekday,
    })),
    office_hours__timezone: 'America/New_York',
  },
  // The public page renders nothing; Layout Builder passes this placeholder.
  Empty: {
    office_hours__days: [],
    office_hours__empty_message: 'Hours: no days filled in yet.',
  },
};

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Office Hours',
  argTypes: {
    sectionTheme: {
      name: 'Section theme',
      options: sectionThemes,
      control: 'select',
    },
    componentTheme: {
      name: 'Theme (block dial)',
      options: ['default', 'one', 'two', 'three', 'four', 'five', 'six'],
      control: 'select',
    },
    width: {
      name: 'Block width (px)',
      control: { type: 'number', min: 280, max: 1200 },
    },
    sampleSchedule: {
      name: 'Sample schedule',
      options: Object.keys(schedules),
      control: 'select',
    },
  },
  args: {
    sectionTheme: 'default',
    componentTheme: 'default',
    width: 760,
    sampleSchedule: 'Full week',
  },
};

const render = (props, { sectionTheme, componentTheme, width }) =>
  createSectionWrapper(
    sectionTheme,
    `<div style="max-width: ${width}px">${officeHoursTwig({
      ...data,
      office_hours__upcoming: [],
      office_hours__theme: componentTheme,
      ...props,
    })}</div>`,
  );

/**
 * One story for every state of the table. Pick the days with Sample schedule.
 */
export const Default = (args) => render(schedules[args.sampleSchedule], args);

// The stories below exist only so the docs page can show a fixed state in a
// Canvas. They are hidden from the sidebar.
const fixed = (schedule) => (args) => render(schedules[schedule], args);

export const FullWeek = fixed('Full week');
FullWeek.tags = ['!dev'];

export const LiveStatus = fixed('Live status');
LiveStatus.tags = ['!dev'];

export const ExceptionRow = fixed('Exception row');
ExceptionRow.tags = ['!dev'];

export const UpcomingChanges = fixed('Upcoming changes');
UpcomingChanges.tags = ['!dev'];

export const Empty = fixed('Empty');
Empty.tags = ['!dev'];

/**
 * Under a 340px content box each row stacks: day, hours, then the note.
 */
export const Narrow = fixed('Full week');
Narrow.tags = ['!dev'];
Narrow.args = { width: 305 };
