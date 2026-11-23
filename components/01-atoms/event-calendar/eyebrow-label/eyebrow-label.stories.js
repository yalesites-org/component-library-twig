import eyebrowLabelTwig from './yds-eyebrow-label.twig';
import componentProps from './eyebrow-label-props.yml';
import { toArgTypes, toArgs } from '../../../_storybook/component-props';

import '../../../00-tokens/effects/yds-animate';

/**
 * Storybook Definition.
 * One story per state, plus a Playground that exposes every prop as a Control.
 */
export default {
  title: 'Atoms/Event Calendar/Eyebrow label',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

// Every state sets only its own prop. The wrapper is a plain white surface.
const render = (data) =>
  `<div style="padding: var(--size-spacing-5)">${eyebrowLabelTwig(data)}</div>`;

export const Playground = (args) =>
  render({
    eyebrow_label__text: args.text,
    eyebrow_label__today: args.today,
  });

export const Default = () =>
  render({
    eyebrow_label__text: 'Algebra seminar',
  });

export const Today = () =>
  render({
    eyebrow_label__text: 'Today',
    eyebrow_label__today: true,
  });

export const PastEvent = () =>
  render({
    eyebrow_label__text: 'Past event',
  });
