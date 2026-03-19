/**
 * Playground Story Utilities
 *
 * Simplified utility functions for creating consistent playground stories.
 * These utilities reduce boilerplate and ensure consistent patterns across all stories.
 *
 * Design Principles:
 * - Simple to read and understand
 * - Well-documented with JSDoc and examples
 * - Easy to use with clear function names
 * - Not overly abstract - component-specific logic stays in stories
 *
 * Usage:
 * import { createPlaygroundIntro, createThemeVariations } from '../_storybook/playground-utils.js';
 */

/**
 * Creates a standard intro section for playground stories
 *
 * Provides consistent formatting with a "Playground" heading and description text
 * at the top of playground stories.
 *
 * @param {string} description - Description text explaining the playground story purpose
 * @returns {string} HTML string for intro section
 *
 * @example
 * const intro = createPlaygroundIntro(
 *   'This playground allows you to explore all variations of the accordion component.'
 * );
 */
export const createPlaygroundIntro = (description) => `
  <div class="sb-section__container">
    <h2 class="sb-section__heading">Playground</h2>
    <p class="sb-section__description">${description}</p>
  </div>
`;

/**
 * Creates a labeled transition to the VRT section
 *
 * Provides a visual divider and heading to separate the playground section
 * from visual regression testing variations.
 *
 * @returns {string} HTML string for VRT section intro
 *
 * @example
 * const vrtIntro = createVrtIntro();
 */
export const createVrtIntro = () => `
  <hr class="sb-section__divider">
  <h2 class="sb-section__heading">Visual Regression Testing</h2>
`;

/**
 * Creates theme variation sections for visual regression testing
 *
 * Generates a series of component variations, one for each theme, with consistent
 * formatting and labeling. This is the most commonly used utility for VRT sections.
 *
 * @param {Function} renderFn - Function that renders the component, receives theme as parameter
 * @param {string[]} themes - Array of theme values to iterate over
 * @param {string} title - Section heading text
 * @param {string} [description] - Optional description text below the heading
 * @param {string} [label='Theme'] - Label prefix for each variation (e.g., 'Theme', 'Section Theme')
 * @returns {string} HTML string with all theme variations
 *
 * @example
 * // Basic usage with section themes
 * const vrtSection = createThemeVariations(
 *   (theme) => accordionTwig({ ...config, theme }),
 *   sectionThemes,
 *   'All Section Theme Variations',
 *   'Below are all theme variations for visual regression testing.',
 *   'Section Theme'
 * );
 *
 * @example
 * // With component themes
 * const vrtSection = createThemeVariations(
 *   (theme) => cardTwig({ ...config, card__theme: theme }),
 *   componentThemes,
 *   'All Component Theme Variations',
 *   undefined,
 *   'Component Theme'
 * );
 */
export const createThemeVariations = (
  renderFn,
  themes,
  title,
  description = '',
  label = 'Theme',
) => `
  <h2 class="sb-section__heading">${title}</h2>
  ${description ? `<p class="sb-section__description">${description}</p>` : ''}
  <hr class="sb-section__divider">
  ${themes
    .map(
      (theme) => `
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">${label}: ${theme}</h3>
      ${renderFn(theme)}
    </div>
  `,
    )
    .join('')}
`;

/**
 * Creates generic variation sections for VRT
 *
 * Similar to createThemeVariations but more generic - works with any type of variation
 * (layouts, positions, sizes, etc.).
 *
 * @param {Function} renderFn - Function that renders the component, receives variation value
 * @param {Array} variations - Array of variation values (strings, numbers, or objects)
 * @param {string} title - Section heading text
 * @param {string} [label='Variation'] - Label prefix for each variation
 * @returns {string} HTML string with all variations
 *
 * @example
 * // Layout variations
 * const layoutVRT = createVariations(
 *   (layout) => componentTwig({ ...config, layout }),
 *   ['fifty-fifty', 'thirty-thirty-thirty', 'seventy-thirty'],
 *   'All Layout Variations',
 *   'Layout'
 * );
 *
 * @example
 * // Position variations
 * const positionVRT = createVariations(
 *   (position) => menuTwig({ ...config, position }),
 *   ['left', 'center', 'right'],
 *   'All Position Variations',
 *   'Position'
 * );
 */
export const createVariations = (
  renderFn,
  variations,
  title,
  label = 'Variation',
) => `
  <h2 class="sb-section__heading">${title}</h2>
  <hr class="sb-section__divider">
  ${variations
    .map(
      (variation) => `
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">${label}: ${variation}</h3>
      ${renderFn(variation)}
    </div>
  `,
    )
    .join('')}
`;

