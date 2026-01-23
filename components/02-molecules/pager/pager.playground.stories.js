import tokens from '@yalesites-org/tokens/build/json/tokens.json';

import pager from './yds-pager.twig';

const colorPairingsData = Object.keys(tokens['component-themes']);

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
  title: 'Molecules/Pager/Playground',
  argTypes: {
    sectionTheme: {
      name: 'Section Theme',
      type: 'select',
      options: colorPairingsData,
    },
    currentPage: {
      name: 'Current page',
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Current active page',
    },
    totalPages: {
      name: 'Total pages',
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Total number of pages',
    },
  },
  args: {
    sectionTheme: 'one',
    currentPage: 3,
    totalPages: 10,
  },
};

export const Playground = ({ sectionTheme, currentPage, totalPages }) => {
  const themes = colorPairingsData;

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

  return `
    <h2>Interactive Playground</h2>
    <p>Use the controls to test different pagination states. Note: Click functionality is limited in this view.</p>

    <div data-component-theme="${sectionTheme}" data-component-width="site" class="yds-layout">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary">
          ${pager(data)}
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
        <div data-component-theme="${theme}" data-component-width="site" class="yds-layout">
          <div class="yds-layout__inner">
            <div class="yds-layout__primary">
              ${pager(data)}
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join('')}
  `;
};
