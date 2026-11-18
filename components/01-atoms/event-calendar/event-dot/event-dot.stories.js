import eventDotTwig from './yds-event-dot.twig';
import componentProps from './event-dot-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Event dot',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${eventDotTwig(data)}</div>`;

export const Playground = (args) =>
  render({ event_dot__past: args.past, event_dot__pointed_at: args.pointedAt });

export const Upcoming = () => render({});

export const Past = () => render({ event_dot__past: true });

export const PointedAt = () => render({ event_dot__pointed_at: true });
