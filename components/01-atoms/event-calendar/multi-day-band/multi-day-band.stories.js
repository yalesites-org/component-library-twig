import multiDayBandTwig from './yds-multi-day-band.twig';
import componentProps from './multi-day-band-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Multi-day band',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// The parent sets width; the stories give the band a 6rem cell.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5); width: 6rem">${multiDayBandTwig(
    data,
  )}</div>`;

export const Playground = (args) =>
  render({
    multi_day_band__segment: args.segment,
    multi_day_band__past: args.past,
    multi_day_band__pointed_at: args.pointedAt,
  });

export const Upcoming = () => render({ multi_day_band__segment: 'single' });

export const Past = () =>
  render({ multi_day_band__segment: 'single', multi_day_band__past: true });

export const PointedAt = () =>
  render({
    multi_day_band__segment: 'single',
    multi_day_band__pointed_at: true,
  });

// start, middle and end side by side, as they join across three days.
export const Segments = () =>
  `<div style="padding: var(--size-spacing-5); display: flex; width: 18rem">${[
    'start',
    'middle',
    'end',
  ]
    .map(
      (segment) =>
        `<div style="flex: 1">${multiDayBandTwig({
          multi_day_band__segment: segment,
        })}</div>`,
    )
    .join('')}</div>`;
