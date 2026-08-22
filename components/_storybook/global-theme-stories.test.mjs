/**
 * Guards the one-story-per-global-theme shape of the visreg stories.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/global-theme-stories.test.mjs
 *
 * Why this is a test at all: nothing in a Storybook build fails when the shape
 * regresses. The stories still render, they are just too tall to be captured,
 * so the failure only ever shows up as a visual-regression error much later.
 * `global-theme-stories.mjs` explains the shape and the three rules asserted
 * here; this file is the enforcement, not a second copy of the rationale.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  createGlobalThemeSectionStories,
  createGlobalThemeStories,
} from './global-theme-stories.mjs';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.dirname(storybookDir);

/**
 * The story export name each global theme is expected to own.
 *
 * Export names have to be literal identifiers in each story file -- see rule 1
 * in global-theme-stories.mjs -- so they cannot be derived from tokens at
 * runtime. This table is what ties them back to tokens: add a global theme, or
 * rename one, and the first test below fails and names what needs adding.
 */
const expectedExports = {
  one: 'OldBlues',
  two: 'NewHavenGreen',
  three: 'ShorelineSummer',
  four: 'Onha',
  five: 'ItsYourYale',
  six: 'AI',
  seven: 'WhitneyHumanitiesCenter',
};

/** A global theme's label reduced to a valid JS identifier. */
const exportNameFor = (label) => label.replace(/[^A-Za-z0-9]/g, '');

/** Every `*.visreg.stories.js` file, as `{ file, source }`. */
const visregStories = readdirSync(componentsDir, { recursive: true })
  .filter((file) => file.endsWith('.visreg.stories.js'))
  .map((file) => ({
    file,
    source: readFileSync(path.join(componentsDir, file), 'utf8'),
  }));

/** Story export names in a source file, in declaration order. */
const storyExports = (source) =>
  [...source.matchAll(/^export const (\w+) =/gm)].map((m) => m[1]);

test('the story exports expected here still match the global themes in tokens', () => {
  assert.deepEqual(
    Object.keys(tokens['global-themes']),
    Object.keys(expectedExports),
    'tokens gained, lost, or reordered a global theme: every visreg story file ' +
      'needs a matching story export added or removed, and this table updated',
  );

  Object.entries(expectedExports).forEach(([theme, exportName]) => {
    assert.equal(
      exportNameFor(tokens['global-themes'][theme].label),
      exportName,
      `the label for global theme "${theme}" no longer matches its story ` +
        'export name, so the stories are named after a label that changed',
    );
  });
});

test('there are visreg stories to check', () => {
  assert.ok(
    visregStories.length > 0,
    'found no *.visreg.stories.js files under components/',
  );
});

visregStories.forEach(({ file, source }) => {
  test(`${file} splits its stories by global theme`, () => {
    assert.doesNotMatch(
      source,
      /^export const Visreg\b/m,
      'a single stacked `Visreg` export is what blows the snapshot pixel limit',
    );

    assert.match(
      source,
      /tags: \['visreg'\]/,
      'without the visreg tag the story shows up in the default sidebar and ' +
        'is not scoped as a visual regression story',
    );

    // A component too tall to fit a whole global theme in one snapshot splits
    // further, so a theme may own several stories -- `OldBluesSectionDefault`,
    // `OldBluesSectionOne` and so on. What matters is that every global theme
    // is represented, and represented the same way as its siblings.
    const exports = storyExports(source);
    const counts = Object.fromEntries(
      Object.values(expectedExports).map((exportName) => [
        exportName,
        exports.filter((name) => name.startsWith(exportName)).length,
      ]),
    );
    const [first, ...rest] = Object.values(counts);

    assert.ok(
      first > 0 && rest.every((count) => count === first),
      'every global theme needs the same, non-zero number of stories, each a ' +
        `plain identifier export the CSF indexer can see: ${JSON.stringify(
          counts,
        )}`,
    );

    // Names alone are not enough: `export const OldBlues = themeStories.two`
    // would pass everything above while silently snapshotting one theme twice
    // and another not at all. So check what each export is actually assigned:
    // the first key must be its own theme, and a `...Section<Name>` export must
    // then select the matching section theme.
    Object.entries(expectedExports).forEach(([theme, exportName]) => {
      const assignments = [
        ...source.matchAll(
          new RegExp(`^export const (${exportName}\\w*) = (.+);$`, 'gm'),
        ),
      ];

      assignments.forEach(([, name, initialiser]) => {
        const suffix = name.slice(exportName.length);
        const section = suffix.match(/^Section(\w+)$/);
        const expected = section
          ? `.${theme}.${section[1].toLowerCase()}`
          : `.${theme}`;

        assert.ok(
          initialiser.endsWith(expected),
          `"${name}" is assigned \`${initialiser}\`, which does not select ` +
            `\`${expected}\` -- the story would snapshot the wrong theme`,
        );
      });
    });
  });
});

