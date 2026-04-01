/**
 * Converts a componentProps YAML definition to Storybook argTypes.
 *
 * Handles: name, description, options, control type, table.category
 * (Required/Optional), table.defaultValue, and table.type.
 *
 * @param {Object} props - Parsed YAML componentProps object
 * @returns {Object} Storybook-compatible argTypes
 *
 * @example
 * import componentProps from './accordion-props.yml';
 * import { toArgTypes } from '../_storybook/component-props';
 *
 * export default {
 *   title: 'Molecules/Accordion',
 *   argTypes: toArgTypes(componentProps),
 * };
 */
export function toArgTypes(props) {
  return Object.entries(props).reduce((acc, [key, prop]) => {
    acc[key] = {
      name: prop.name,
      description: prop.description,
      ...(prop.options ? { options: prop.options } : {}),
      ...(prop.control ? { control: { type: prop.control } } : {}),
      table: {
        category: prop.required ? 'Required' : 'Optional',
        defaultValue:
          prop.default !== undefined
            ? { summary: String(prop.default) }
            : undefined,
        type: prop.type ? { summary: prop.type } : undefined,
      },
    };
    return acc;
  }, {});
}

/**
 * Extracts default args from a componentProps YAML definition.
 *
 * Only includes keys that have a `default` field defined.
 *
 * @param {Object} props - Parsed YAML componentProps object
 * @returns {Object} Storybook-compatible args
 *
 * @example
 * import componentProps from './accordion-props.yml';
 * import { toArgs } from '../_storybook/component-props';
 *
 * export default {
 *   title: 'Molecules/Accordion',
 *   args: toArgs(componentProps),
 * };
 */
export function toArgs(props) {
  return Object.entries(props).reduce((acc, [key, prop]) => {
    if (prop.default !== undefined) acc[key] = prop.default;
    return acc;
  }, {});
}
