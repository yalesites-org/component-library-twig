/**
 * Fails if any fixture or story sources a placeholder image from a remote host.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/no-third-party-images.test.mjs
 *
 * This file is the enforcement, not the rationale -- `images/placeholders/README.md`
 * explains why the images are committed and how to reference them.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** The host this guard exists for. Add a second only when one shows up. */
const BANNED_HOST = 'picsum.photos';

/** This file names the host on purpose, so it cannot police itself. */
const selfPath = fileURLToPath(import.meta.url);
const componentsDir = path.dirname(path.dirname(selfPath));

/** Every text file under components/ that could carry an image URL. */
const componentFiles = readdirSync(componentsDir, { recursive: true })
  .filter((entry) =>
    /\.(yml|yaml|twig|js|mjs|json|mdx|md|scss|css|html)$/.test(entry),
  )
  .map((entry) => path.join(componentsDir, entry))
  .filter((file) => file !== selfPath);

test('no component fixture or story references a remote placeholder-image host', () => {
  const offenders = componentFiles
    .filter((file) => readFileSync(file, 'utf8').includes(BANNED_HOST))
    .map((file) => path.relative(componentsDir, file));

  assert.deepEqual(
    offenders,
    [],
    `Placeholder images must come from images/placeholders/, not ${BANNED_HOST}.`,
  );
});
