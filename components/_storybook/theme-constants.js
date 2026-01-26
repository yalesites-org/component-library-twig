/**
 * Theme Constants
 *
 * Centralized theme arrays and constants pulled from design tokens.
 * This provides a single source of truth for all theme-related values
 * used across Storybook playground stories.
 *
 * Benefits:
 * - Adding a new theme in tokens automatically makes it available in all stories
 * - No more duplicated theme arrays across 52+ story files
 * - Consistent naming and ordering across all stories
 *
 * Usage:
 * import { sectionThemes, componentThemes } from '../_storybook/theme-constants.js';
 */

import tokens from '@yalesites-org/tokens/build/json/tokens.json';

/**
 * Section themes (component-library convention, not defined in tokens)
 * Used for wrapping sections/layouts with background colors
 *
 * @type {string[]}
 */
export const sectionThemes = ['default', 'one', 'two', 'three', 'four'];

/**
 * Component themes (from tokens)
 * Used for individual component color theming ("dial" in CMS)
 *
 * @type {string[]}
 */
export const componentThemes = Object.keys(tokens['component-themes']);
// Returns: ['one', 'two', 'three', 'four', 'five']

/**
 * Site header themes (from tokens)
 * Specific themes available for the site header component
 *
 * @type {string[]}
 */
export const siteHeaderThemes = Object.keys(tokens['site-header-themes']);

/**
 * Site header accent options
 * Accent color variations for site header
 *
 * @type {string[]}
 */
export const siteHeaderAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

/**
 * Site footer themes (from tokens)
 * Specific themes available for the site footer component
 *
 * @type {string[]}
 */
export const siteFooterThemes = Object.keys(tokens['site-footer-themes']);

/**
 * Site footer accent options
 * Accent color variations for site footer
 *
 * @type {string[]}
 */
export const siteFooterAccents = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
];

/**
 * Border thickness options (from tokens)
 * Available border thickness values for components
 *
 * @type {string[]}
 */
export const borderThicknessOptions = Object.keys(tokens.border.thickness);
// Returns: ['0', '1', '2', '4', '8', '16', '24', '32']
