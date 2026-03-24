import searchResultTwig from './yds-search-result.twig';

import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Search Result/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const heading = searchResultData.search_result__title;
  const highlighted = searchResultData.search_result__highlighted;
  const teaser = searchResultData.search_result__teaser;
  const contentType = searchResultData.search_result__content_type;
  const isCas = false;

  // Render function for search result variations
  const renderSearchResult = (theme) => `
    <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${searchResultTwig({
            search_result__teaser: teaser,
            search_result__title: heading,
            search_result__url: '#',
            search_result__highlighted: highlighted,
            breadcrumbs__items: breadcrumbData.items,
            search_result__content_type: contentType,
            search_result__prefix__icon: isCas ? 'lock-solid' : '',
            is_cas: isCas,
          })}
        </div>
      </div>
    </div>
  `;

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderSearchResult,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
