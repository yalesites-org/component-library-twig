/**
 * Guards the visual-regression pixel budget logic.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/visreg-pixel-budget.test.mjs
 *
 * Why these are the assertions that matter: the measurement itself needs a
 * headless browser, but every decision the check makes -- which stories count,
 * what counts as over budget, and what the failure message says -- is pure and
 * belongs here. The browser half (`measure-visreg-pixels.mjs`) is deliberately
 * thin so that nothing worth testing lives behind Puppeteer.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PIXEL_CEILING,
  evaluateBudget,
  formatBudgetReport,
  requirePositiveNumber,
  selectVisregStories,
} from './visreg-pixel-budget.mjs';

/**
 * A Storybook `index.json` shaped like the real one, with the mix that matters:
 * a docs entry, a plain story, and two visreg stories out of order.
 */
const indexFixture = {
  v: 5,
  entries: {
    'atoms-divider--docs': {
      type: 'docs',
      id: 'atoms-divider--docs',
      name: 'Docs',
      title: 'Atoms/Divider',
      importPath: './components/01-atoms/divider/divider.mdx',
      tags: ['dev', 'docs'],
    },
    'atoms-divider--interactive': {
      type: 'story',
      id: 'atoms-divider--interactive',
      name: 'Interactive',
      title: 'Atoms/Divider',
      importPath: './components/01-atoms/divider/divider.stories.js',
      tags: ['dev', 'test'],
    },
    'atoms-divider-visreg--onha': {
      type: 'story',
      id: 'atoms-divider-visreg--onha',
      name: 'Onha',
      title: 'Atoms/Divider/Visreg',
      importPath: './components/01-atoms/divider/divider.visreg.stories.js',
      tags: ['dev', 'test', 'visreg'],
    },
    'atoms-divider-visreg--old-blues': {
      type: 'story',
      id: 'atoms-divider-visreg--old-blues',
      name: 'Old Blues',
      title: 'Atoms/Divider/Visreg',
      importPath: './components/01-atoms/divider/divider.visreg.stories.js',
      tags: ['dev', 'test', 'visreg'],
    },
  },
};

const measurement = (id, height, extra = {}) => ({
  id,
  title: 'Organisms/Layout/Visreg',
  name: 'Old Blues',
  width: 1200,
  height,
  ...extra,
});

test('the ceiling is the documented Chromatic snapshot limit', () => {
  assert.equal(PIXEL_CEILING, 25000000);
});

test('selectVisregStories keeps only the visreg-tagged stories', () => {
  const stories = selectVisregStories(indexFixture);

  assert.deepEqual(
    stories.map((story) => story.id),
    ['atoms-divider-visreg--old-blues', 'atoms-divider-visreg--onha'],
    'docs entries and untagged stories are excluded, and the order is stable',
  );
  assert.deepEqual(stories[0], {
    id: 'atoms-divider-visreg--old-blues',
    name: 'Old Blues',
    title: 'Atoms/Divider/Visreg',
    importPath: './components/01-atoms/divider/divider.visreg.stories.js',
  });
});

test('selectVisregStories rejects an index it cannot read', () => {
  assert.throws(() => selectVisregStories({}), /entries/);
  assert.throws(() => selectVisregStories(null), /entries/);
});

test('selectVisregStories fails when nothing is tagged visreg', () => {
  // The silent-drop failure this whole check exists to catch: if the visreg tag
  // stops being applied, measuring zero stories must not read as a pass.
  const untagged = {
    v: 5,
    entries: {
      'atoms-divider--interactive':
        indexFixture.entries['atoms-divider--interactive'],
    },
  };

  assert.throws(() => selectVisregStories(untagged), /visreg/);
});

test('evaluateBudget reports the largest story first', () => {
  const result = evaluateBudget([
    measurement('small', 100),
    measurement('largest', 10000),
    measurement('middle', 1000),
  ]);

  assert.deepEqual(
    result.measured.map((story) => story.id),
    ['largest', 'middle', 'small'],
  );
  assert.equal(result.measured[0].area, 1200 * 10000);
  assert.equal(result.largest.id, 'largest');
  assert.equal(result.passed, true);
  assert.equal(result.ceiling, PIXEL_CEILING);
});

