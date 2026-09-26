/**
 * Storybook must offer every option Drupal offers (YaleSites-Internal#1680).
 *
 * Our contrast evidence comes from Storybook, so a Drupal option Storybook
 * never shows is an option nobody has checked. The Link Grid heading that
 * rendered white on white in production was exactly that
 * (YaleSites-Internal#1734).
 *
 * ## Why the Drupal side is a checked-in list
 *
 * The Drupal option lists live in yalesites-project
 * (`ys_themes.component_overrides.yml`, `YSLayoutOptions`, the `book_navigation`
 * theme setting, the `ys_embed` source plugins, `ViewsBasicDynamicStyle`).
 * This repo does not vendor yalesites-project, and CI checks out this repo
 * alone, so a test that read those files would fail everywhere except a
 * developer's full local checkout. `DRUPAL_OPTIONS` below is a copy, taken
 * from yalesites-project on the `1616-section-color-parity` epic branch.
 *
 * What this catches: Storybook drifting from that list. What it cannot catch:
 * Drupal changing its list. When Drupal adds or drops an option, update the
 * row here in the same change, and this test then says which stories to fix.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const tokens = require('@yalesites-org/tokens/build/json/tokens.json');

const componentsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const SECTION_THEMES = [
  'default',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
];
const ONE_TO_SIX = ['one', 'two', 'three', 'four', 'five', 'six'];
const ONE_TO_FIVE = ['one', 'two', 'three', 'four', 'five'];

/**
 * Controls whose options come from a props file: [file, prop, Drupal options].
 *
 * Order-insensitive. Storybook's order is a display choice; the gap this
 * test exists for is a missing option.
 */
const DRUPAL_OPTIONS = [
  ['01-atoms/controls/control-props.yml', 'sectionTheme', SECTION_THEMES],
  ['01-atoms/divider/divider-props.yml', 'sectionTheme', SECTION_THEMES],
  ['01-atoms/forms/forms-props.yml', 'sectionTheme', SECTION_THEMES],
  ['01-atoms/images/images-props.yml', 'sectionTheme', SECTION_THEMES],
  ['01-atoms/lists/list-props.yml', 'sectionTheme', SECTION_THEMES],
  ['02-molecules/tile-item/tile-item-props.yml', 'themeColor', ONE_TO_SIX],
  [
    '02-molecules/quote-callout/quote-callout-props.yml',
    'accentTheme',
    ONE_TO_SIX,
  ],
  [
    '02-molecules/embed/embed-props.yml',
    'type',
    ['form', 'audio', 'map', 'calendar', 'video'],
  ],
  [
    '02-molecules/cards/reference-card/reference-card-props.yml',
    'collectionType',
    ['grid', 'list', 'condensed', 'single', 'profile-directory'],
  ],
  [
    '03-organisms/card-collection/card-collection-props.yml',
    'collectionType',
    ['grid', 'list', 'condensed', 'single', 'profile-directory'],
  ],
  // The other direction: Drupal's `book_navigation` setting stops at five, so
  // these two must not pick up `six` from the token map.
  [
    '03-organisms/menu/secondary-nav/secondary-nav-props.yml',
    'themeColor',
    ONE_TO_FIVE,
  ],
  [
    '03-organisms/site-in-this-section/site-in-this-section-props.yml',
    'siteSectionTheme',
    ONE_TO_FIVE,
  ],
];

/** Every story module, as [path relative to components/, source]. */
const storyFiles = new Map(
  readdirSync(componentsDir, { recursive: true })
    .filter((file) => file.endsWith('.stories.js'))
    .map((file) => [
      file,
      readFileSync(path.join(componentsDir, file), 'utf8'),
    ]),
);

/**
 * Stories that set `<prop>`'s options in JS instead of taking them from the
 * props file.
 *
 * A story that does `argTypes.<prop> = { ...argTypes.<prop>, options: x }`
 * (or `argTypes.<prop>.options = x`, or `<prop>: { options: [...] }` in an
 * argTypes literal) shows `x`, not the props file, so the props-file check
 * would pass while Storybook still drifts. Secondary Nav and In This Section
 * did exactly this with the token map until YaleSites-Internal#1680. Only
 * stories that import this props file are scanned.
 */
