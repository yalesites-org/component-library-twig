import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const yaleSitesTheme = create({
  base: 'light',
  brandTitle: 'YaleSites Design System',
  brandUrl: 'https://yalesites.yale.edu',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Mallory", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',
});

addons.setConfig({
  theme: yaleSitesTheme,
});