test('a hand-written storyName still matches its label in tokens', () => {
  // Only the theme whose label contains a curly apostrophe needs an override,
  // and it is spelled out in every file that has one -- so it can drift.
  const theme = 'five';
  const { label } = tokens['global-themes'][theme];
  const pattern = new RegExp(
    `^${expectedExports[theme]}\\w*\\.storyName = '([^']*)';$`,
    'gm',
  );

  const found = visregStories.flatMap(({ file, source }) =>
    [...source.matchAll(pattern)].map((m) => ({ file, name: m[1] })),
  );

  assert.ok(found.length > 0, 'expected at least one storyName override');
  found.forEach(({ file, name }) => {
    assert.ok(
      name.startsWith(label),
      `${file}: storyName "${name}" no longer starts with the tokens label ` +
        `"${label}"`,
    );
  });
});

test('createGlobalThemeStories builds one story per theme, keyed by theme', () => {
  const stories = createGlobalThemeStories(
    () => '<p>content</p>',
    ['one', 'two'],
    { one: 'Old Blues', two: 'New Haven Green' },
  );

  assert.deepEqual(Object.keys(stories), ['one', 'two']);
  Object.values(stories).forEach((story) => {
    assert.equal(typeof story, 'function');
  });
});

test('each story renders its own global theme and no other', () => {
  const stories = createGlobalThemeStories(
    () => '<p>content</p>',
    ['one', 'two', 'three'],
    { one: 'Old Blues', two: 'New Haven Green', three: 'Shoreline Summer' },
  );

  const markup = stories.two();
  assert.equal(
    markup.match(/data-global-theme="two"/g).length,
    1,
    'expected exactly one global theme wrapper',
  );
  assert.doesNotMatch(markup, /data-global-theme="(one|three)"/);
  assert.match(markup, /<p>content<\/p>/);
});

test('the render function receives the theme it is rendering', () => {
  const seen = [];
  const stories = createGlobalThemeStories(
    (theme) => {
      seen.push(theme);
      return `<p>${theme}</p>`;
    },
    ['one', 'seven'],
    { one: 'Old Blues', seven: 'Whitney Humanities Center' },
  );

  assert.deepEqual(seen, [], 'stories must not render until they are called');
  stories.seven();
  assert.deepEqual(seen, ['seven']);
});

test('the heading names the theme so a snapshot diff is readable', () => {
  const stories = createGlobalThemeStories(() => '', ['four'], {
    four: 'Onha',
  });

  assert.match(stories.four(), /Global Theme: Onha/);
});

test('createGlobalThemeSectionStories crosses global theme with section theme', () => {
  const stories = createGlobalThemeSectionStories(
    (section) => `<p>${section}</p>`,
    ['one', 'two'],
    ['default', 'four'],
    { one: 'Old Blues', two: 'New Haven Green' },
  );

  assert.deepEqual(Object.keys(stories), ['one', 'two']);
  assert.deepEqual(Object.keys(stories.one), ['default', 'four']);

  const markup = stories.one.four();
  assert.equal(markup.match(/data-global-theme="one"/g).length, 1);
  assert.match(markup, /<p>four<\/p>/);
  assert.match(markup, /Global Theme: Old Blues, Section Theme: four/);
});

test('the crossed render function receives section theme then global theme', () => {
  const seen = [];
  const stories = createGlobalThemeSectionStories(
    (section, theme) => {
      seen.push([section, theme]);
      return '';
    },
    ['seven'],
    ['two'],
    { seven: 'Whitney Humanities Center' },
  );

  stories.seven.two();
  assert.deepEqual(seen, [['two', 'seven']]);
});
