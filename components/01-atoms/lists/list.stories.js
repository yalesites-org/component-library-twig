import listTwig from './list.twig';

import listData from './list.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Lists' };

export const UnorderedList = () => listTwig(listData);
export const OrderedList = () => listTwig({ ...listData, list__type: 'ol' });
