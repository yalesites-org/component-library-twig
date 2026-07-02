// Twig templates
import searchResultTwig from './yds-search-result.twig';

// Data files
import searchResultData from './search-result.yml';
import breadcrumbData from './breadcrumbs.yml';
import componentProps from './search-result-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Search Result',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: {
    ...toArgs(componentProps),
    heading: searchResultData.search_result__title,
    url: '#',
    highlighted: searchResultData.search_result__highlighted,
    teaser: searchResultData.search_result__teaser,
    contentType: searchResultData.search_result__content_type,
  },
};

export const SearchResult = ({
  heading,
  url,
  highlighted,
  teaser,
  contentType,
  isCas,
}) =>
  searchResultTwig({
    search_result__teaser: teaser,
    search_result__title: heading,
    search_result__url: url,
    search_result__highlighted: highlighted,
    breadcrumbs__items: breadcrumbData.items,
    search_result__content_type: contentType,
    search_result__prefix__icon: isCas ? 'lock-solid' : '',
    is_cas: isCas,
  });
