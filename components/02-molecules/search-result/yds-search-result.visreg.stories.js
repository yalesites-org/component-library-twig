import searchResultTwig from './yds-search-result.twig';

import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import {
  createPlaygroundIntro,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Search Result/Visreg',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      type: 'select',
      options: sectionThemes,
    },
    heading: {
      name: 'Heading',
      type: 'string',
    },
    highlighted: {
      name: 'Search Results Highlighted',
      type: 'string',
    },
    teaser: {
      name: 'Search Results Teaser',
      type: 'string',
    },
    contentType: {
      name: 'Search Results Content Type',
      type: 'string',
    },
    isCas: {
      name: 'Is CAS',
      type: 'boolean',
    },
  },
  args: {
    sectionTheme: 'default',
    heading: searchResultData.search_result__title,
    highlighted: searchResultData.search_result__highlighted,
    teaser: searchResultData.search_result__teaser,
    contentType: searchResultData.search_result__content_type,
    isCas: false,
  },
};

export const Visreg = ({
  sectionTheme,
  heading,
  highlighted,
  teaser,
  contentType,
  isCas,
}) => {
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

  return `
    ${createPlaygroundIntro(
      'Use the controls to test different search result configurations.',
    )}

    ${renderSearchResult(sectionTheme)}

    <div class="vrt-divider"></div>

    ${createThemeVariations(
      renderSearchResult,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
