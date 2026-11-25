import multiDayBarTwig from './yds-multi-day-bar.twig';
import componentProps from './multi-day-bar-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Multi-day bar',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

const content = {
  multi_day_bar__title: 'Workshop in arithmetic geometry',
  multi_day_bar__date_range: 'Oct 22–24',
  multi_day_bar__label_range: 'October 22 to 24',
};

// The parent sets width; the stories give the bar a 24rem cell.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5); width: 24rem">${multiDayBarTwig({
    ...content,
    ...data,
  })}</div>`;

export const Playground = (args) =>
  render({
    multi_day_bar__title: args.title,
    multi_day_bar__date_range: args.dateRange,
    multi_day_bar__label_range: args.labelRange,
    multi_day_bar__url: args.url,
    multi_day_bar__past: args.past,
    multi_day_bar__pointed_at: args.pointedAt,
  });

export const Default = () => render({});

export const PointedAt = () => render({ multi_day_bar__pointed_at: true });

export const Past = () => render({ multi_day_bar__past: true });
