import componentWrapperTwig from './yds-component-wrapper.twig';

import { sectionThemes, globalThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Organisms/Component Wrapper/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export const Visreg = () => {
  const widthOptions = ['content', 'highlight', 'site', 'max'];

  const renderComponentWrapper = (width) => `
    <div class="wrap-for-screenshot">
      ${componentWrapperTwig({
        component_wrapper__width: width,
        component_wrapper__label: `Width: ${width}`,
      })}
    </div>
  `;

  const renderWidthVariations = () =>
    createVariations(
      renderComponentWrapper,
      widthOptions,
      'All Width Variations',
      '',
      'Component Width',
    );

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        (theme) =>
          createSectionWrapper(theme, renderWidthVariations(), {
            width: 'site',
            primaryWidth: '100%',
          }),
        sectionThemes,
        'All Section Theme Variations',
        '',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
