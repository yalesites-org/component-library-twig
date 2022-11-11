// Twig templates
import searchResultTwig from './yds-search-result.twig';

// Data files
import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Search Result',
  argTypes: {
    heading: {
      name: 'Heading',
      type: 'string',
      defaultValue: searchResultData.search_result__title,
    },
  },
};

export const SearchResult = ({ heading }) =>
  searchResultTwig({
    searchResultData,
    search_result__title: heading,
    breadcrumbs__items: breadcrumbData.items,
  });
