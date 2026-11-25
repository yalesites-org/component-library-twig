import filterBarTwig from './yds-filter-bar.twig';
import filterData from './filter-bar-fixtures.yml';

import '../../../00-tokens/effects/yds-animate';
import '../../../01-atoms/forms/views-filter/chosen-base.css';

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
 * Visual regression: every state and layout, on each section theme.
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Event Calendar/Filter bar/Visreg',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
  },
};

const { category, audience, experience } = filterData;
const filters = (selected = {}) => [
  {
    id: 'category',
    label: 'Category',
    options: category,
    selected: selected.category ?? [],
  },
  {
    id: 'audience',
    label: 'Audience',
    options: audience,
    selected: selected.audience ?? [],
  },
  {
    id: 'experience',
    label: 'Event experience',
    options: experience,
    selected: selected.experience ?? [],
  },
];

const bar = (id, data, width = '100%') =>
  `<div style="width: ${width}; margin-bottom: var(--size-spacing-5)">${filterBarTwig(
    { filter_bar__id: id, ...data },
  )}</div>`;

const renderStates = (theme) =>
  createSectionWrapper(
    theme,
    `<div style="padding: var(--size-spacing-5)">
      ${bar(`empty-${theme}`, { filter_bar__filters: filters() }, '60rem')}
      ${bar(
        `set-${theme}`,
        {
          filter_bar__filters: filters({
            category: ['Lecture', 'Concert'],
            audience: ['Students'],
            experience: ['In person'],
          }),
        },
        '60rem',
      )}
      ${bar(
        `search-${theme}`,
        {
          filter_bar__search_value: 'poetry reading',
          filter_bar__filters: filters(),
        },
        '60rem',
      )}
      ${bar(
        `stacked-${theme}`,
        { filter_bar__layout: 'stacked', filter_bar__filters: filters() },
        '30rem',
      )}
    </div>`,
  );

const renderGlobalTheme = () =>
  createThemeVariations(
    renderStates,
    sectionThemes,
    'All Section Theme Variations',
    'Every state and layout on each section theme, for visual regression testing.',
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
