/**
 * Fails if Percy -- the retired visual-regression tool -- is still referenced anywhere.
 *
 * Run with the Node test runner (no npm dependency, but unlike its sibling guards this one
 * needs `git` on PATH -- see the scan note below):
 *   node --test components/_storybook/no-percy-references.test.mjs
 *
 * Percy was disabled years ago over false positives and is being replaced by Chromatic, but
 * its artifacts came out of the tree piecemeal across several PRs and kept resurfacing in
 * review. This file is the enforcement, not the rationale -- STORYBOOK.md documents the
 * visual-regression story shape, and the retirement itself is
 * yalesites-org/YaleSites-Internal#1322.
 *
 * The scan is over `git ls-files` rather than a directory walk, because that is exactly "what
 * this repo ships": it excludes node_modules, dist, .out and gitignored local files, so the
 * guard cannot go red on a developer's machine over something CI will never see.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { projectRoot } from './component-files.mjs';

/** The tool itself, matched in file contents and in filenames. */
const PERCY = /percy/i;

/**
 * What must not come back. `visreg:ci` was the npm script that invoked Percy; it is listed
 * separately because a reference can survive renaming without the word "Percy" in it.
 */
const BANNED = [PERCY, /visreg:ci/];

/**
 * This file names the banned strings on purpose -- in its own body *and* in its own
 * filename -- so it is excluded from both checks and cannot police itself.
 */
const selfEntry = path.relative(projectRoot, fileURLToPath(import.meta.url));

/**
 * Tracked files that can carry prose, config, or code. Binaries and fonts cannot.
 *
 * Deliberately *not* the shared list in `component-files.mjs`, despite that module's warning
 * about duplicating it: that list answers "which files under components/ can carry an image
 * URL", this one asks "which files anywhere in the repo can carry prose, config, or code", and
 * the two should be free to diverge. They already have -- `.cjs` is here because
 * `release.config.cjs` is at the repo root, outside the shared list's reach entirely.
 */
const TEXT_FILE = /\.(yml|yaml|twig|js|mjs|cjs|json|mdx|md|scss|css|html)$/;

/**
 * `package-lock.json` is generated, so it is not a place a human reintroduces Percy -- and
 * scanning 30k lines of it on every run buys nothing.
 */
const GENERATED = 'package-lock.json';

/** Repo-relative paths of every tracked file, minus this guard. */
const trackedFiles = execFileSync('git', ['ls-files', '-z'], {
  cwd: projectRoot,
  encoding: 'utf8',
})
  .split('\0')
  .filter((entry) => entry !== '' && entry !== selfEntry);

test('no tracked file references Percy or the visreg:ci script', () => {
  const offenders = trackedFiles
    .filter((file) => file !== GENERATED && TEXT_FILE.test(file))
    .filter((file) => {
      const contents = readFileSync(path.join(projectRoot, file), 'utf8');
      return BANNED.some((banned) => banned.test(contents));
    });

  assert.deepEqual(
    offenders,
    [],
    'Percy is retired -- visual regression runs on Chromatic. Reword these rather than reinstating it.',
  );
});

test('no Percy config file is left in the repo', () => {
  const leftovers = trackedFiles.filter((file) =>
    PERCY.test(path.basename(file)),
  );

  assert.deepEqual(
    leftovers,
    [],
    '.percyrc and friends are gone; their story exclusions live on as Chromatic parameters.',
  );
});
