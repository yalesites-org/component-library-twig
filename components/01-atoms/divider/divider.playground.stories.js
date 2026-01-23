import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import dividerTwig from './yds-divider.twig';

import './cl-dividers.scss';
import '../../00-tokens/effects/yds-animate';

const layoutOptions = ['left', 'center'];
const thicknessOptions = Object.keys(tokens.border.thickness);
const widths = Object.keys(tokens.layout.width);

export default {
  title: 'Atoms/Divider/Playground',
  argTypes: {
    thickness: {
      name: 'Line thickness',
      options: thicknessOptions,
      type: 'select',
      defaultValue: 'hairline',
    },
    dividerColor: {
      name: 'Line Color',
      options: ['gray-500', 'blue-yale', 'basic-brown-gray'],
      type: 'select',
      defaultValue: 'gray-500',
    },
    width: {
      name: 'Divider width',
      options: widths,
      type: 'select',
      defaultValue: '50',
    },
    position: {
      name: 'Divider position',
      options: layoutOptions,
      type: 'select',
      defaultValue: 'center',
    },
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
  },
  args: {
    thickness: 'hairline',
    dividerColor: 'gray-500',
    width: '50',
    position: 'center',
    sectionTheme: 'default',
  },
};

export const Playground = ({
  position,
  thickness,
  dividerColor,
  width,
  sectionTheme,
}) => {
  const customProperties = {
    '--thickness-theme-divider': `var(--size-thickness-${thickness})`,
  };

  const root = document.documentElement;
  Object.entries(customProperties).forEach((entry) => {
    const [key, value] = entry;
    root.style.setProperty(key, value);
  });

  return `
  <div class="yds-layout cl-divider-playground" data-component-theme="${sectionTheme}">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
      --width-theme-divider: var(--layout-width-${width});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h2>Interactive Playground</h2>
        <p>Use the StoryBook controls to see the divider implement the available positions, thicknesses, and colors.</p>

        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: width,
            divider__position: position,
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  <div class="yds-layout cl-divider-playground" data-component-theme="default">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h3>Section Theme: default</h3>

        <h4>Width: 25</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '25',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 50</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '50',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 75</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '75',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 100</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '100',
            divider__position: 'center',
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <div class="yds-layout cl-divider-playground" data-component-theme="one">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h3>Section Theme: one</h3>

        <h4>Width: 25</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '25',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 50</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '50',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 75</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '75',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 100</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '100',
            divider__position: 'center',
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <div class="yds-layout cl-divider-playground" data-component-theme="two">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h3>Section Theme: two</h3>

        <h4>Width: 25</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '25',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 50</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '50',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 75</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '75',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 100</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '100',
            divider__position: 'center',
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <div class="yds-layout cl-divider-playground" data-component-theme="three">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h3>Section Theme: three</h3>

        <h4>Width: 25</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '25',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 50</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '50',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 75</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '75',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 100</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '100',
            divider__position: 'center',
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>

  <div class="yds-layout cl-divider-playground" data-component-theme="four">
    <div class="yds-layout__inner" data-component-width="site" style="
      --color-divider: var(--color-${dividerColor});
    ">
      <div class="yds-layout__primary" style="width: 100%">
        <h3>Section Theme: four</h3>

        <h4>Width: 25</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '25',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 50</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '50',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 75</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '75',
            divider__position: 'center',
          })}
        </div>

        <h4>Width: 100</h4>
        <div style="--thickness-divider: var(--size-thickness-${thickness})">
          ${dividerTwig({
            divider__width: '100',
            divider__position: 'center',
          })}
        </div>
      </div>
    </div>
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
  `;
};
