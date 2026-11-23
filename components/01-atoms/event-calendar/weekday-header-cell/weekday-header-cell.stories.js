import weekdayHeaderCellTwig from './yds-weekday-header-cell.twig';
import componentProps from './weekday-header-cell-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Weekday header cell',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface
// and gives the cell a width, the way the grid does, so alignment shows.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)"><div style="width: var(--size-spacing-11)">${weekdayHeaderCellTwig(
    data,
  )}</div></div>`;

export const Playground = (args) =>
  render({
    weekday_header_cell__text: args.text,
    weekday_header_cell__label: args.label,
    weekday_header_cell__alignment: args.alignment,
  });

const monday = {
  weekday_header_cell__text: 'Mon',
  weekday_header_cell__label: 'Monday',
};

export const FullMonth = () =>
  render({ ...monday, weekday_header_cell__alignment: 'start' });

export const MiniCalendar = () =>
  render({ ...monday, weekday_header_cell__alignment: 'center' });
