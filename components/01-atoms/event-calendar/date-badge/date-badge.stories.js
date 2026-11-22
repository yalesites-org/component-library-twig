import dateBadgeTwig from './yds-date-badge.twig';
import componentProps from './date-badge-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * A story for each state in both single-day and range form, plus a Playground.
 */
export default {
  title: 'Atoms/Event Calendar/Date badge',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

const single = {
  date_badge__weekday: 'Tue',
  date_badge__date: '27',
  date_badge__label: 'Tuesday, October 27',
};

const range = {
  date_badge__range: true,
  date_badge__weekday: 'Thu–Sat',
  date_badge__date: '15–17',
  date_badge__label: 'Thursday, October 15 to Saturday, October 17',
};

const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${dateBadgeTwig(data)}</div>`;

export const Playground = (args) =>
  render({
    date_badge__weekday: args.weekday,
    date_badge__date: args.date,
    date_badge__label: args.label,
    date_badge__range: args.range,
    date_badge__today: args.today,
    date_badge__past: args.past,
  });

export const Upcoming = () => render(single);
export const UpcomingRange = () => render(range);
export const Today = () => render({ ...single, date_badge__today: true });
export const TodayRange = () => render({ ...range, date_badge__today: true });
export const Past = () => render({ ...single, date_badge__past: true });
export const PastRange = () => render({ ...range, date_badge__past: true });
