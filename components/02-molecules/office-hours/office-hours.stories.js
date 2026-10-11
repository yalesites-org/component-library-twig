import officeHoursTwig from './yds-office-hours.twig';
import data from './office-hours.yml';
import { sectionThemes } from '../../_storybook/theme-constants';
import { createSectionWrapper } from '../../_storybook/playground-utils';

import './yds-office-hours';

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
    width: {
      name: 'Block width (px)',
      control: { type: 'number', min: 280, max: 1200 },
    },
  },
  args: {
    sectionTheme: 'default',
    width: 760,
  },
};

const days = (...labels) =>
  data.office_hours__days.filter((day) => labels.includes(day.label));

const render = (props, { sectionTheme, width }) =>
  createSectionWrapper(
    sectionTheme,
    `<div style="max-width: ${width}px">${officeHoursTwig({
      ...data,
      office_hours__upcoming: [],
      ...props,
    })}</div>`,
  );

export const FullWeek = (args) =>
  render({ office_hours__upcoming: data.office_hours__upcoming }, args);

export const NormalHours = (args) =>
  render({ office_hours__days: days('Sunday', 'Wednesday') }, args);

export const TwoSlots = (args) =>
  render({ office_hours__days: days('Thursday') }, args);

export const ClosedDay = (args) =>
  render({ office_hours__days: days('Monday', 'Wednesday') }, args);

export const OpenAllDay = (args) =>
  render({ office_hours__days: days('Saturday', 'Sunday') }, args);

export const Comment = (args) =>
  render({ office_hours__days: days('Thursday', 'Wednesday') }, args);

export const TodayRow = (args) =>
  render({ office_hours__days: days('Monday', 'Tuesday', 'Wednesday') }, args);

export const ExceptionRow = (args) =>
  render({ office_hours__days: days('Thursday', 'Friday') }, args);

export const UpcomingChanges = (args) =>
  render(
    {
      office_hours__days: days('Tuesday', 'Wednesday'),
      office_hours__upcoming: data.office_hours__upcoming,
    },
    args,
  );

/**
 * Under a 340px content box each row stacks: day, hours, then the note.
 */
export const Narrow = (args) =>
  render({ office_hours__upcoming: data.office_hours__upcoming }, args);
Narrow.args = { width: 305 };

/**
 * The status line is computed by the behavior from each row's weekday and the
 * current time, so this story changes with the clock.
 */
export const LiveStatus = (args) =>
  render(
    {
      office_hours__days: data.office_hours__days.map((day, weekday) => ({
        ...day,
        today: false,
        weekday,
      })),
      office_hours__timezone: 'America/New_York',
    },
    args,
  );

/**
 * Nothing entered: the public page renders nothing at all. Layout Builder
 * passes a placeholder message instead.
 */
export const Empty = (args) =>
  render(
    {
      office_hours__days: [],
      office_hours__empty_message: 'Hours: no days filled in yet.',
    },
    args,
  );
