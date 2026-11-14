import basicMetaTwig from './basic-meta/yds-basic-meta.twig';
import dateTimeTwig from '../../01-atoms/date-time/yds-date-time.twig';

import {
  globalThemeLabels,
  globalThemes,
  sectionThemes,
} from '../../_storybook/theme-constants';
import { createGlobalThemeStories } from '../../_storybook/global-theme-stories.mjs';
import {
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 *
 * Basic Meta's own color is the fixed `--color-gray-600` token, but it sits
 * directly on the section background, so the contrast pair it forms still
 * differs per section theme -- and at 27px it is nearly free to keep.
 *
 * Event Meta lives in `Molecules/Meta/Event Meta/Visreg` rather than being
 * stacked here, and Profile Meta in `Molecules/Meta/Profile Meta/Visreg`;
 * see those files for why.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Meta/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

/** The meta types whose rendering actually changes with the section theme. */
const renderSectionThemedMeta = (theme) =>
  createSectionWrapper(
    theme,
    `
    <h4>Basic Meta</h4>
    ${basicMetaTwig({
      basic_meta: `<span>By Charlyn Paradis</span>${dateTimeTwig({
        date_time__start: '2022-01-25',
        date_time__format: 'day__full',
      })}`,
    })}

  `,
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderSectionThemedMeta,
    sectionThemes,
    'All Section Theme Variations',
    'Basic Meta against every section theme.',
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
