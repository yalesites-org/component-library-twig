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
 * DELETE THIS FILE once Chromatic CI is wired (yalesites-org/YaleSites-Internal#1604) and the
 * `1435-emulsify-vite-migration` / `after-2260` chain has merged forward. That chain predates
 * this removal and still carries Percy references, so the guard's job is to hold the line
 * while it lands -- not to live on as a permanent test asserting the absence of a tool nobody
 * uses. It has an exit condition on purpose; do not let it become permanent by default.
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

/** The tool itself, matched in file contents and in filenames. */
const PERCY = /percy/i;

/**
 * What must not come back. `visreg:ci` was the npm script that invoked Percy; it is listed
 * separately because a reference can survive renaming without the word "Percy" in it.
 */
const BANNED = [PERCY, /visreg:ci/];

/**
 * The repo root, two levels up from `components/_storybook/`.
 *
 * `git ls-files` is relative to its working directory and reports only what lives beneath it,
 * with no error if that is a subtree -- so pointing this at `components/` would quietly scan a
 * fraction of the repo and pass. The first test below is what catches that.
 */
const selfPath = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(path.dirname(path.dirname(selfPath)));

/**
 * This file names the banned strings on purpose -- in its own body *and* in its own
 * filename -- so it is excluded from both checks and cannot police itself.
 */
const selfEntry = path.relative(projectRoot, selfPath);

/**
 * Tracked files that can carry prose, config, or code. Binaries and fonts cannot.
 *
 * `.cjs` currently matches nothing -- on this branch the root configs are `.js`
 * (`release.config.js`). It is here because the Vite migration renames them
 * (`release.config.cjs`, `.eslintrc.cjs`, `commitlint.config.cjs`, ...), and holding the line
 * as that chain merges forward is this guard's whole job.
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

test('the scan reaches the whole repo, not just a subtree', () => {
  assert.ok(
    trackedFiles.includes('package.json') &&
      trackedFiles.includes('STORYBOOK.md'),
    `Scan found ${trackedFiles.length} tracked files but not the repo-root ones, so projectRoot is wrong and the checks below would pass without looking at anything.`,
  );
});

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
    'Percy is retired -- Chromatic replaces it once yalesites-org/YaleSites-Internal#1605 installs the CLI and #1604 wires CI. Reword these rather than reinstating Percy.',
  );
});

test('no Percy config file is left in the repo', () => {
  const leftovers = trackedFiles.filter((file) =>
    PERCY.test(path.basename(file)),
  );

  assert.deepEqual(
    leftovers,
    [],
    '.percyrc is gone; its story exclusions and masks are recorded in yalesites-org/YaleSites-Internal#1603, to be ported once Chromatic exists (#1605).',
  );
});
