import searchResultTwig from './yds-search-result.twig';

import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';

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
 */
export default {
  tags: ['visreg'],
  title: 'Molecules/Search Result/Visreg',
  parameters: { controls: { disable: true } },
};

const renderGlobalTheme = () => {
  const heading = searchResultData.search_result__title;
  const highlighted = searchResultData.search_result__highlighted;
  const teaser = searchResultData.search_result__teaser;
  const contentType = searchResultData.search_result__content_type;
  const isCas = false;

  // Render function for search result variations
  const renderSearchResult = (theme) =>
    createSectionWrapper(
      theme,
      searchResultTwig({
        search_result__teaser: teaser,
        search_result__title: heading,
        search_result__url: '#',
        search_result__highlighted: highlighted,
        breadcrumbs__items: breadcrumbData.items,
        search_result__content_type: contentType,
        search_result__prefix__icon: isCas ? 'lock-solid' : '',
        is_cas: isCas,
      }),
    );

  return createThemeVariations(
    renderSearchResult,
    sectionThemes,
    'All Section Theme Variations',
    'Below are all theme variations for visual regression testing.',
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
