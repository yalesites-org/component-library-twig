// Divider — original (Twig) vs Web Component (Lit) vs Web Component (vanilla).
// Uses the ORIGINAL divider's props.yml + layout wrapper so the controls and the
// surrounding markup are identical across all three; the only thing that changes
// is the divider implementation. Purpose: validate that the web components are a
// faithful refactor of the original, not a redesign.
import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import dividerTwig from '../components/01-atoms/divider/yds-divider.twig';
import '../components/01-atoms/divider/cl-dividers.scss';
import '../components/00-tokens/effects/yds-animate';
import { borderThicknessOptions } from '../components/_storybook/theme-constants';
import componentProps from '../components/01-atoms/divider/divider-props.yml';
import { toArgTypes, toArgs } from '../components/_storybook/component-props';

import './src/yds-divider.js';
import './vanilla/yds-divider-vanilla.js';

const widths = Object.keys(tokens.layout.width);
const argTypes = toArgTypes(componentProps);
// Same token-derived option overrides the original story applies.
argTypes.width = { ...argTypes.width, options: widths };
argTypes.thickness = { ...argTypes.thickness, options: borderThicknessOptions };

export default {
  title: 'Web Components/Divider',
  argTypes,
  args: toArgs(componentProps),
};

// The exact layout wrapper + CSS custom properties the original divider story
// uses, so the divider (twig or custom element) sits in an identical context.
const wrap = (inner, { dividerColor, width, thickness, sectionTheme }) => `
  <div class="yds-layout" data-component-theme="${sectionTheme}">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
      --width-theme-divider: var(--layout-width-${width});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${inner}
        </div>
      </div>
    </div>
  </div>
`;

const original = (a) =>
  dividerTwig({ divider__width: a.width, divider__position: a.position });
const lit = (a) =>
  `<yds-divider width="${a.width}" position="${a.position}"></yds-divider>`;
const vanilla = (a) =>
  `<yds-divider-vanilla width="${a.width}" position="${a.position}"></yds-divider-vanilla>`;

const label = (text) =>
  `<p style="font: 600 0.9rem sans-serif; margin: 1.5rem 0 0.25rem;">${text}</p>`;

// The validation view: all three, same controls, stacked for a direct 1-1 check.
export const Comparison = (args) => `
  ${label('Original (Twig)')}${wrap(original(args), args)}
  ${label('Web Component — Lit')}${wrap(lit(args), args)}
  ${label('Web Component — Vanilla (no framework)')}${wrap(vanilla(args), args)}
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;

export const Original = (args) =>
  `${wrap(original(args), args)}<div class="padding-to-see-dividers-above">&nbsp;</div>`;
export const Lit = (args) =>
  `${wrap(lit(args), args)}<div class="padding-to-see-dividers-above">&nbsp;</div>`;
export const Vanilla = (args) =>
  `${wrap(vanilla(args), args)}<div class="padding-to-see-dividers-above">&nbsp;</div>`;
