/**
 * Icon Utilities
 *
 * Shared utilities for handling icons in Storybook playground stories.
 * Provides consistent patterns for icon selection controls and icon validation.
 *
 * Usage:
 * import { createIconMapping, hasIcon } from '../_storybook/icon-utils.js';
 */

/**
 * Creates icon display-to-value mapping for Storybook controls
 *
 * Converts icon YML data into a mapping object suitable for Storybook select controls.
 * The mapping shows human-readable names in the UI but passes actual icon values to components.
 *
 * @param {Object} iconsData - Icons data from YML file (should have an 'icons' property)
 * @param {boolean} [includeNone=true] - Whether to include "- None -" option
 * @returns {Object} Mapping object for Storybook select control
 *
 * @example
 * import iconsData from './component-icons.yml';
 *
 * const iconMapping = createIconMapping(iconsData);
 * // Returns: { '- None -': '- None -', 'Calendar Icon': 'calendar', ... }
 *
 * // Use in argTypes:
 * argTypes: {
 *   icon: {
 *     name: 'Icon',
 *     options: Object.keys(iconMapping),
 *     mapping: iconMapping,
 *     control: { type: 'select' }
 *   }
 * }
 */
export const createIconMapping = (iconsData, includeNone = true) => {
  const mapping = {};

  // Add "None" option if requested
  if (includeNone) {
    mapping['- None -'] = '- None -';
  }

  // Add icons from YML data
  if (iconsData.icons && typeof iconsData.icons === 'object') {
    Object.entries(iconsData.icons).forEach(([iconName, humanReadableName]) => {
      mapping[humanReadableName] = iconName;
    });
  }

  return mapping;
};

/**
 * Checks if an icon is selected (not none/empty)
 *
 * Useful for conditional rendering when an icon might be optional.
 *
 * @param {string} iconName - Icon value from control
 * @returns {boolean} True if icon is selected (not none/empty)
 *
 * @example
 * if (hasIcon(args.icon)) {
 *   // Render component with icon
 * } else {
 *   // Render component without icon
 * }
 *
 * @example
 * const iconClass = hasIcon(icon) ? 'has-icon' : '';
 */
export const hasIcon = (iconName) =>
  iconName && iconName !== '- None -' && iconName !== '';

/**
 * Gets icon control configuration for argTypes
 *
 * Returns a standardized control configuration for icon selection.
 * This ensures consistent icon control behavior across all stories.
 *
 * @param {Object} iconMapping - Icon mapping from createIconMapping
 * @param {string} [label='Icon'] - Label for the control
 * @param {string} [defaultValue='- None -'] - Default selected value
 * @returns {Object} Control configuration for argTypes
 *
 * @example
 * import iconsData from './component-icons.yml';
 *
 * const iconMapping = createIconMapping(iconsData);
 *
 * argTypes: {
 *   icon: getIconControl(iconMapping, 'Select Icon', '- None -')
 * }
 */
export const getIconControl = (
  iconMapping,
  label = 'Icon',
  defaultValue = '- None -',
) => ({
  name: label,
  options: Object.keys(iconMapping),
  mapping: iconMapping,
  control: {
    type: 'select',
  },
  table: {
    defaultValue: { summary: defaultValue },
  },
});
