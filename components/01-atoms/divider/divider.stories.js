import dividerTwig from './yds-divider.twig';

import './cl-dividers.scss';
import '../../00-tokens/effects/yds-animate';

export default {
  title: 'Atoms/Divider',
};

export const Dividers = () => `
  <h2>Thickness Variations</h2>
  <div style="--thickness-divider: var(--size-thickness-hairline)">${dividerTwig()}</div>
  <div style="--thickness-divider: var(--size-thickness-1)">${dividerTwig()}</div>
  <div style="--thickness-divider: var(--size-thickness-2)">${dividerTwig()}</div>
  <div style="--thickness-divider: var(--size-thickness-4)">${dividerTwig()}</div>
  <div style="--thickness-divider: var(--size-thickness-6)">${dividerTwig()}</div>
  <div style="--thickness-divider: var(--size-thickness-8)">${dividerTwig()}</div>

  <h2>Width Variations (Centered)</h2>
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

  <h2>Position Variations (50% Width)</h2>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '50', divider__position: 'left' })}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${dividerTwig({ divider__width: '50', divider__position: 'center' })}
  </div>

  <h2>Color Variations (on themed background)</h2>
  <div class="yds-layout" data-component-theme="one">
    <div class="yds-layout__inner" data-component-width="site" style="--color-divider: var(--color-gray-500);">
      <div class="yds-layout__primary" style="width: 100%">
        <p>Gray divider</p>
        <div style="--thickness-divider: var(--size-thickness-8)">
          ${dividerTwig({ divider__width: '100', divider__position: 'center' })}
        </div>
      </div>
    </div>
  </div>

  <div class="yds-layout" data-component-theme="two">
    <div class="yds-layout__inner" data-component-width="site" style="--color-divider: var(--color-blue-yale);">
      <div class="yds-layout__primary" style="width: 100%">
        <p>Blue Yale divider</p>
        <div style="--thickness-divider: var(--size-thickness-8)">
          ${dividerTwig({ divider__width: '100', divider__position: 'center' })}
        </div>
      </div>
    </div>
  </div>

  <div class="yds-layout" data-component-theme="three">
    <div class="yds-layout__inner" data-component-width="site" style="--color-divider: var(--color-basic-brown-gray);">
      <div class="yds-layout__primary" style="width: 100%">
        <p>Brown-gray divider</p>
        <div style="--thickness-divider: var(--size-thickness-8)">
          ${dividerTwig({ divider__width: '100', divider__position: 'center' })}
        </div>
      </div>
    </div>
  </div>

  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;
