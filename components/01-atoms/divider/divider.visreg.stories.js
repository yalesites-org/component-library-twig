import dividerTwig from './yds-divider.twig';

import './cl-dividers.scss';
import '../../00-tokens/effects/yds-animate';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  title: 'Atoms/Divider/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const thickness = 'hairline';
  const dividerColor = 'gray-500';

  const customProperties = {
    '--thickness-theme-divider': `var(--size-thickness-${thickness})`,
  };

  const root = document.documentElement;
  Object.entries(customProperties).forEach((entry) => {
    const [key, value] = entry;
    root.style.setProperty(key, value);
  });

  // Render function for all width variations within a theme
  const renderThemeWidthVariations = (theme) => {
    const dividerWidths = ['25', '50', '75', '100'];
    return `
      <div class="yds-layout cl-divider-playground" data-component-theme="${theme}">
        <div class="yds-layout__inner" data-component-width="site" style="
          --color-divider: var(--color-${dividerColor});
        ">
          <div class="yds-layout__primary" style="width: 100%">
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

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderThemeWidthVariations,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations with width samples for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
