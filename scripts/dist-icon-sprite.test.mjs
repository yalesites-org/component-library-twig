/**
 * Guards dist/assets/icons.svg against shipping an icon more than once.
 *
 * Run after a build (see the `test:dist` npm script):
 *   node --test scripts/dist-icon-sprite.test.mjs
 *
 * The sprite plugin renames a repeated icon to `<name>-2` instead of failing,
 * so a doubled source glob still builds, every icon still renders, and the only
 * symptom is a sprite twice its size on every page. See
 * scripts/patch-emulsify-core-icon-sprite.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sprite = path.join(projectRoot, 'dist/assets/icons.svg');
const iconsDir = path.join(projectRoot, 'assets/icons');

test('dist/assets/icons.svg has exactly one symbol per source icon', () => {
  const ids = [
    ...readFileSync(sprite, 'utf8').matchAll(/<symbol\b[^>]*\bid="([^"]+)"/g),
  ].map(([, id]) => id);
  const sourceIcons = readdirSync(iconsDir, { recursive: true })
    .filter((file) => file.endsWith('.svg'))
    .map((file) => path.basename(file, '.svg'));

  // Fails on a repeated id, on the renamed copies (`angle-down-2`) the plugin
  // emits for a repeat, and on any icon missing from the sprite.
  assert.deepEqual(ids.sort(), sourceIcons.sort());
});
