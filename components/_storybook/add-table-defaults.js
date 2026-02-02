/**
 * Utility to automatically add table.defaultValue.summary to argTypes based on args.
 *
 * This eliminates duplication between args and table.defaultValue in Storybook 7+.
 *
 * @param {Object} argTypes - The argTypes object
 * @param {Object} args - The args object containing default values
 * @returns {Object} - Updated argTypes with table.defaultValue added
 *
 * @example
 * import { addTableDefaults } from '../_storybook/add-table-defaults';
 *
 * export default {
 *   title: 'Atoms/Divider',
 *   argTypes: addTableDefaults({
 *     thickness: {
 *       name: 'Line thickness',
 *       type: 'select',
 *       options: ['hairline', '1', '2'],
 *     },
 *   }, {
 *     thickness: 'hairline',
 *   }),
 * };
 */
export function addTableDefaults(argTypes, args) {
  return Object.entries(argTypes).reduce(
    (result, [key, argTypeConfig]) => ({
      ...result,
      [key]: {
        ...argTypeConfig,
        table: {
          ...argTypeConfig.table,
          defaultValue:
            args[key] !== undefined
              ? { summary: String(args[key]) }
              : argTypeConfig.table?.defaultValue,
        },
      },
    }),
    {},
  );
}

/**
 * Alternative: Update argTypes in place (mutates the object)
 * Use this if you want to update existing argTypes after they're defined
 */
export function updateArgTypesWithDefaults(argTypes, args) {
  const updatedArgTypes = { ...argTypes };
  Object.entries(updatedArgTypes).forEach(([key, argTypeConfig]) => {
    if (args[key] !== undefined) {
      updatedArgTypes[key] = {
        ...argTypeConfig,
        table: {
          ...argTypeConfig.table,
          defaultValue: { summary: String(args[key]) },
        },
      };
    }
  });
  return updatedArgTypes;
}
