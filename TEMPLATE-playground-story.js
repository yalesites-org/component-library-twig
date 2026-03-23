/**
 * Visreg Story Template
 *
 * This is a heavily commented template file for creating new visual regression (Visreg) stories.
 * Copy this file to create a new Visreg story and follow the inline comments.
 *
 * IMPORTANT: This file is named without ".stories.js" suffix so Storybook doesn't
 * try to load it. When copying, rename to: [component-name].visreg.stories.js
 *
 * Usage:
 * 1. Copy this file to your component directory
 * 2. Rename to: [component-name].visreg.stories.js
 * 3. Replace all [COMPONENT_NAME] placeholders with your component name
 * 4. Update imports, argTypes, and rendering logic
 * 5. Add VRT sections for all variations
 * 6. Remove the eslint-disable comment at the top
 * 7. Test in Storybook
 * 8. Lint and fix: npm run lint:js
 *
 * NOTE: This file contains placeholder code and will not run as-is.
 * It must be copied and customized for your specific component.
 */

/* eslint-disable */
// This template file contains placeholder code with intentional linting violations.
// When copying this template for a real component, remove this eslint-disable
// and fix any remaining issues.

// =============================================================================
// IMPORTS
// =============================================================================

// Import the component's Twig template
// REPLACE [component-name] with your actual component name
import componentTwig from './[component-name].twig';

// Import playground utilities for consistent VRT sections
import {
  createPlaygroundIntro,
  createVrtIntro,
  createThemeVariations,
  createVariations,
  // createThemeAccentCombinations, // Uncomment if needed
  // createSectionWrapper, // Uncomment if needed
  // createMultiColumnLayout, // Uncomment if needed
} from '../_storybook/playground-utils';

// Import theme constants (single source of truth)
import {
  sectionThemes,
  componentThemes,
  // siteHeaderThemes, // Uncomment if needed
  // siteHeaderAccents, // Uncomment if needed
  // borderThicknessOptions, // Uncomment if needed
} from '../_storybook/theme-constants';

// Import YAML-driven props (recommended for new stories)
// import { toArgTypes, toArgs } from '../_storybook/component-props';
// import componentProps from './[component-name]-props.yml';
//
// Then in export default:
//   argTypes: toArgTypes(componentProps),
//   args: toArgs(componentProps),
//
// See components/_storybook/README.md for full YAML props documentation.

// Import icon utilities if component uses icons
// import { createIconMapping, hasIcon } from '../_storybook/icon-utils';
// import iconsData from './[component-name]-icons.yml';

// Import data files if you have complex config
// import configData from './[component-name]-config.yml';

// Import VRT combinations if needed
// import vrtData from '../_storybook/vrt-combinations.yml';

// Import design tokens if needed for dynamic data
// import tokens from '@yalesites-org/tokens/build/json/tokens.json';

// =============================================================================
// ICON MAPPING (if component uses icons)
// =============================================================================

// Uncomment and customize if component has icon controls:
// const iconMapping = createIconMapping(iconsData);

// =============================================================================
// STORY CONFIGURATION
// =============================================================================

export default {
  // Story path in Storybook sidebar
  title: 'Category/[COMPONENT_NAME]/Visreg',

  // Modern argTypes definition (controls configuration)
  argTypes: {
    // Text input example
    heading: {
      name: 'Heading',
      type: 'string',
    },

    // Section theme select example
    section_theme: {
      name: 'Section Theme',
      description: 'Background color theme for the layout section',
      options: sectionThemes,
      control: {
        type: 'select',
      },
    },

    // Component theme (dial) select example
    component__theme: {
      name: '[COMPONENT_NAME] Theme (dial)',
      description:
        'Color accent theme for this component (from color dial in CMS)',
      options: componentThemes,
      control: {
        type: 'select',
      },
    },

    // Boolean toggle example
    // some_boolean_option: {
    //   name: 'Enable Feature',
    //   type: 'boolean',
    // },

    // Radio buttons example
    // variation: {
    //   name: 'Variation',
    //   options: ['basic', 'advanced', 'custom'],
    //   control: {
    //     type: 'radio',
    //   },
    // },

    // Icon select example (if using icons)
    // icon: {
    //   name: 'Icon',
    //   options: Object.keys(iconMapping),
    //   mapping: iconMapping,
    //   control: {
    //     type: 'select',
    //   },
    // },

    // Number input example
    // count: {
    //   name: 'Item Count',
    //   control: {
    //     type: 'number',
    //     min: 1,
    //     max: 10,
    //   },
    // },

    // Textarea example
    // description: {
    //   name: 'Description',
    //   control: {
    //     type: 'text',
    //   },
    // },
  },

  // DEFAULT VALUES (modern approach - use args, not defaultValue in argTypes)
  args: {
    heading: 'Default Heading Text',
    section_theme: 'one',
    component__theme: 'one',
    // some_boolean_option: false,
    // variation: 'basic',
    // icon: '- None -',
    // count: 3,
    // description: 'Default description text',
  },

  // Story-level parameters
  parameters: {
    layout: 'fullscreen', // Use fullscreen for most playground stories
  },
};