/**
 * Creates theme and accent combination sections for VRT
 *
 * Specialized utility for components that support both theme and accent colors
 * (like site-header and site-footer). Generates all specified theme/accent pairings.
 *
 * @param {Function} renderFn - Function that renders component, receives theme and accent
 * @param {Array<{theme: string, accent: string}>} combinations - Array of theme/accent pairs
 * @param {string} title - Section heading text
 * @returns {string} HTML string with all theme/accent combinations
 *
 * @example
 * import vrtData from '../_storybook/vrt-combinations.yml';
 *
 * const themeAccentVRT = createThemeAccentCombinations(
 *   (theme, accent) => siteHeaderTwig({
 *     ...config,
 *     site_header__theme: theme,
 *     site_header__accent: accent
 *   }),
 *   vrtData.themeAccentPairs,
 *   'All Theme & Accent Combinations'
 * );
 */
export const createThemeAccentCombinations = (
  renderFn,
  combinations,
  title,
) => `
  <h2 class="sb-section__heading">${title}</h2>
  <hr class="sb-section__divider">
  ${combinations
    .map(
      ({ theme, accent }) => `
    <div class="sb-section__container">
      <h3 class="sb-section__subheading">Theme: ${theme} / Accent: ${accent}</h3>
      ${renderFn(theme, accent)}
    </div>
  `,
    )
    .join('')}
`;

/**
 * Creates a section wrapper for components
 *
 * Provides consistent wrapper markup for components within a themed section.
 * This is commonly used when testing components within different section backgrounds.
 *
 * @param {string} theme - Section theme value
 * @param {string} content - Component HTML to wrap
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.width='site'] - Section width ('site', 'content', 'max')
 * @param {string} [options.primaryWidth] - Optional primary column width percentage
 * @param {boolean} [options.hasDivider=false] - Whether section has a divider
 * @returns {string} HTML string with wrapped component
 *
 * @example
 * const wrapped = createSectionWrapper(
 *   'one',
 *   accordionTwig(config),
 *   { width: 'site', primaryWidth: '100%' }
 * );
 *
 * @example
 * // Minimal usage with defaults
 * const wrapped = createSectionWrapper('two', componentTwig(config));
 */
export const createSectionWrapper = (theme, content, options = {}) => {
  const { width = 'site', primaryWidth, hasDivider = false } = options;

  const primaryStyle = primaryWidth ? ` style="width: ${primaryWidth}"` : '';

  return `
    <div data-component-has-divider="${hasDivider}"
         data-component-theme="${theme}"
         data-component-width="${width}"
         class="yds-layout"
         data-embedded-components=""
         data-spotlights-position="first">
      <div class="yds-layout__inner">
        <div class="yds-layout__primary"${primaryStyle}>
          ${content}
        </div>
      </div>
    </div>
  `;
};

/**
 * Creates a multi-column layout wrapper
 *
 * Specialized utility for testing components in multi-column layouts.
 * Used primarily for components like image, text-with-image, etc.
 *
 * @param {string} layout - Layout type ('fifty-fifty', 'seventy-thirty', etc.)
 * @param {string} primary - Primary column content
 * @param {string} [secondary] - Secondary column content
 * @param {string} [tertiary] - Tertiary column content (for three-column layouts)
 * @param {string} [theme='one'] - Section theme
 * @returns {string} HTML string with multi-column layout
 *
 * @example
 * const multiCol = createMultiColumnLayout(
 *   'fifty-fifty',
 *   imageTwig({ ...config, position: 'left' }),
 *   textTwig(textConfig),
 *   undefined,
 *   'two'
 * );
 */
export const createMultiColumnLayout = (
  layout,
  primary,
  secondary = '',
  tertiary = '',
  theme = 'one',
) => `
  <div data-component-theme="${theme}"
       data-component-width="site"
       data-layout="${layout}"
       class="yds-layout yds-layout--${layout}">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${primary}
      </div>
      ${
        secondary ? `<div class="yds-layout__secondary">${secondary}</div>` : ''
      }
      ${tertiary ? `<div class="yds-layout__tertiary">${tertiary}</div>` : ''}
    </div>
  </div>
`;

/**
 * Gets section theme array
 *
 * Simple getter function that returns the section themes array.
 * Useful when you need the themes array without importing theme-constants directly.
 *
 * @returns {string[]} Array of section theme values
 *
 * @example
 * const themes = getSectionThemes();
 * // Returns: ['default', 'one', 'two', 'three', 'four']
 */
export const getSectionThemes = () => [
  'default',
  'one',
  'two',
  'three',
  'four',
];

/**
 * Gets component theme array
 *
 * Simple getter function that returns component themes from tokens.
 * Useful when you need the themes array without importing theme-constants directly.
 *
 * @returns {string[]} Array of component theme values
 *
 * @example
 * const themes = getComponentThemes();
 * // Returns: ['one', 'two', 'three', 'four', 'five']
 */
export const getComponentThemes = () => {
  // Import tokens locally to avoid top-level import issues
  // eslint-disable-next-line global-require
  const tokens = require('@yalesites-org/tokens/build/json/tokens.json');
  return Object.keys(tokens['component-themes']);
};
