import tableTwig from './example-tables.twig';

import './table';

export default {
  title: 'Atoms/Table',
  tags: ['!dev'],
};

export const Table = () => `
  <div class="layout">
    ${tableTwig()}
  </div>
`;
