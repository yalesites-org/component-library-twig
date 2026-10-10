/**
 * Fails if a fixture or template references an asset URL that will not load in
 * every place Storybook is served.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/fixture-asset-urls.test.mjs
 *
 * Emulsify Core mounts the project's `assets/` directory at `assets/` beside
 * `iframe.html` -- see `buildAssetStaticDirs()` in
 * `@emulsify/core/.storybook/main-static-assets.js` -- and mounts nothing at a
 * bare `images/`. Fixtures must reference it relatively, as `assets/...`:
 * GitHub Pages serves the build under `/component-library-twig/`, so a
 * root-absolute `/assets/foo.png` requests the domain root and 404s there even
 * though it works in dev and on Netlify. A 404 placeholder collapses the
 * story's rendered height rather than failing the build; this guard turns that
 * silent visual break into a test failure.
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
 * Relative URL prefix -> the source directory Storybook serves it from.
 * Deliberately a restatement of `buildAssetStaticDirs()` rather than an import
 * of it: that function also mounts `dist/assets`, so deriving from it would
 * accept any URL that happens to exist in a built `dist/` and make this guard
 * strictly weaker. Checking source only keeps it tight.
 */
const STATIC_MOUNTS = [{ urlPrefix: 'assets/', directory: 'assets' }];

const ASSET_EXTENSIONS = 'png|jpe?g|gif|svg|webp|avif|mp4|webm';

/**
 * Root-absolute URLs and `assets/`-relative URLs, as they appear inside a
 * quoted fixture value, a `src`/`href` attribute, or one candidate of a `srcset`
 * list. The leading guard keeps protocol-relative third-party URLs
 * (`//embed.example.com/x.svg`) and module imports (`../../assets/x.svg`) out,
 * since those are not fetched from a static mount.
 */
const ASSET_URL = new RegExp(
  `(?:^|[^/A-Za-z0-9_.-])((?:/|assets/)[A-Za-z0-9_./@-]+\\.(?:${ASSET_EXTENSIONS}))`,
  'g',
);

/**
 * @param {string} url - Asset URL found in a component file.
 * @returns {boolean} Whether Storybook serves it under any deploy path.
 */
function isServed(url) {
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

    [...contents.matchAll(ASSET_URL)]
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

test('every asset URL in a fixture or template is relative and served by a static mount', () => {
  assert.deepEqual(
    unservedUrlReport(),
    [],
    'These asset URLs are not served by any Storybook static mount, so they 404 at ' +
      'runtime. Move the file under assets/ and reference it as assets/... with no ' +
      'leading slash, so it also resolves under the GitHub Pages subpath.',
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
