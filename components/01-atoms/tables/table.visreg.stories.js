import tableTwig from './example-tables.twig';

import './table';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

export default {
  tags: ['visreg'],
  title: 'Atoms/Table/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  // Render function for table variations
  const renderTable = (theme) => createSectionWrapper(theme, tableTwig());

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderTable,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
