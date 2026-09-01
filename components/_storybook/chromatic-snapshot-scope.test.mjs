/**
 * Fails if the Chromatic snapshot set drifts away from "exactly the visreg stories".
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/chromatic-snapshot-scope.test.mjs
 *
 * This file is the enforcement, not the rationale -- STORYBOOK.md explains the
 * default-off/opt-in mechanism and why the snapshot set is scoped at all.
 *
 * The scoping is two halves that only work together, and both fail silently on
 * their own: without the project-level `disableSnapshot: true` in the Storybook
 * preview every new story joins the snapshot set, and without a file's opt-in
 * that component drops out of visual regression altogether. Neither shows up in
 * a build. The third check, tag against filename, is what makes the per-file
 * opt-in sufficient: it is only "every visreg story" if every visreg story lives
 * in a `*.visreg.stories.js` file.
 *
 * The scan is textual rather than an import because these modules cannot be
 * loaded outside the Storybook build: the preview imports `.scss` and the story
 * files import `.twig`, both of which only resolve through Vite.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import {
  VISREG_STORY_FILE,
  componentTextFiles,
  componentsDir,
  projectRoot,
} from './component-files.mjs';

/**
 * The Storybook preview Emulsify Core reads directly, and the only file whose
 * `parameters` export reaches Storybook as project-level defaults.
 */
const PREVIEW = 'config/emulsify-core/storybook/preview.js';

/** The opt-in, as written in a story file. */
const OPTS_IN = /disableSnapshot:\s*false/;

/**
 * Every story file under components/, read once. `node --test` gives this file
 * its own process but shares it across the tests below, all of which want the
 * same source text.
 */
const storySources = new Map(
  componentTextFiles()
    .filter((file) => file.endsWith('.stories.js'))
    .map((file) => [file, readFileSync(file, 'utf8')]),
);

/** Repo-relative, for readable assertion output. */
const rel = (file) => path.relative(componentsDir, file);

/**
 * Returns the body of the first `<declaration> {` object in `source`, matched by
 * counting braces. A regex cannot do this: the object is nested, so any
 * non-greedy match stops at the first inner `}` -- `parameters` in the preview
 * closes several keys before `chromatic` is reached.
 *
 * @param {string} source - File contents.
 * @param {string} declaration - Literal text that precedes the opening brace.
 * @returns {string|null} The object body, or null if the declaration is absent.
 */
function objectBody(source, declaration) {
  const start = source.indexOf(declaration);
  if (start === -1) return null;

  const open = source.indexOf('{', start);
  if (open === -1) return null;

  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  return null;
}

test('the scan finds the story files, so the checks below are looking at something', () => {
  const files = [...storySources.keys()];

  assert.ok(
    files.length > 100 && files.some((file) => VISREG_STORY_FILE.test(file)),
    `Found ${files.length} story files under ${componentsDir}; the tree layout must have moved, and the checks below would pass without reading anything.`,
  );
});

test('the Storybook preview turns snapshots off for every story by default', () => {
  const preview = readFileSync(path.join(projectRoot, PREVIEW), 'utf8');
  const parameters = objectBody(preview, 'export const parameters =');

  assert.ok(
    parameters,
    `${PREVIEW} no longer exports a \`parameters\` object literal. Project-level defaults reach Storybook only through that export.`,
  );
  assert.match(
    objectBody(parameters, 'chromatic:') ?? '',
    /disableSnapshot:\s*true/,
    `${PREVIEW} must set \`chromatic: { disableSnapshot: true }\` so stories are snapshotted only when they opt in.`,
  );
});

test('every visreg story file opts back in to snapshots', () => {
  // Narrowed to the default export on purpose: the opt-in has to sit on the meta
  // to cover every story in the file. On a single story export it would leave
  // that file's other stories out of visual regression, which a whole-file scan
  // would read as opted in.
  const missing = [...storySources]
    .filter(([file]) => VISREG_STORY_FILE.test(file))
    .filter(
      ([, source]) => !OPTS_IN.test(objectBody(source, 'export default') ?? ''),
    )
    .map(([file]) => rel(file));

  assert.deepEqual(
    missing,
    [],
    'These visreg story files would never be snapshotted. Add `chromatic: { disableSnapshot: false }` to the `parameters` of their default export.',
  );
});

test('no story outside the visreg set opts in to snapshots', () => {
  // Whole-file scan, unlike the check above: here any opt-in is wrong, on the
  // meta or on a single story export.
  const optedIn = [...storySources]
    .filter(([file]) => !VISREG_STORY_FILE.test(file))
    .filter(([, source]) => OPTS_IN.test(source))
    .map(([file]) => rel(file));

  assert.deepEqual(
    optedIn,
    [],
    'Only visual-regression stories belong in the snapshot set. Move these cases into a *.visreg.stories.js file rather than opting a documentation story in.',
  );
});

test('the visreg tag and the visreg filename stay in sync', () => {
  const mismatched = [...storySources]
    .filter(
      ([file, source]) =>
        /tags:\s*\[[^\]]*'visreg'/.test(source) !==
        VISREG_STORY_FILE.test(file),
    )
    .map(([file]) => rel(file));

  assert.deepEqual(
    mismatched,
    [],
    "The snapshot set is scoped per file, so a `tags: ['visreg']` story outside a *.visreg.stories.js file would be tagged but never snapshotted (and vice versa). Rename the file or drop the tag.",
  );
});
