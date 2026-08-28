/**
 * Fails if a fixture or template references a root-absolute asset URL that no
 * Storybook static mount actually serves.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/fixture-asset-urls.test.mjs
 *
 * Emulsify Core mounts the project's `assets/` directory at `/assets` and nothing
 * else at the site root -- see `buildAssetStaticDirs()` in
 * `@emulsify/core/.storybook/main-static-assets.js`. A URL written as
 * `/images/foo.png` therefore 404s even though `assets/images/foo.png` exists on
 * disk, and a 404 placeholder collapses the story's rendered height rather than
 * failing the build. This guard turns that silent visual break into a test failure.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const selfPath = fileURLToPath(import.meta.url);
const componentsDir = path.dirname(path.dirname(selfPath));
const projectRoot = path.dirname(componentsDir);

/**
 * URL prefix -> directory that Storybook serves it from, relative to the project
 * root. Keep this in step with `buildAssetStaticDirs()`; a new static mount needs
 * an entry here before URLs under it will pass.
 */
const STATIC_MOUNTS = [{ urlPrefix: '/assets/', directory: 'assets' }];

const IMAGE_EXTENSIONS = 'png|jpe?g|gif|svg|webp|avif';

/**
 * Root-absolute image URLs, as they appear inside a quoted fixture value, a
 * `src`/`href` attribute, or one candidate of a `srcset` list. The leading `[^/]`
 * guard keeps protocol-relative third-party URLs (`//embed.example.com/x.svg`)
 * out, since those are not ours to resolve.
 */
const ABSOLUTE_IMAGE_URL = new RegExp(
  `(?:^|[^/A-Za-z0-9_.-])(/[A-Za-z0-9_./@-]+\\.(?:${IMAGE_EXTENSIONS}))`,
  'g',
);

/** Every text file under components/ that could carry an image URL. */
const componentFiles = readdirSync(componentsDir, { recursive: true })
  .filter((entry) =>
    /\.(yml|yaml|twig|js|mjs|json|mdx|md|scss|css|html)$/.test(entry),
  )
  .map((entry) => path.join(componentsDir, entry))
  .filter((file) => file !== selfPath);

/**
 * Resolves a URL to a file on disk via the static mount table.
 *
 * @param {string} url - Root-absolute URL found in a component file.
 * @returns {boolean} Whether Storybook can serve it.
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
 * @returns {Map<string, string[]>} Offending URL -> the files referencing it.
 */
function collectUnservedUrls() {
  const references = componentFiles.flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(ABSOLUTE_IMAGE_URL)].map(
      ([, url]) => ({
        url,
        file: path.relative(projectRoot, file),
      }),
    ),
  );

  return references
    .filter(({ url }) => !isServed(url))
    .reduce((offenders, { url, file }) => {
      const files = offenders.get(url) || new Set();
      files.add(file);
      return offenders.set(url, files);
    }, new Map());
}

test('every root-absolute image URL in a fixture or template is served by a static mount', () => {
  const offenders = collectUnservedUrls();
  const report = [...offenders]
    .map(([url, files]) => `  ${url} <- ${[...files].sort().join(', ')}`)
    .sort()
    .join('\n');

  assert.equal(
    offenders.size,
    0,
    `These image URLs are not served by any Storybook static mount, so they 404 at ` +
      `runtime. Move the file under assets/ and reference it as /assets/...:\n${report}`,
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
