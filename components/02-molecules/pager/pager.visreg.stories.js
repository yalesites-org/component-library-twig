import pager from './yds-pager.twig';

import { globalThemes, sectionThemes } from '../../_storybook/theme-constants';
import {
  createGlobalThemeVariations,
  createSectionWrapper,
  createThemeVariations,
} from '../../_storybook/playground-utils';

/**
 * Generate pagination data - keep it simple
 */
function generatePagerData(currentPage, totalPages) {
  // Validate and normalize inputs for Storybook demo
  const safeTotalPages = Math.max(
    1,
    Math.min(1000, Math.floor(Math.abs(totalPages || 1))),
  );
  const safeCurrentPage = Math.max(1, Math.floor(Math.abs(currentPage || 1)));

  const data = {
    current: safeCurrentPage,
    items: {
      pages: {},
    },
  };

  for (let i = 1; i <= safeTotalPages; i += 1) {
    data.items.pages[i] = { href: `#page-${i}` };
  }

  if (safeCurrentPage > 1) {
    data.items.previous = { href: `#page-${safeCurrentPage - 1}` };
    data.items.first = { href: '#page-1' };
  }

  if (safeCurrentPage < safeTotalPages) {
    data.items.next = { href: `#page-${safeCurrentPage + 1}` };
    data.items.last = { href: `#page-${safeTotalPages}` };
  }

  return data;
}

/**
 * Storybook Definition.
 */
export default {
  title: 'Molecules/Pager/Visreg',
  parameters: { controls: { disable: true } },
};

export const Visreg = () => {
  const currentPage = 3;
  const totalPages = 10;

  // Validate and normalize args
  const safeTotalPages = Math.max(
    1,
    Math.min(10, Math.floor(Math.abs(totalPages || 10))),
  );
  const safeCurrentPage = Math.max(
    1,
    Math.min(safeTotalPages, Math.floor(Math.abs(currentPage || 1))),
  );

  const data = generatePagerData(safeCurrentPage, safeTotalPages);

  // Render function for pager variations
  const renderPager = (theme) => createSectionWrapper(theme, pager(data));

  return createGlobalThemeVariations(
    () =>
      createThemeVariations(
        renderPager,
        sectionThemes,
        'All Section Theme Variations',
        'Below are all theme variations for visual regression testing.',
        'Section Theme',
      ),
    globalThemes,
    'All Global Theme Variations',
  );
};
