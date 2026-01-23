import tableTwig from './example-tables.twig';

import './table';

export default {
  title: 'Atoms/Table',
};

export const Table = () => `
  <div class="layout">
    ${tableTwig()}
  </div>
`;
