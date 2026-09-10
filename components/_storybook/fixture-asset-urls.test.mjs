/**
 * Fails if a fixture or template references a root-absolute asset URL that no
 * Storybook static mount serves.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/fixture-asset-urls.test.mjs
 *
 * Emulsify Core mounts the project's `assets/` directory at `/assets` and mounts
 * nothing at a bare `/images/` -- see `buildAssetStaticDirs()` in
 * `@emulsify/core/.storybook/main-static-assets.js`. A URL written as
 * `/images/foo.png` therefore 404s even though `assets/images/foo.png` exists on
 * disk, and a 404 placeholder collapses the story's rendered height rather than
 * failing the build. This guard turns that silent visual break into a test failure.
 *
 * `assets/images/placeholders/README.md` is the rationale for the placeholder
 * images themselves; this file is only the enforcement.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { componentTextFiles, projectRoot } from './component-files.mjs';

const selfPath = fileURLToPath(import.meta.url);

/**
 * URL prefix -> the source directory Storybook serves it from. Deliberately a
 * restatement of `buildAssetStaticDirs()` rather than an import of it: that
 * function also mounts `dist/assets` at `/assets` and at `/`, so deriving from it
 * would accept any URL that happens to exist in a built `dist/` and make this
 * guard strictly weaker. Checking source only keeps it tight.
 */
const STATIC_MOUNTS = [{ urlPrefix: '/assets/', directory: 'assets' }];

/**
 * URLs with no source file because the build generates them, served through the
 * `dist/assets` mounts. Without this, a fixture using the sprite would be reported
 * as unserved even though Storybook serves it fine.
 */
const BUILD_GENERATED_URLS = new Set([
  // vite-plugin-svg-sprite builds this from assets/icons/*.svg.
  '/assets/icons.svg',
]);

const IMAGE_EXTENSIONS = 'png|jpe?g|gif|svg|webp|avif';

/**
 * Root-absolute image URLs, as they appear inside a quoted fixture value, a
 * `src`/`href` attribute, or one candidate of a `srcset` list. The leading guard
 * keeps protocol-relative third-party URLs (`//embed.example.com/x.svg`) out,
 * since those are not ours to resolve.
 */
const ABSOLUTE_IMAGE_URL = new RegExp(
  `(?:^|[^/A-Za-z0-9_.-])(/[A-Za-z0-9_./@-]+\\.(?:${IMAGE_EXTENSIONS}))`,
  'g',
);

/**
 * @param {string} url - Root-absolute URL found in a component file.
 * @returns {boolean} Whether Storybook can serve it.
 */
function isServed(url) {
  if (BUILD_GENERATED_URLS.has(url)) return true;

  const mount = STATIC_MOUNTS.find(({ urlPrefix }) =>
    url.startsWith(urlPrefix),
  );
  if (!mount) return false;

  const relativePath = url.slice(mount.urlPrefix.length);
  return existsSync(path.join(projectRoot, mount.directory, relativePath));
}

/**
 * @returns {string[]} One sorted report line per offending URL, naming the files
 *   that reference it. Empty when everything resolves.
 */
function unservedUrlReport() {
  const byUrl = new Map();

  componentTextFiles(selfPath).forEach((file) => {
    const contents = readFileSync(file, 'utf8');

    [...contents.matchAll(ABSOLUTE_IMAGE_URL)]
      .map(([, url]) => url)
      .filter((url) => !isServed(url))
      .forEach((url) => {
        const files = byUrl.get(url) || new Set();
        files.add(path.relative(projectRoot, file));
        byUrl.set(url, files);
      });
  });

  return [...byUrl]
    .map(([url, files]) => `  ${url} <- ${[...files].sort().join(', ')}`)
    .sort();
}

test('every root-absolute image URL in a fixture or template is served by a static mount', () => {
  assert.deepEqual(
    unservedUrlReport(),
    [],
    'These image URLs are not served by any Storybook static mount, so they 404 at ' +
      'runtime. Move the file under assets/ and reference it as /assets/...',
  );
});

test('the static mount table points at directories that exist', () => {
  STATIC_MOUNTS.forEach(({ urlPrefix, directory }) => {
    assert.ok(
      existsSync(path.join(projectRoot, directory)),
      `Mount ${urlPrefix} names ${directory}/, which is missing from the project root.`,
    );
  });
});