// =============================================================================
// VISREG STORY EXPORT
// =============================================================================

/**
 * Visreg Story
 *
 * This is the main visual regression (Visreg) story function. It receives all args from controls
 * and renders both:
 * 1. Interactive section (responds to controls)
 * 2. VRT sections (static, all variations for visual regression testing)
 */
export const Visreg = ({
  // Destructure all args from controls
  heading,
  section_theme,
  component__theme,
  // some_boolean_option,
  // variation,
  // icon,
  // count,
  // description,
}) => {
  // ---------------------------------------------------------------------------
  // DATA PREPARATION
  // ---------------------------------------------------------------------------

  // Build the component configuration object
  // This is passed to the Twig template
  const componentConfig = {
    heading,
    component__theme,
    // Add other component-specific properties here
    // Replace 'component' with your actual component name, e.g.:
    // accordion__theme: component__theme,
    // accordion__variation: variation,
    // accordion__icon: hasIcon(icon) ? icon : null,
    // accordion__count: count,
    // accordion__description: description,
  };

  // If using external config data, merge it:
  // const componentConfig = {
  //   ...configData.baseConfig,
  //   heading,
  //   [component_name]__theme: component__theme,
  // };

  // ---------------------------------------------------------------------------
  // RENDER: Return HTML string
  // ---------------------------------------------------------------------------

  return `
    <!-- ================================================================== -->
    <!-- INTERACTIVE SECTION                                                -->
    <!-- This section responds to Storybook controls                        -->
    <!-- ================================================================== -->

    ${createPlaygroundIntro(
      'This playground allows you to explore all variations of the [COMPONENT_NAME] component. Use the controls below to customize the component, then scroll down to see all theme variations for visual regression testing.',
    )}

    <!-- Wrapper with global theme for interactive section -->
    <div class="wrap-for-global-theme" data-global-theme="${section_theme}">
      ${componentTwig(componentConfig)}
    </div>

    <!-- ================================================================== -->
    <!-- VRT DIVIDER                                                        -->
    <!-- Visual separator between interactive controls and VRT sections     -->
    <!-- Uses createVrtIntro() for consistent styling across stories       -->
    <!-- ================================================================== -->

    ${createVrtIntro()}

    <!-- ================================================================== -->
    <!-- VRT SECTIONS                                                       -->
    <!-- Static sections showing all variations for visual regression       -->
    <!-- ================================================================== -->

    <!-- Section Theme Variations -->
    ${createThemeVariations(
      (theme) =>
        componentTwig({
          ...componentConfig,
          // Optionally override values for VRT
          // heading: 'VRT Heading',
        }),
      sectionThemes,
      'All Section Theme Variations',
      'Below are all section theme variations for visual regression testing.',
      'Section Theme',
    )}

    <!-- Component Theme (Dial) Variations -->
    ${createThemeVariations(
      (theme) =>
        componentTwig({
          ...componentConfig,
          component__theme: theme,
          // Replace 'component' with your actual component name, e.g.:
          // accordion__theme: theme,
        }),
      componentThemes,
      'All Component Theme Variations',
      'Below are all component theme (dial) variations.',
      'Component Theme',
    )}

    <!-- Additional VRT Sections as Needed -->
    <!--
    Uncomment and customize based on your component's variations:

    ${createVariations(
      (layout) =>
        componentTwig({
          ...componentConfig,
          component__layout: layout,
          // Replace 'component' with your actual component name, e.g.:
          // accordion__layout: layout,
        }),
      ['fifty-fifty', 'seventy-thirty', 'thirty-thirty-thirty'],
      'All Layout Variations',
      'Layout',
    )}

    ${createThemeAccentCombinations(
      (theme, accent) =>
        componentTwig({
          ...componentConfig,
          component__theme: theme,
          component__accent: accent,
          // Replace 'component' with your actual component name, e.g.:
          // site_header__theme: theme,
          // site_header__accent: accent,
        }),
      vrtData.themeAccentPairs,
      'All Theme & Accent Combinations',
    )}
    -->
  `;
};

// =============================================================================
// NOTES
// =============================================================================

/**
 * TESTING CHECKLIST:
 * □ Story loads without errors
 * □ All controls work and update the interactive section
 * □ All VRT sections render correctly
 * □ No console errors
 * □ Linting passes (npm run lint:js)
 *
 * VRT COVERAGE CHECKLIST (see components/_storybook/TESTING.md):
 * □ All section themes tested
 * □ All component themes tested
 * □ All major variations tested (layouts, positions, etc.)
 * □ Theme + variation combinations tested where applicable
 *
 * PERFORMANCE:
 * - If VRT sections cause performance issues, consider reducing combinations
 * - Focus on representative samples rather than exhaustive permutations
 *
 * COMPONENT-SPECIFIC LOGIC:
 * - Keep component-specific logic in this story file with good comments
 * - Only extract truly reusable patterns to utility functions
 * - When in doubt, prefer clarity over abstraction
 */
