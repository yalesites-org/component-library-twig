import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import searchResultTwig from './yds-search-result.twig';

import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';

const colorPairingsData = Object.keys(tokens['component-themes']);

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Search Result/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
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
    sectionTheme: 'one',
    heading: searchResultData.search_result__title,
    highlighted: searchResultData.search_result__highlighted,
    teaser: searchResultData.search_result__teaser,
    contentType: searchResultData.search_result__content_type,
    isCas: false,
  },
};

export const Playground = ({
  sectionTheme,
  heading,
  highlighted,
  teaser,
  contentType,
  isCas,
}) => {
  const themes = colorPairingsData;

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different search result configurations.</p>

  <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
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
    </div>
  `,
    )
    .join('')}
  `;
};
