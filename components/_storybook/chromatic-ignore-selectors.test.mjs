/**
 * Fails if a Chromatic ignore selector stops matching the components it masks.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/chromatic-ignore-selectors.test.mjs
 *
 * This file is the enforcement, not the rationale -- STORYBOOK.md and the
 * comments beside each selector in the preview explain why a region is masked.
 *
 * Why it exists: a mask is defined in one file and depends on a class defined in
 * another, and nothing connects them. Rename or drop the class in a component
 * and the selector keeps parsing, keeps being sent to Chromatic, and matches
 * nothing -- so the flapping region it was hiding quietly comes back, and the
 * only symptom is an intermittent diff nobody attributes to this. Reconciling
 * the two lists is the cheapest way to notice.
 *
 * The scan is textual rather than an import because the preview imports `.scss`,
 * which only resolves through Vite.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  componentTextFiles,
  objectBody,
  projectRoot,
} from './component-files.mjs';

/** The Storybook preview whose `parameters` export reaches Storybook. */
const PREVIEW = 'config/emulsify-core/storybook/preview.js';

/**
 * Class selectors listed in the preview's `chromatic.ignoreSelectors`.
 *
 * Line comments are stripped before the quoted strings are read: each selector
 * is documented in place, and an apostrophe in that prose would otherwise be
 * picked up as the start of a selector.
 */
function ignoreSelectors() {
  const preview = readFileSync(path.join(projectRoot, PREVIEW), 'utf8');
  const parameters = objectBody(preview, 'export const parameters =') ?? '';
  const chromatic = objectBody(parameters, 'chromatic:') ?? '';
  const list = objectBody(chromatic, 'ignoreSelectors:');
  if (list === null) return null;

  return [...list.replace(/^\s*\/\/.*$/gm, '').matchAll(/'([^']+)'/g)].map(
    (match) => match[1],
  );
}

/**
 * Every component source that could define a class name.
 *
 * This file names the masked classes on purpose, so it is excluded and cannot
 * satisfy its own check.
 */
const componentSources = componentTextFiles(fileURLToPath(import.meta.url)).map(
  (file) => readFileSync(file, 'utf8'),
);

test('the preview still masks the audio player total time', () => {
  // Named rather than compared against the whole list: adding a second mask is
  // a normal thing to do, and it should not have to edit a test about the first
  // one. The list as a whole is checked by the next test.
  assert.ok(
    ignoreSelectors()?.includes('.audio-embed__time--total'),
    `${PREVIEW} must keep '.audio-embed__time--total' in \`chromatic.ignoreSelectors\`. The audio player's total time is rewritten when remote metadata arrives, so unmasking it turns a race against a third-party host into diffs that look like real regressions.`,
  );
});

test('every ignore selector still matches something in the components', () => {
  // Class selectors only. Anything else -- an attribute or id selector, say --
  // needs a check written for it rather than being silently skipped.
  const selectors = ignoreSelectors() ?? [];
  const notClasses = selectors.filter(
    (selector) => !/^\.[\w-]+$/.test(selector),
  );

  assert.deepEqual(
    notClasses,
    [],
    'This guard only knows how to verify class selectors. Extend it for these rather than leaving them unchecked.',
  );

  const orphaned = selectors.filter((selector) => {
    const className = selector.slice(1);
    return !componentSources.some((source) => source.includes(className));
  });

  assert.deepEqual(
    orphaned,
    [],
    `These selectors in ${PREVIEW} no longer match any component, so the region they mask is unmasked again. Update the selector to the class's new name, or drop it if the flapping content is gone.`,
  );
});
