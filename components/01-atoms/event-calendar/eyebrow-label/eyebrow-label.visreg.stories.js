import eyebrowLabelTwig from './yds-eyebrow-label.twig';

import '../../../00-tokens/effects/yds-animate';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../../_storybook/playground-utils';

/**
 * Visual regression: every state, side by side, on each section theme.
 */
export default {
  tags: ['visreg'],
  title: 'Atoms/Event Calendar/Eyebrow label/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const states = [
  { eyebrow_label__text: 'Default' },
  { eyebrow_label__text: 'Today', eyebrow_label__today: true },
  { eyebrow_label__text: 'Past event' },
];

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--size-spacing-5); padding: var(--size-spacing-5)">
      ${states.map((data) => eyebrowLabelTwig(data)).join('')}
    </div>`,
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderStates,
    sectionThemes,
    'All Section Theme Variations',
    'Every state on each section theme, for visual regression testing.',
    'Section Theme',
  );

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
