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

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${weekdayHeaderCellTwig(
    data,
  )}</div>`;

export const Playground = (args) =>
  render({
    weekday_header_cell__text: args.text,
    weekday_header_cell__label: args.label,
  });

export const Default = () =>
  render({
    weekday_header_cell__text: 'Mon',
    weekday_header_cell__label: 'Monday',
  });
