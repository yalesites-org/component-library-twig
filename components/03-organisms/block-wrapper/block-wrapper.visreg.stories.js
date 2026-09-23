import blockWrapperTwig from './yds-block-wrapper.twig';

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
  title: 'Templates/Block Wrapper/Visreg',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

const renderGlobalTheme = () => {
  const paddingOptions = [
    'padding-default',
    'padding-no-top',
    'padding-no-bottom',
    'padding-no-padding',
  ];

  const blockContent =
    '<div style="background-color: #c8e6c9; padding: 20px;">Block wrapper content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>';

  // Render function for block wrapper variations
  const renderBlockWrapper = (modifier) => `
    <div class="wrap-for-screenshot">
      <div style="background-color: #f0f0f0; padding: 20px;">
        <div style="background-color: #e3f2fd; padding: 10px; margin-bottom: 10px;">
          <strong>Previous Block</strong>
        </div>
        ${blockWrapperTwig({
          block_wrapper__content: blockContent,
          block_wrapper__extra_classes: [
            'ys-block-wrapper',
            `ys-block-wrapper--${modifier}`,
          ],
        })}
        <div style="background-color: #fff3e0; padding: 10px; margin-top: 10px;">
          <strong>Next Block / Footer</strong>
        </div>
      </div>
    </div>
  `;

  const renderPaddingVariations = () =>
    createVariations(
      renderBlockWrapper,
      paddingOptions,
      'All Padding Variations',
      '',
      'Padding Modifier',
    );

  return createThemeVariations(
    (theme) =>
      createSectionWrapper(theme, renderPaddingVariations(), {
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