function optionOverrides(propsFile, prop) {
  const importsProps = `/${path.basename(propsFile)}'`;
  const override = new RegExp(
    `\\b${prop}\\s*[:=]\\s*\\{[^}]*\\boptions\\s*:|\\.${prop}\\.options\\s*=`,
  );

  return [...storyFiles]
    .filter(
      ([, source]) => source.includes(importsProps) && override.test(source),
    )
    .map(([file]) => file);
}

/** Stories whose options are the component-themes token map itself. */
const TOKEN_DRIVEN_STORIES = [
  '02-molecules/callout/callout.stories.js',
  '03-organisms/facts-and-figures-group/facts-and-figures-group.stories.js',
];

const sorted = (list) => [...list].sort();

/**
 * The `options:` list of one top-level prop in a props file.
 *
 * Read as text because this repo has no YAML parser as a direct dependency
 * (Storybook reads these files through `js-yaml-loader`). Every props file
 * states options as a `- value` list under the prop, so this takes the list
 * lines after that prop's `options:` key. Returns null when the prop or its
 * list is missing, which fails the comparison below loudly.
 */
function propOptions(source, prop) {
  const block = source
    .split(/\n(?=\S)/)
    .find((chunk) => chunk.startsWith(`${prop}:`));
  const lines = block?.split(/\n\s+options:\n/)[1]?.split('\n') ?? [];
  const listItem = /^\s+- '?([^']+?)'?$/;
  const end = lines.findIndex((line) => !listItem.test(line));
  const items = lines
    .slice(0, end === -1 ? lines.length : end)
    .map((line) => line.match(listItem)[1]);

  return items.length ? items : null;
}

DRUPAL_OPTIONS.forEach(([file, prop, drupal]) => {
  test(`${file} ${prop} offers what Drupal offers`, () => {
    const options = propOptions(
      readFileSync(path.join(componentsDir, file), 'utf8'),
      prop,
    );

    assert.ok(options, `${file} has no \`${prop}\` options list`);
    assert.deepEqual(
      sorted(options),
      sorted(drupal),
      `${file} \`${prop}\` has drifted from the Drupal option list`,
    );
  });

  test(`no story overrides ${file} ${prop} options in JS`, () => {
    assert.deepEqual(
      optionOverrides(file, prop),
      [],
      `these stories replace \`${prop}\`'s options from ${file}, so the ` +
        'check above is not what Storybook shows. Put the options in the ' +
        'props file instead.',
    );
  });
});

test('the component-themes token map offers what the Drupal dials offer', () => {
  assert.deepEqual(
    sorted(Object.keys(tokens['component-themes'])),
    sorted(ONE_TO_SIX),
    'Callout and Facts read their options from this map. If `six` is ' +
      'missing, the installed @yalesites-org/tokens predates the release ' +
      'that added it (YaleSites-Internal#1680); bump the dependency.',
  );
});

TOKEN_DRIVEN_STORIES.forEach((file) => {
  test(`${file} still takes its options from the token map`, () => {
    // The token-map test above only covers this story while the story reads
    // the map. A hand-written list would slip past it.
    assert.match(
      storyFiles.get(file) ?? '',
      /Object\.keys\(tokens\['component-themes'\]\)/,
    );
  });
});

/**
 * Visreg stories whose component has no `six` in Drupal, so they must loop
 * over `componentThemesOneToFive`. Reading the full token map would snapshot
 * a Theme six no editor can produce.
 */
const ONE_TO_FIVE_THEME_STORIES = [
  '01-atoms/videos/video-background/video-background.visreg.stories.js',
  '02-molecules/banner/image-banner.visreg.stories.js',
  '02-molecules/pull-quote/pull-quote.visreg.stories.js',
  '02-molecules/quick-links/quick-links.visreg.stories.js',
  '02-molecules/tabs/tabs.visreg.stories.js',
  '02-molecules/taxonomy-display/taxonomy-display.visreg.stories.js',
  '03-organisms/menu/secondary-nav/secondary-nav.visreg.stories.js',
  '03-organisms/site-in-this-section/site-in-this-section.visreg.stories.js',
];

ONE_TO_FIVE_THEME_STORIES.forEach((file) => {
  test(`${file} shows no component theme Drupal does not offer`, () => {
    const source = storyFiles.get(file) ?? '';

    assert.match(source, /\bcomponentThemesOneToFive\b/);
    assert.doesNotMatch(source, /\bcomponentThemes\b/);
  });
});