test('evaluateBudget treats the ceiling itself as within budget', () => {
  const exactly = PIXEL_CEILING / 1200;
  const result = evaluateBudget([
    measurement('at-the-ceiling', exactly),
    measurement('one-row-over', exactly + 1),
  ]);

  assert.deepEqual(
    result.overBudget.map((story) => story.id),
    ['one-row-over'],
  );
  assert.equal(result.passed, false);
});

test('evaluateBudget honours an overridden ceiling', () => {
  const result = evaluateBudget([measurement('tall', 10000)], 1000000);

  assert.equal(result.ceiling, 1000000);
  assert.equal(result.overBudget.length, 1);
});

test('evaluateBudget separates stories that could not be measured', () => {
  const result = evaluateBudget([
    measurement('fine', 100),
    {
      ...measurement('broken', 0),
      error: 'Navigation timeout of 30000 ms exceeded',
    },
  ]);

  assert.deepEqual(
    result.failed.map((story) => story.id),
    ['broken'],
  );
  assert.deepEqual(
    result.measured.map((story) => story.id),
    ['fine'],
    'an unmeasurable story is not silently counted as passing',
  );
  assert.equal(result.passed, false);
});

test('evaluateBudget rejects an empty measurement set', () => {
  assert.throws(() => evaluateBudget([]), /no measurements/i);
});

test('formatBudgetReport names each over-budget story and its measured size', () => {
  const report = formatBudgetReport(
    evaluateBudget([
      {
        ...measurement('organisms-card-collection-visreg--old-blues', 300300),
        title: 'Organisms/Card Collection/Visreg',
      },
      measurement('within-budget', 100),
    ]),
  );

  assert.match(report, /1 visreg story exceeds/);
  assert.match(report, /Organisms\/Card Collection\/Visreg/);
  assert.match(report, /organisms-card-collection-visreg--old-blues/);
  assert.match(report, /1,200 x 300,300/);
  assert.match(report, /360,360,000px/);
  assert.match(report, /14\.4x/);
  assert.match(report, /25,000,000px/);
  assert.match(
    report,
    /STORYBOOK\.md/,
    'the fix is pointed at, not just the failure',
  );
  assert.doesNotMatch(
    report,
    /within-budget/,
    'passing stories are not listed as failures',
  );
});

test('formatBudgetReport reports headroom when everything fits', () => {
  const report = formatBudgetReport(
    evaluateBudget([measurement('organisms-layout-visreg--old-blues', 17624)]),
  );

  assert.match(report, /within the 25,000,000px/);
  assert.match(report, /organisms-layout-visreg--old-blues/);
  assert.match(report, /21,148,800px/);
  assert.match(report, /85% of the ceiling/);
  assert.doesNotMatch(report, /exceeds/);
});

test('formatBudgetReport lists stories that could not be measured', () => {
  const report = formatBudgetReport(
    evaluateBudget([
      measurement('fine', 100),
      {
        ...measurement('broken', 0),
        error: 'Navigation timeout of 30000 ms exceeded',
      },
    ]),
  );

  assert.match(report, /could not be measured/);
  assert.match(report, /broken/);
  assert.match(report, /Navigation timeout of 30000 ms exceeded/);
});

test('requirePositiveNumber falls back when the override is unset', () => {
  assert.equal(requirePositiveNumber('CEILING', undefined, 7), 7);
  assert.equal(requirePositiveNumber('CEILING', '', 7), 7);
});

test('requirePositiveNumber reads a valid override', () => {
  assert.equal(requirePositiveNumber('CEILING', '42', 7), 42);
});

test('requirePositiveNumber rejects an override that would disable the check', () => {
  // `Number('nonsense')` is NaN and every `area > NaN` is false, so a bad
  // override would pass every story rather than checking any of them.
  assert.throws(
    () => requirePositiveNumber('CEILING', 'nonsense', 7),
    /CEILING/,
  );
  assert.throws(() => requirePositiveNumber('CEILING', '0', 7), /positive/);
  assert.throws(() => requirePositiveNumber('CEILING', '-1', 7), /positive/);
  assert.throws(
    () => requirePositiveNumber('CEILING', 'Infinity', 7),
    /positive/,
  );
});
