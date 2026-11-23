import legendKeyTwig from './yds-legend-key.twig';
import componentProps from './legend-key-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Legend key',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${legendKeyTwig(data)}</div>`;

export const Playground = (args) =>
  render({
    legend_key__swatch: args.swatch,
  });

export const Today = () =>
  render({
    legend_key__swatch: 'today',
  });

export const Selected = () =>
  render({
    legend_key__swatch: 'selected',
  });

export const Dots = () =>
  render({
    legend_key__swatch: 'dots',
  });

export const Band = () =>
  render({
    legend_key__swatch: 'band',
  });

export const Bar = () =>
  render({
    legend_key__swatch: 'bar',
  });

export const Past = () =>
  render({
    legend_key__swatch: 'past',
  });
