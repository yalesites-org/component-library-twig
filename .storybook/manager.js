import { addons, types } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import React from 'react';

const yaleSitesTheme = create({
  // Don't set base - let Storybook handle light/dark mode automatically
  brandTitle: 'YaleSites Design System',
  brandUrl: 'https://yalesites.yale.edu',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Mallory", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',
});

const VISREG_KEY = 'yds-show-visreg';

// Initialize to hidden on first visit
if (localStorage.getItem(VISREG_KEY) === null) {
  localStorage.setItem(VISREG_KEY, 'false');
}

// Toolbar toggle button
addons.register('visreg-toggle', () => {
  addons.add('visreg-toggle/toolbar', {
    type: types.TOOL,
    title: 'Toggle Visreg Pages',
    render: () => {
      const isVisible = localStorage.getItem(VISREG_KEY) === 'true';
      return React.createElement(
        'button',
        {
          title: isVisible ? 'Hide Visreg Pages' : 'Show Visreg Pages',
          onClick: () => {
            localStorage.setItem(VISREG_KEY, isVisible ? 'false' : 'true');
            window.location.reload();
          },
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '7px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            color: isVisible ? '#1ea7fd' : '#999',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          },
        },
        React.createElement('span', null, isVisible ? 'Visreg: On' : 'Visreg: Off'),
      );
    },
  });
});

addons.setConfig({
  theme: yaleSitesTheme,
  sidebar: {
    filters: {
      visreg: (item) => {
        if (!item.tags) return true;
        if (!item.tags.includes('visreg')) return true;
        return localStorage.getItem(VISREG_KEY) === 'true';
      },
    },
  },
});
