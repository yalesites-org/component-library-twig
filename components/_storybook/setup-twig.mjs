/**
 * Node-side Twig.js setup for unit tests that render templates.
 *
 * The Vite build has no `.storybook/setupTwig.js` any more: Storybook's Twig
 * comes from Emulsify Core plus `config/emulsify-core/storybook/preview.js`.
 * This rebuilds the same environment for `node --test`, from the same sources,
 * so a test cannot drift from how the templates are really compiled:
 *
 * - namespaces: `project.emulsify.json` `variant.structureImplementations`
 * - bem() / add_attributes() and Core's tags: `@emulsify/core/extensions/twig`
 * - Drupal filters: `twig-drupal-filters`, as Core's Drupal adapter registers
 * - getUrlType() / getAssetPath(): the project's own Storybook installers
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// The eslint import resolver does not read package `exports` maps, and Node's
// ESM resolver needs the `.js` extensions the shared config forbids.
// eslint-disable-next-line import/no-unresolved
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import twigDrupal from 'twig-drupal-filters';
/* eslint-disable import/extensions */
import twigUrl from '../../config/emulsify-core/storybook/twig-url.js';
import twigAssetPath from '../../config/emulsify-core/storybook/twig-asset-path.js';
/* eslint-enable import/extensions */

const ROOT = new URL('../../', import.meta.url);

const { variant } = JSON.parse(
  readFileSync(new URL('project.emulsify.json', ROOT), 'utf8'),
);

/** Twig namespace name => absolute directory, as Storybook resolves them. */
export const namespaces = Object.fromEntries(
  variant.structureImplementations.map(({ name, directory }) => [
    name,
    fileURLToPath(new URL(directory, ROOT)),
  ]),
);

/**
 * Configures and extends a Twig.js instance the way Storybook does.
 *
 * @param {Twig} twig - Twig.js instance to configure.
 *
 * @returns {Twig} the configured instance.
 */
export const setupTwig = (twig) => {
  twig.cache();
  registerTwigExtensions(twig);
  twigDrupal(twig);
  twigUrl(twig);
  twigAssetPath(twig);
  return twig;
};
