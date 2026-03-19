import listTwig from './yds-list.twig';
import listTagsTwig from './taxonomy/yds-tags-list.twig';
import listCategoriesTwig from './taxonomy/yds-categories-list.twig';

import listData from './list.yml';
import listTagsData from './taxonomy/tags-list.yml';
import listCategoriesData from './taxonomy/categories-list.yml';

import { sectionThemes } from '../../_storybook/theme-constants';
import { createThemeVariations } from '../../_storybook/playground-utils';

export default {
  title: 'Atoms/Lists/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for all list variations
  const renderLists = (theme) => `
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
  `;

  return `
    ${createThemeVariations(
      renderLists,
      sectionThemes,
      'All Section Theme Variations',
      'Below are all theme variations for visual regression testing.',
      'Section Theme',
    )}
  `;
};
