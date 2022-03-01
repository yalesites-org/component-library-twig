import listTwig from './list.twig';

import listData from './list.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Lists' };

export const UnorderedList = () =>
  listTwig({ list__items: listData.unordered__list__items });
export const OrderedList = () =>
  listTwig({ list__items: listData.ordered__list__items, list__type: 'ol' });
