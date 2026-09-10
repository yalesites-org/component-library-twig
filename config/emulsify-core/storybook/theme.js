import { create } from 'storybook/theming';

export default create({
  // Don't set base - let Storybook handle light/dark mode automatically
  brandTitle: 'YaleSites Design System',
  brandUrl: 'https://yalesites.yale.edu',
  brandTarget: '_blank',

  // Typography
  fontBase:
    '"Mallory", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',
});
