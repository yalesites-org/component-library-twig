import listTwig from './yds-list.twig';
import listTagsTwig from './taxonomy/yds-tags-list.twig';
import listCategoriesTwig from './taxonomy/yds-categories-list.twig';

import listData from './list.yml';
import listTagsData from './taxonomy/tags-list.yml';
import listCategoriesData from './taxonomy/categories-list.yml';

export default {
  title: 'Atoms/Lists/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: ['default', 'one', 'two', 'three', 'four'],
    },
    listType: {
      name: 'List Type',
      type: 'select',
      options: ['ul', 'ol'],
    },
  },
  args: {
    sectionTheme: 'default',
    listType: 'ul',
  },
};

export const Playground = ({ sectionTheme, listType }) => {
  const themes = ['default', 'one', 'two', 'three', 'four'];

  return `
  <h2>Interactive Playground</h2>
  <p>Use the controls to test different list types with various themes.</p>

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

  <hr style="margin: 3rem 0; border: 1px solid #ccc;">

  <h2>All Section Theme Variations</h2>
  <p>Below are all theme variations for visual regression testing.</p>

  ${themes
    .map(
      (theme) => `
    <div style="margin-bottom: 2rem;">
      <h3>Section Theme: ${theme}</h3>
      <div class="yds-layout" data-component-theme="${theme}" data-component-width="site">
        <div class="yds-layout__inner">
          <div class="yds-layout__primary">
            <h4>Unordered List</h4>
            <div class="text-field">
              ${listTwig({ list__items: listData.unordered__list__items })}
            </div>

            <h4>Ordered List</h4>
            <div class="text-field">
              ${listTwig({
                list__items: listData.ordered__list__items,
                list__type: 'ol',
              })}
            </div>

            <h4>Tags List</h4>
            ${listTagsTwig(listTagsData)}

            <h4>Categories List</h4>
            ${listCategoriesTwig(listCategoriesData)}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('')}
  `;
};
