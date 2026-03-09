// React is a transitive dependency via @storybook/addon-essentials, used only in
// the Storybook MDX docs layer. It cannot be added to package.json at this time.
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

/**
 * Renders a table of Twig template properties from a componentProps YAML definition.
 *
 * Displays twigProp names (snake_case with double underscores), which is what developers
 * need when building Drupal templates. Uses the `detail` field for descriptions (falls
 * back to `description`), so rich documentation can be authored in YAML without affecting
 * the terse tooltip shown in the Storybook Controls panel.
 *
 * Returns a React element for use in MDX files as a JS expression:
 *   {twigPropsTable(componentProps, 'required')}
 *
 * @param {Object} props - Parsed YAML componentProps object
 * @param {'required'|'optional'} [filter] - Show only required or optional props.
 *   If omitted, all props are shown.
 * @returns {React.ReactElement|null} Rendered table element, or null if no matching props
 *
 * @example
 * import componentProps from './accordion-props.yml';
 * import twigPropsTable from '../../_storybook/twig-props-table';
 *
 * // In MDX:
 * // {twigPropsTable(componentProps, 'required')}
 * // {twigPropsTable(componentProps, 'optional')}
 */
export default function twigPropsTable(props, filter) {
  const entries = Object.entries(props).filter(([, p]) => {
    if (filter === 'required') return p.required;
    if (filter === 'optional') return !p.required;
    return true;
  });

  if (entries.length === 0) return null;

  const e = React.createElement;

  const rows = entries.map(([key, prop]) => {
    const defaultVal = prop.default !== undefined ? String(prop.default) : '—';
    const description = prop.detail || prop.description || '—';

    return e('tr', { key }, [
      e('td', { key: 'prop' }, e('code', null, prop.twigProp)),
      e('td', { key: 'type' }, e('code', null, prop.type || '—')),
      e('td', { key: 'default' }, e('code', null, defaultVal)),
      e('td', { key: 'desc' }, description),
    ]);
  });

  return e('table', null, [
    e(
      'thead',
      { key: 'head' },
      e('tr', null, [
        e('th', { key: 'prop' }, 'Property'),
        e('th', { key: 'type' }, 'Type'),
        e('th', { key: 'default' }, 'Default'),
        e('th', { key: 'desc' }, 'Description'),
      ]),
    ),
    e('tbody', { key: 'body' }, rows),
  ]);
}
