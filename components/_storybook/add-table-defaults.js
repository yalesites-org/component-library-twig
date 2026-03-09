/**
 * Utility to automatically add table.defaultValue.summary to argTypes based on args.
 *
 * This eliminates duplication between args and table.defaultValue in Storybook 7+.
 *
 * String type args display '-' as their default because their args values are demo
 * filler content, not true defaults. Select, boolean, and other types show their
 * actual default value. To override this behavior for a specific arg, set
 * table.defaultValue explicitly in the argType definition and it will be respected.
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
function resolveDefaultValue(key, argTypeConfig, args) {
  if (argTypeConfig.table?.defaultValue !== undefined) {
    return argTypeConfig.table.defaultValue;
  }
  if (argTypeConfig.type === 'string') {
    return { summary: '-' };
  }
  if (args[key] !== undefined) {
    return { summary: String(args[key]) };
  }
  return undefined;
}

export function addTableDefaults(argTypes, args) {
  return Object.entries(argTypes).reduce(
    (result, [key, argTypeConfig]) => ({
      ...result,
      [key]: {
        ...argTypeConfig,
        table: {
          ...argTypeConfig.table,
          defaultValue: resolveDefaultValue(key, argTypeConfig, args),
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
    updatedArgTypes[key] = {
      ...argTypeConfig,
      table: {
        ...argTypeConfig.table,
        defaultValue: resolveDefaultValue(key, argTypeConfig, args),
      },
    };
  });
  return updatedArgTypes;
}
