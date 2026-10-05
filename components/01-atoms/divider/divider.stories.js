import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import dividerTwig from './yds-divider.twig';

import './cl-dividers.scss';
import '../../00-tokens/effects/yds-animate';

import componentProps from './divider-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

const widths = Object.keys(tokens.layout.width);
const argTypes = toArgTypes(componentProps);
// Override options for token-derived values
argTypes.width = { ...argTypes.width, options: widths };

export default {
  title: 'Atoms/Divider',
  tags: ['!dev'],
  argTypes,
  args: toArgs(componentProps),
};

export const Interactive = ({ position, thickness, width, sectionTheme }) => {
  return `
    <div class="yds-layout" data-section-theme="${sectionTheme}">
      <div class="yds-layout__inner" data-component-width="site" style="
        --width-theme-divider: var(--layout-width-${width});
      ">
        <div class="yds-layout__primary" style="width: 100%">
          ${dividerTwig({
            divider__width: width,
            divider__position: position,
            divider__thickness: thickness,
          })}
        </div>
      </div>
    </div>
    <div class="padding-to-see-dividers-above">&nbsp;</div>
  `;
};

export const DividersThickness = () => `
  ${dividerTwig({ divider__thickness: '1' })}
  ${dividerTwig({ divider__thickness: '2' })}
  ${dividerTwig({ divider__thickness: '4' })}
  ${dividerTwig({ divider__thickness: '8' })}
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;
DividersThickness.tags = ['!dev'];

export const DividersWidth = () => `
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '25', divider__position: 'center' })}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '50', divider__position: 'center' })}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '75', divider__position: 'center' })}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '100', divider__position: 'center' })}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;
DividersWidth.tags = ['!dev'];

export const DividersPosition = () => `
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '50', divider__position: 'left' })}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '50', divider__position: 'center' })}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;
DividersPosition.tags = ['!dev'];
