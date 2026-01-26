import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import dividerTwig from './yds-divider.twig';

import './cl-dividers.scss';
import '../../00-tokens/effects/yds-animate';

import {
  borderThicknessOptions,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createPlaygroundIntro } from '../../_storybook/playground-utils';

const layoutOptions = ['left', 'center'];
const widths = Object.keys(tokens.layout.width);

export default {
  title: 'Atoms/Divider/Playground',
  argTypes: {
    thickness: {
      name: 'Line thickness',
      options: borderThicknessOptions,
      type: 'select',
    },
    dividerColor: {
      name: 'Line Color',
      options: ['gray-500', 'blue-yale', 'basic-brown-gray'],
      type: 'select',
    },
    width: {
      name: 'Divider width',
      options: widths,
      type: 'select',
    },
    position: {
      name: 'Divider position',
      options: layoutOptions,
      type: 'select',
    },
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
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

  // Render function for single divider instance
  const renderDivider = (theme, dividerWidth = width) => `
    <div class="yds-layout cl-divider-playground" data-component-theme="${theme}">
      <div class="yds-layout__inner" data-component-width="site" style="
        --color-divider: var(--color-${dividerColor});
        --width-theme-divider: var(--layout-width-${dividerWidth});
      ">
        <div class="yds-layout__primary" style="width: 100%">
          <div style="--thickness-divider: var(--size-thickness-${thickness})">
            ${dividerTwig({
              divider__width: dividerWidth,
              divider__position: position,
            })}
          </div>
        </div>
      </div>
    </div>
    <div class="padding-to-see-dividers-above">&nbsp;</div>
  `;

  // Render function for all width variations within a theme
  const renderThemeWidthVariations = (theme) => {
    const dividerWidths = ['25', '50', '75', '100'];
    return `
      <div class="yds-layout cl-divider-playground" data-component-theme="${theme}">
        <div class="yds-layout__inner" data-component-width="site" style="
          --color-divider: var(--color-${dividerColor});
        ">
          <div class="yds-layout__primary" style="width: 100%">
            <h3 class="sb-section__subheading">Section Theme: ${theme}</h3>

            ${dividerWidths
              .map(
                (w) => `
              <h4>Width: ${w}</h4>
              <div style="--thickness-divider: var(--size-thickness-${thickness})">
                ${dividerTwig({
                  divider__width: w,
                  divider__position: 'center',
                })}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
      <div class="padding-to-see-dividers-above">&nbsp;</div>
    `;
  };

  return `
    ${createPlaygroundIntro(
      'Use the Storybook controls to see the divider implement the available positions, thicknesses, and colors.',
    )}

    ${renderDivider(sectionTheme)}

    <hr class="sb-section__divider">

    <h2>All Section Theme Variations</h2>
    <p>Below are all theme variations with width samples for visual regression testing.</p>

    ${sectionThemes.map((theme) => renderThemeWidthVariations(theme)).join('')}
  `;
};
