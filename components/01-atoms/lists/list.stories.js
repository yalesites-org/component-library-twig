import listTwig from './yds-list.twig';
import listTagsTwig from './taxonomy/yds-tags-list.twig';
import listCategoriesTwig from './taxonomy/yds-categories-list.twig';

import listData from './list.yml';
import listTagsData from './taxonomy/tags-list.yml';
import listCategoriesData from './taxonomy/categories-list.yml';

import componentProps from './list-props.yml';
import { toArgTypes, toArgs } from '../../_storybook/component-props';

/**
 * Storybook Definition.
 */
export default {
  title: 'Atoms/Lists',
  tags: ['!dev'],
  argTypes: toArgTypes(componentProps),
  args: toArgs(componentProps),
};

export const Interactive = ({ sectionTheme, listType }) => `
  <div class="yds-layout" data-component-theme="${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h3>${listType === 'ul' ? 'Unordered' : 'Ordered'} List</h3>
        <div class="text-field">
          ${listTwig({
            list__items:
              listType === 'ul'
                ? listData.unordered__list__items
                : listData.ordered__list__items,
            list__type: listType,
          })}
        </div>

        <h3>Tags List</h3>
        ${listTagsTwig(listTagsData)}

        <h3>Categories List</h3>
        ${listCategoriesTwig(listCategoriesData)}
      </div>
    </div>
  </div>
`;

export const UnorderedList = () => `
  <div class="text-field">
    ${listTwig({ list__items: listData.unordered__list__items })}
  </div>
`;
export const OrderedList = () => `
<div class="text-field">
  ${listTwig({ list__items: listData.ordered__list__items, list__type: 'ol' })}
</div>
`;

export const TagsList = (args) => listTagsTwig({ ...listTagsData, ...args });

export const CategoriesList = (args) =>
  listCategoriesTwig({ ...listCategoriesData, ...args });
