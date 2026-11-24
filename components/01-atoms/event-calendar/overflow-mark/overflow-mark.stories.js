import overflowMarkTwig from './yds-overflow-mark.twig';
import componentProps from './overflow-mark-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Overflow mark',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${overflowMarkTwig(data)}</div>`;

export const Playground = (args) => render({ overflow_mark__past: args.past });

export const Upcoming = () => render({});

export const Past = () => render({ overflow_mark__past: true });
