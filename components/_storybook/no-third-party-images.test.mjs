/**
 * Fails if any fixture or story sources a placeholder image from a remote host.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/no-third-party-images.test.mjs
 *
 * This file is the enforcement, not the rationale -- `assets/images/placeholders/README.md`
 * explains why the images are committed and how to reference them.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { componentsDir, componentTextFiles } from './component-files.mjs';

/** The host this guard exists for. Add a second only when one shows up. */
const BANNED_HOST = 'picsum.photos';

/** This file names the host on purpose, so it cannot police itself. */
const selfPath = fileURLToPath(import.meta.url);

/** Every text file under components/ that could carry an image URL. */
const componentFiles = componentTextFiles(selfPath);

test('no component fixture or story references a remote placeholder-image host', () => {
  const offenders = componentFiles
    .filter((file) => readFileSync(file, 'utf8').includes(BANNED_HOST))
    .map((file) => path.relative(componentsDir, file));

  assert.deepEqual(
    offenders,
    [],
    `Placeholder images must come from assets/images/placeholders/, not ${BANNED_HOST}.`,
  );
});
