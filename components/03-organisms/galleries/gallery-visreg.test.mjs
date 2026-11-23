/**
 * Guards visual regression coverage of the gallery modal and its caption band.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/03-organisms/galleries/gallery-visreg.test.mjs
 *
 * Gallery captions only render inside the modal, and the modal is closed in a
 * freshly rendered story. A visreg story that forgets to open it still builds
 * and still snapshots: it just captures the closed grid, so every caption
 * change ships without a visual check (YaleSites-Internal#1773). Nothing in a
 * Storybook build fails when that happens, which is why it is asserted here.
 *
 * This is a source-text scan, like the other visreg guards in
 * `components/_storybook/`, because the story file imports `.twig` and
 * `.yml`, which do not load outside Vite.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const galleriesDir = path.dirname(fileURLToPath(import.meta.url));
const storyFile = path.join(galleriesDir, 'gallery.visreg.stories.js');

const source = () => readFileSync(storyFile, 'utf8');

/** Story export names in a source file, in declaration order. */
const storyExports = (text) =>
  [...text.matchAll(/^export const (\w+) =/gm)].map((m) => m[1]);

test('the gallery has a visreg story file', () => {
  assert.ok(
    existsSync(storyFile),
    'expected components/03-organisms/galleries/gallery.visreg.stories.js',
  );
});

test('the visreg stories load the behavior that opens the modal', () => {
  assert.match(
    source(),
    /^import '\.\/media-grid\/yds-media-grid-interactive';$/m,
    'without the interactive behavior the modal and caption toggle never work',
  );
});

test('every gallery visreg story opens the modal before it is captured', () => {
  const text = source();
  const exports = storyExports(text);

  assert.ok(exports.length > 0, 'found no story exports');

  exports.forEach((name) => {
    assert.match(
      text,
      new RegExp(`^${name}\\.play = \\w+;$`, 'm'),
      `"${name}" has no play function, so it would snapshot the closed grid ` +
        'and none of the captions',
    );
  });
});

test('both caption states are captured, each by its own opener', () => {
  const text = source();
  const exports = storyExports(text);
  const states = {
    Collapsed: 'openCaptionCollapsed',
    Expanded: 'openCaptionExpanded',
  };

  Object.entries(states).forEach(([state, opener]) => {
    const named = exports.filter((name) => name.endsWith(`Caption${state}`));

    assert.ok(named.length > 0, `expected stories named *Caption${state}`);

    // A swapped opener would pass every check above while that story silently
    // captured the other state.
    named.forEach((name) => {
      assert.match(
        text,
        new RegExp(`^${name}\\.play = ${opener};$`, 'm'),
        `"${name}" must be opened by ${opener}`,
      );
    });
  });

  assert.equal(
    exports.filter((name) => !/Caption(Collapsed|Expanded)$/.test(name)).length,
    0,
    'every story should be a collapsed or expanded caption state',
  );
});
