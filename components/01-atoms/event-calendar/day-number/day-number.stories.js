import dayNumberTwig from './yds-day-number.twig';
import componentProps from './day-number-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Day number',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${dayNumberTwig(data)}</div>`;

export const Playground = (args) =>
  render({
    day_number__number: args.number,
    day_number__label: args.label,
    day_number__size: args.size,
    day_number__has_events: args.hasEvents,
    day_number__today: args.today,
    day_number__selected: args.selected,
    day_number__past: args.past,
    day_number__other_month: args.otherMonth,
  });

export const NoEvents = () =>
  render({
    day_number__number: '5',
    day_number__label: 'Sunday, October 25, no events',
  });

export const HasEvents = () =>
  render({
    day_number__number: '6',
    day_number__has_events: true,
    day_number__label: 'Tuesday, October 6, 2 events',
  });

export const Today = () =>
  render({
    day_number__number: '26',
    day_number__today: true,
    day_number__has_events: true,
    day_number__label: 'Monday, October 26, today, 1 event',
  });

export const Selected = () =>
  render({
    day_number__number: '28',
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'Wednesday, October 28, 4 events, selected',
  });

export const TodayAndSelected = () =>
  render({
    day_number__number: '26',
    day_number__today: true,
    day_number__selected: true,
    day_number__has_events: true,
    day_number__label: 'Monday, October 26, today, 1 event, selected',
  });

export const Past = () =>
  render({
    day_number__number: '12',
    day_number__past: true,
    day_number__has_events: true,
    day_number__label: 'Monday, October 12, 2 events, past',
  });

export const OtherMonth = () =>
  render({
    day_number__number: '30',
    day_number__other_month: true,
    day_number__label: 'September 30 (previous month)',
  });

export const Size32 = () =>
  render({
    day_number__number: '6',
    day_number__size: '32',
    day_number__has_events: true,
    day_number__label: 'Tuesday, October 6, 2 events',
  });
