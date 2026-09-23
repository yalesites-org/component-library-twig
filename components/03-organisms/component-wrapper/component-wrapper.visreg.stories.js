import componentWrapperTwig from './yds-component-wrapper.twig';

import {
  sectionThemes,
  globalThemeLabels,
  globalThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
  createVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  tags: ['visreg'],
  title: 'Templates/Component Wrapper/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
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

  return createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderWidthVariations(), {
        width: 'site',
        primaryWidth: '100%',
      }),
    sectionThemes,
    'All Section Theme Variations',
    '',
    'Section Theme',
  );
};

const themeStories = createGlobalThemeStories(
  renderGlobalTheme,
  globalThemes,
  globalThemeLabels,
);

export const OldBlues = themeStories.one;
export const NewHavenGreen = themeStories.two;
export const ShorelineSummer = themeStories.three;
export const Onha = themeStories.four;
export const ItsYourYale = themeStories.five;
export const AI = themeStories.six;
export const WhitneyHumanitiesCenter = themeStories.seven;

ItsYourYale.storyName = 'It’s Your Yale';
