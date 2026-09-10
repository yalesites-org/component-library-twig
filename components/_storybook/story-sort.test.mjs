/**
 * Pins the sidebar ordering rules in `config/emulsify-core/storybook/story-sort.mjs`.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/story-sort.test.mjs
 *
 * `storySortComparator` is what orders the built sidebar: since storySort no
 * longer reaches the manager bundle, `scripts/sort-storybook-index.mjs` applies
 * this comparator to `.out/index.json` after a static build. The acceptance bar
 * for the Vite migration is that the sidebar reads the same as the published
 * webpack build, so these cases encode what that build showed -- in particular
 * that stories inside one component stay in declaration order rather than being
 * alphabetised.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { storySortComparator } from '../../config/emulsify-core/storybook/story-sort.mjs';

/** Minimal shape the comparator reads off an index entry. */
const entry = (title, name) => ({ title, name });

/** An index entry with an explicit type, for the docs-vs-story rule. */
const typed = (title, name, type) => ({ title, name, type });

/** Sorts a copy, so a passing case cannot be an artifact of input mutation. */
const sorted = (entries) =>
  [...entries].sort(storySortComparator).map((e) => e.name);

test('stories inside one component keep their declaration order', () => {
  // Source export order in standard-pages.stories.js, which is also the order the
  // published webpack sidebar shows. Alphabetising would swap the last two.
  const declared = [
    'Basic',
    'Basic Short',
    'Basic Spotlights',
    'With Banner',
    'With Sidebar',
    'With Quick Links',
  ].map((name) => entry('Page Examples/Standard Pages', name));

  assert.deepEqual(sorted(declared), [
    'Basic',
    'Basic Short',
    'Basic Spotlights',
    'With Banner',
    'With Sidebar',
    'With Quick Links',
  ]);
});

test('declaration order is preserved even when it is reverse-alphabetical', () => {
  // events.stories.js exports EventPage first; alphabetising would demote it.
  const declared = ['Event Page', 'Event Grid', 'Event List'].map((name) =>
    entry('Page Examples/Events', name),
  );

  assert.deepEqual(sorted(declared), [
    'Event Page',
    'Event Grid',
    'Event List',
  ]);
});

test('an explicit __order still wins over declaration order', () => {
  // ORDER_TREE pins Overview before Visreg for Card Collection.
  const reversed = ['Visreg', 'Overview'].map((name) =>
    entry('Organisms/Card Collection', name),
  );

  assert.deepEqual(sorted(reversed), ['Overview', 'Visreg']);
});

test('top-level sections follow __order, not the alphabet', () => {
  const shuffled = [
    entry('Templates', 'Overview'),
    entry('Atoms', 'Overview'),
    entry('Introduction', 'Docs'),
    entry('Tokens', 'Overview'),
    entry('Organisms', 'Overview'),
    entry('Page Examples', 'Docs'),
    entry('Molecules', 'Overview'),
  ];

  assert.deepEqual(
    [...shuffled].sort(storySortComparator).map((e) => e.title),
    [
      'Introduction',
      'Tokens',
      'Atoms',
      'Molecules',
      'Organisms',
      'Templates',
      'Page Examples',
    ],
  );
});

test('sibling components with no declared order stay alphabetical', () => {
  const shuffled = [
    entry('Molecules/Callout', 'Overview'),
    entry('Molecules/Accordion', 'Overview'),
    entry('Molecules/Cards', 'Overview'),
  ];

  assert.deepEqual(
    [...shuffled].sort(storySortComparator).map((e) => e.title),
    ['Molecules/Accordion', 'Molecules/Callout', 'Molecules/Cards'],
  );
});

test('a shorter title sorts above its own nested children', () => {
  const entries = [
    entry('Tokens/Effects/Shadows', 'Docs'),
    entry('Tokens/Effects', 'Overview'),
  ];

  assert.deepEqual(
    [...entries].sort(storySortComparator).map((e) => e.title),
    ['Tokens/Effects', 'Tokens/Effects/Shadows'],
  );
});

test("a component's docs page sorts above its stories", () => {
  // Storybook 9's indexer emits the docs entry last; the webpack sidebar showed
  // "Overview" first, above Molecules/Cards' seven card stories.
  const indexed = [
    typed('Molecules/Cards', 'Post Card', 'story'),
    typed('Molecules/Cards', 'Event Card', 'story'),
    typed('Molecules/Cards', 'Overview', 'docs'),
  ];

  assert.deepEqual(sorted(indexed), ['Overview', 'Post Card', 'Event Card']);
});

test('an explicit __order outranks the docs-first rule', () => {
  // Card Collection pins Overview before Visreg by name, so the type rule must
  // not get a chance to reorder a pair the tree already speaks to.
  const indexed = [
    typed('Organisms/Card Collection', 'Visreg', 'docs'),
    typed('Organisms/Card Collection', 'Overview', 'story'),
  ];

  assert.deepEqual(sorted(indexed), ['Overview', 'Visreg']);
});
