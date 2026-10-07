/**
 * Converts a componentProps YAML definition to Storybook argTypes.
 *
 * Handles: name, description, options, control type, labels, fixed,
 * table.category (Required/Optional), table.defaultValue, and table.type.
 *
 * `labels` is an optional map of option value to display label. It becomes
 * `control.labels`, so the Controls panel shows the words editors see in
 * Drupal while the stored option values stay unchanged. It needs `control`.
 *
 * `fixed` marks a value Drupal hardcodes. It disables the control and shows
 * the fixed value as the docs-table default: the text itself, or `default`
 * when `fixed: true`. `default` still seeds the story arg, so the story
 * renders the production value.
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
/**
 * The default a docs table shows for a prop: its `fixed` text, else `default`.
 *
 * @param {Object} prop - One componentProps YAML entry
 * @returns {*} The value to display, or undefined
 */
export function shownDefault(prop) {
  return prop.fixed !== undefined && prop.fixed !== true
    ? prop.fixed
    : prop.default;
}

export function toArgTypes(props) {
  return Object.entries(props).reduce((acc, [key, prop]) => {
    if (prop.twigOnly) return acc;
    acc[key] = {
      name: prop.name,
      description: prop.description,
      ...(prop.options ? { options: prop.options } : {}),
      ...(prop.fixed ? { control: false } : {}),
      ...(prop.control && !prop.fixed
        ? {
            control: {
              type: prop.control,
              ...(prop.labels ? { labels: prop.labels } : {}),
            },
          }
        : {}),
      table: {
        category: prop.required ? 'Required' : 'Optional',
        defaultValue:
          shownDefault(prop) !== undefined
            ? { summary: String(shownDefault(prop)) }
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
 * Uses `controlDefault` if present (seeds the Storybook control without
 * appearing in the docs table), otherwise falls back to `default`.
 * Only includes keys where at least one of those fields is defined.
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
    if (prop.twigOnly) return acc;
    if (prop.controlDefault !== undefined) acc[key] = prop.controlDefault;
    else if (prop.default !== undefined) acc[key] = prop.default;
    return acc;
  }, {});
}
