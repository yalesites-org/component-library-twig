/**
 * Guards the Wrapped Image size option (YaleSites-Internal#1954).
 *
 * Large is today's half-width image and must stay the default, so every
 * existing block (which passes no size) renders exactly as before. Small is
 * a quarter of the block width (in the SCSS, checked visually). Both sizes
 * need a visreg story.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/wrapped-image/wrapped-image-size.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import Twig from 'twig';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));

setupTwig(Twig);

const template = Twig.twig({
  path: path.join(dir, 'yds-wrapped-image.twig'),
  namespaces,
  async: false,
  rethrow: true,
});

/** The data-wrapped-image-size attribute the component renders. */
const sizeAttribute = (props) => {
  const match = template
    .render({ wrapped_image__content: '<p>Text</p>', ...props })
    .match(/data-wrapped-image-size="([^"]*)"/);
  return match ? match[1] : null;
};

test('a block that passes no size renders Large', () => {
  assert.equal(sizeAttribute({}), 'large');
});

test('an empty size from Drupal renders Large', () => {
  assert.equal(sizeAttribute({ wrapped_image__size: '' }), 'large');
});

test('Small is passed through', () => {
  assert.equal(sizeAttribute({ wrapped_image__size: 'small' }), 'small');
});

test('the visreg stories cover both sizes', () => {
  const stories = readFileSync(
    path.join(dir, 'wrapped-image.visreg.stories.js'),
    'utf8',
  );
  assert.match(stories, /wrapped_image__size: size,/);
  assert.match(
    stories,
    /export const SizeLarge = \(\) => renderSize\('large'\);/,
  );
  assert.match(
    stories,
    /export const SizeSmall = \(\) => renderSize\('small'\);/,
  );
});
