/**
 * Guards the link halo check's decisions (YaleSites-Internal#1939).
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/link-halo.test.mjs
 *
 * The browser half (`check-link-halo.mjs`) only gathers computed styles.
 * Everything it then concludes -- what colour is behind a link, whether the
 * halo matches it, whether the text has enough contrast, what is new against
 * the baseline and what the report says -- is here, so it can be pinned
 * without launching Chrome.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CHANNEL_TOLERANCE,
  STATES,
  composite,
  deferredToRender,
  diffBaseline,
  evaluateSample,
  evaluateSamples,
  failureKey,
  formatReport,
  formatThemes,
  haloShadows,
  isLargeText,
  normaliseLinkText,
  parseColor,
  parseTextShadow,
  resolveBackground,
  selectVisits,
  splitTopLevel,
  splitVisits,
  updatedBaseline,
} from './link-halo.mjs';

const WHITE = 'rgb(255, 255, 255)';
const NAVY = 'rgb(0, 54, 107)';
const BLUE = 'rgb(39, 107, 190)';

/** A halo the way Chrome serializes the link mixin's, in one colour. */
const halo = (color, fontSize = 16) =>
  [0.03, -0.03, 0.06, -0.06]
    .map((em) => `${color} ${em * fontSize}px 0px 0px`)
    .join(', ');

/** A layer as `collectSamples` reports it. */
const layer = (backgroundColor, extra = {}) => ({
  label: '<div.x>',
  tag: 'div',
  backgroundColor,
  backgroundImage: 'none',
  opacity: 1,
  insideLink: false,
  ...extra,
});

/** A sample for a 16px regular link. */
const sample = (overrides = {}) => ({
  story: 'molecules-link-grid--link-grid',
  title: 'Molecules/Link grid',
  name: 'Link Grid',
  state: 'rest',
  themes: { global: 'one', component: 'one' },
  variant: '',
  where: 'link-grid a.link',
  text: 'This is a link',
  color: BLUE,
  textShadow: halo(WHITE),
  fontSize: 16,
  fontWeight: 400,
  layers: [
    layer('rgba(0, 0, 0, 0)', { tag: 'a', insideLink: true }),
    layer(WHITE),
  ],
  ...overrides,
});

test('splitTopLevel keeps commas inside functions', () => {
  assert.deepEqual(
    splitTopLevel('rgb(1, 2, 3) 1px 0px, rgba(4, 5, 6, 0.5) 0px 1px'),
    ['rgb(1, 2, 3) 1px 0px', 'rgba(4, 5, 6, 0.5) 0px 1px'],
  );
});

test('parseColor reads every form Chrome computes a colour to', () => {
  assert.deepEqual(parseColor('rgb(1, 2, 3)'), { r: 1, g: 2, b: 3, a: 1 });
  assert.deepEqual(parseColor('rgba(1, 2, 3, 0.5)'), {
    r: 1,
    g: 2,
    b: 3,
    a: 0.5,
  });
  assert.deepEqual(parseColor('rgb(1 2 3 / 50%)'), {
    r: 1,
    g: 2,
    b: 3,
    a: 0.5,
  });
  assert.deepEqual(parseColor('color(srgb 1 0 0.5 / 0.25)'), {
    r: 255,
    g: 0,
    b: 127.5,
    a: 0.25,
  });
  assert.deepEqual(parseColor('#fff'), { r: 255, g: 255, b: 255, a: 1 });
  assert.deepEqual(parseColor('transparent'), { r: 0, g: 0, b: 0, a: 0 });
});

test('parseColor refuses what it cannot convert rather than guessing', () => {
  assert.equal(parseColor('oklab(0.5 0.1 0.1)'), null);
  assert.equal(parseColor('color(display-p3 1 0 0)'), null);
  assert.equal(parseColor('currentcolor'), null);
  assert.equal(parseColor(undefined), null);
});

test('composite is source-over onto an opaque colour', () => {
  assert.deepEqual(
    composite({ r: 0, g: 0, b: 0, a: 0.5 }, { r: 255, g: 255, b: 255, a: 1 }),
    { r: 127.5, g: 127.5, b: 127.5, a: 1 },
  );
});

test('parseTextShadow reads colour-first shadows and none', () => {
  assert.deepEqual(parseTextShadow('none'), []);
  assert.deepEqual(parseTextShadow('rgb(1, 2, 3) 0.48px -1px 0px'), [
    { color: { r: 1, g: 2, b: 3, a: 1 }, x: 0.48, y: -1, blur: 0 },
  ]);
});

test('haloShadows keeps zero-blur nudges and drops drop shadows and invisible ones', () => {
  const shadows = parseTextShadow(
    `${WHITE} 0.48px 0px 0px, ${WHITE} 2px 2px 4px, ${WHITE} 10px 0px 0px, rgba(0, 0, 0, 0) 1px 0px 0px`,
  );
  assert.equal(haloShadows(shadows, 16).length, 1);
});

test('resolveBackground composites translucent layers down to the first opaque one', () => {
  const { color } = resolveBackground([
    layer('rgba(0, 0, 0, 0.5)'),
    layer(WHITE),
    layer('rgb(255, 0, 0)'),
  ]);
  assert.deepEqual(color, { r: 127.5, g: 127.5, b: 127.5, a: 1 });
});

test('resolveBackground falls back to the white canvas when nothing paints', () => {
  assert.deepEqual(resolveBackground([layer('rgba(0, 0, 0, 0)')]).color, {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
});

test('resolveBackground skips images and background images behind the text', () => {
  assert.match(
    resolveBackground([
      layer('rgba(0, 0, 0, 0)'),
      layer('', { tag: 'img', label: '<img>' }),
    ]).skip,
    /image or media element \(<img>\)/,
  );
  assert.match(
    resolveBackground([
      layer('rgba(0, 0, 0, 0)', { backgroundImage: 'url("a.jpg")' }),
    ]).skip,
    /background image/,
  );
});

test("resolveBackground ignores the link's own underline gradient", () => {
  const { color } = resolveBackground([
    layer('rgba(0, 0, 0, 0)', {
      insideLink: true,
      backgroundImage: 'linear-gradient(rgb(1, 2, 3), rgb(1, 2, 3))',
    }),
    layer(NAVY),
  ]);
  assert.deepEqual(color, { r: 0, g: 54, b: 107, a: 1 });
});

test('resolveBackground does not excuse a gradient outside the link', () => {
  assert.ok(
    resolveBackground([
      layer('rgba(0, 0, 0, 0)', {
        backgroundImage: 'linear-gradient(rgb(1, 2, 3), rgb(1, 2, 3))',
      }),
    ]).skip,
  );
});

/** A positioned `::before` covering the text, as `collectSamples` reports it. */
const pseudoLayer = (backgroundColor, extra = {}) =>
  layer(backgroundColor, {
    label: '<a.primary-nav__link::before>',
    tag: 'pseudo',
    insideLink: true,
    pseudo: true,
    ...extra,
  });

test('resolveBackground composites a pseudo-element tint at its own opacity', () => {
  const { color } = resolveBackground([
    layer('rgba(0, 0, 0, 0)', { tag: 'a', insideLink: true }),
    pseudoLayer(WHITE, { opacity: 0.5 }),
    layer(NAVY),
  ]);
  assert.deepEqual(
    color,
    composite({ ...parseColor(WHITE), a: 0.5 }, parseColor(NAVY)),
  );
});

test('a halo matching the surface under a pseudo-element tint fails', () => {
  // The active nav item: the halo matches the nav, the tint changed it.
  const result = evaluateSample(
    sample({
      color: WHITE,
      textShadow: halo(NAVY),
      layers: [
        layer('rgba(0, 0, 0, 0)', { tag: 'a', insideLink: true }),
        pseudoLayer(WHITE, { opacity: 0.2 }),
        layer(NAVY),
      ],
    }),
  );
  assert.deepEqual(
    result.problems.map((problem) => problem.check),
    ['halo'],
  );
});

test("a gradient pseudo-element over the text is not excused as the link's underline", () => {
  assert.ok(
    resolveBackground([
      layer('rgba(0, 0, 0, 0)', { tag: 'a', insideLink: true }),
      pseudoLayer('rgba(0, 0, 0, 0)', {
        backgroundImage: 'linear-gradient(rgb(1, 2, 3), rgb(1, 2, 3))',
      }),
      layer(WHITE),
    ]).skip,
  );
});

test('a halo matching its background passes', () => {
  assert.deepEqual(evaluateSample(sample()).problems, []);
});

test('a halo that does not match its background fails, naming both colours', () => {
  const [problem] = evaluateSample(sample({ textShadow: halo(NAVY) })).problems;
  assert.equal(problem.check, 'halo');
  assert.equal(problem.detail, 'halo #00366b on background #ffffff');
});

test('the halo tolerance absorbs rounding and nothing more', () => {
  const near = `rgb(${255 - CHANNEL_TOLERANCE}, 255, 255)`;
  const far = `rgb(${255 - CHANNEL_TOLERANCE - 1}, 255, 255)`;
  assert.deepEqual(
    evaluateSample(sample({ textShadow: halo(near) })).problems,
    [],
  );
  assert.equal(
    evaluateSample(sample({ textShadow: halo(far) })).problems[0].check,
    'halo',
  );
});

test('a translucent halo is judged as painted over the background', () => {
  // Half-transparent navy over white is a visible blue-grey smear.
  const [problem] = evaluateSample(
    sample({ textShadow: halo('rgba(0, 54, 107, 0.5)') }),
  ).problems;
  assert.equal(problem.check, 'halo');
});

test('no text-shadow, or a transparent one, is not a halo mismatch', () => {
  assert.deepEqual(evaluateSample(sample({ textShadow: 'none' })).problems, []);
  assert.deepEqual(
    evaluateSample(sample({ textShadow: halo('rgba(0, 0, 0, 0)') })).problems,
    [],
  );
});

test('low contrast fails at 4.5:1 for body text', () => {
  const [problem] = evaluateSample(
    sample({ color: 'rgb(150, 150, 150)', textShadow: 'none' }),
  ).problems;
  assert.equal(problem.check, 'contrast');
  assert.match(problem.detail, /needs 4.5:1$/);
});

test('large text is held to 3:1, per WCAG', () => {
  // #767676 on white is 4.54:1; #949494 is 3.03:1.
  const grey = { color: 'rgb(148, 148, 148)', textShadow: 'none' };
  assert.equal(evaluateSample(sample(grey)).problems.length, 1);
  assert.equal(
    evaluateSample(sample({ ...grey, fontSize: 24 })).problems.length,
    0,
  );
  assert.equal(
    evaluateSample(sample({ ...grey, fontSize: 19, fontWeight: 700 })).problems
      .length,
    0,
  );
  assert.equal(isLargeText(19, 400), false);
});

test('an unresolvable background is a skip, not a failure', () => {
  const verdict = evaluateSample(
    sample({
      layers: [layer('rgba(0, 0, 0, 0)', { tag: 'img', label: '<img>' })],
    }),
  );
  assert.ok(verdict.skip);
  assert.equal(verdict.problems, undefined);
});

test('formatThemes leads with global, section and component', () => {
  assert.equal(
    formatThemes({
      header: 'one',
      component: 'two',
      global: 'three',
      section: 'four',
    }),
    'global=three section=four component=two header=one',
  );
  assert.equal(formatThemes({}), 'none');
});

test('normaliseLinkText collapses whitespace and caps the length', () => {
  assert.equal(normaliseLinkText('  Read\n   more '), 'Read more');
  assert.equal(normaliseLinkText('x'.repeat(100)).length, 80);
});

test('evaluateSamples collapses repeats of the same failure and counts them', () => {
  const bad = sample({ textShadow: halo(NAVY) });
  const result = evaluateSamples([bad, bad, sample({ state: 'hover' })]);
  assert.equal(result.checked, 3);
  assert.equal(result.combinations, 1);
  assert.equal(result.failures.length, 1);
  assert.equal(result.failures[0].count, 2);
  assert.equal(
    failureKey(result.failures[0]),
    'molecules-link-grid--link-grid | global=one component=one | rest | halo | link-grid a.link | This is a link',
  );
});

test('evaluateSamples reports skips separately', () => {
  const result = evaluateSamples([
    sample({ layers: [layer('', { tag: 'video', label: '<video>' })] }),
  ]);
  assert.equal(result.checked, 0);
  assert.equal(result.skipped.length, 1);
});

const entry = (story, link, where = '') => ({
  story,
  themes: 'global=one',
  state: 'rest',
  check: 'halo',
  where,
  link,
});

test('diffBaseline splits new, known and stale failures', () => {
  const failures = [entry('a', 'known'), entry('a', 'new')];
  const baseline = [
    entry('a', 'known'),
    entry('a', 'fixed'),
    entry('b', 'unvisited'),
  ];
  const diff = diffBaseline(failures, baseline, new Set(['a']));
  assert.deepEqual(
    diff.newFailures.map((f) => f.link),
    ['new'],
  );
  assert.deepEqual(
    diff.known.map((f) => f.link),
    ['known'],
  );
  // An entry for a story this run did not render cannot be called stale.
  assert.deepEqual(
    diff.stale.map((f) => f.link),
    ['fixed'],
  );
});

test('updatedBaseline replaces visited stories and keeps the rest', () => {
  const updated = updatedBaseline(
    [{ ...entry('a', 'new'), detail: 'x', count: 3, title: 't', variant: 'v' }],
    [entry('a', 'fixed'), entry('b', 'unvisited')],
    new Set(['a']),
  );
  assert.deepEqual(updated, [entry('a', 'new'), entry('b', 'unvisited')]);
});

test('a link sharing text with a baselined one in another component is still new', () => {
  // The Post and Event reference cards share their category fixtures, so the
  // same link text renders twice under the same themes and state.
  const post = 'card-collection reference-card a.link';
  const event = 'card-collection reference-card a.link #2';
  const { failures } = evaluateSamples([
    sample({ text: 'Foo', where: post, textShadow: halo(NAVY) }),
    sample({ text: 'Foo', where: event, textShadow: halo(NAVY) }),
  ]);
  assert.equal(failures.length, 2);

  const diff = diffBaseline(
    failures,
    [{ ...entry(failures[0].story, 'Foo', post), themes: failures[0].themes }],
    new Set([failures[0].story]),
  );
  assert.deepEqual(
    diff.newFailures.map((failure) => failure.where),
    [event],
  );
  assert.match(
    formatReport({
      visits: 1,
      stories: 1,
      evaluation: { checked: 2, skipped: [], combinations: 1, failures },
      diff,
      errors: [],
    }),
    /where: {2}card-collection reference-card a\.link #2/,
  );
});

test('an unfiltered run reports entries for deleted stories as stale', () => {
  const baseline = [entry('a', 'kept'), entry('gone', 'old')];
  const failures = [entry('a', 'kept')];
  const visited = new Set(['a']);

  // Filtered: `gone` might just have been filtered out, so it says nothing.
  assert.deepEqual(diffBaseline(failures, baseline, visited).stale, []);

  // Unfiltered: `gone` is not in the index at all.
  const indexed = new Set(['a']);
  assert.deepEqual(
    diffBaseline(failures, baseline, visited, indexed).stale.map(
      (stale) => stale.story,
    ),
    ['gone'],
  );
  // A stale entry warns; it is never a new failure.
  assert.deepEqual(
    diffBaseline(failures, baseline, visited, indexed).newFailures,
    [],
  );
});

test('an unfiltered update drops entries for deleted stories, a filtered one keeps them', () => {
  const baseline = [entry('a', 'kept'), entry('gone', 'old')];
  const failures = [entry('a', 'kept')];
  const visited = new Set(['a']);

  assert.deepEqual(
    updatedBaseline(failures, baseline, visited, new Set(['a'])),
    [entry('a', 'kept')],
  );
  assert.deepEqual(updatedBaseline(failures, baseline, visited), [
    entry('a', 'kept'),
    entry('gone', 'old'),
  ]);
});

const indexFixture = {
  entries: {
    'molecules-link-grid--overview': {
      type: 'docs',
      id: 'molecules-link-grid--overview',
      title: 'Molecules/Link grid',
      name: 'Overview',
      importPath: './components/02-molecules/link-grid/link-grid.mdx',
    },
    'molecules-link-grid--link-grid': {
      type: 'story',
      id: 'molecules-link-grid--link-grid',
      title: 'Molecules/Link grid',
      name: 'Link Grid',
      importPath: './components/02-molecules/link-grid/link-grid.stories.js',
      tags: ['dev'],
    },
    'molecules-link-grid-visreg--old-blues': {
      type: 'story',
      id: 'molecules-link-grid-visreg--old-blues',
      title: 'Molecules/Link grid/Visreg',
      name: 'Old Blues',
      importPath:
        './components/02-molecules/link-grid/link-grid.visreg.stories.js',
      tags: ['dev', 'visreg'],
    },
  },
};

test('selectVisits renders visreg stories once and every other story per global theme', () => {
  const visits = selectVisits(indexFixture, ['one', 'two']);
  assert.deepEqual(
    visits.map((visit) => `${visit.id}:${visit.globalTheme}`),
    [
      'molecules-link-grid--link-grid:one',
      'molecules-link-grid--link-grid:two',
      'molecules-link-grid-visreg--old-blues:null',
    ],
  );
});

test('selectVisits honours a filter and refuses to select nothing', () => {
  assert.equal(selectVisits(indexFixture, ['one'], /visreg/).length, 1);
  assert.throws(
    () => selectVisits(indexFixture, ['one'], /nope/),
    /No stories match/,
  );
  assert.throws(() => selectVisits({}, ['one']), /storybook:build/);
});

test('splitVisits puts visreg stories and the first global theme in the first pass', () => {
  const { first, deferred } = splitVisits(
    selectVisits(indexFixture, ['one', 'two']),
    ['one', 'two'],
  );
  assert.deepEqual(
    first.map((visit) => `${visit.id}:${visit.globalTheme}`),
    [
      'molecules-link-grid--link-grid:one',
      'molecules-link-grid-visreg--old-blues:null',
    ],
  );
  assert.deepEqual(
    deferred.map((visit) => `${visit.id}:${visit.globalTheme}`),
    ['molecules-link-grid--link-grid:two'],
  );
});

test('deferredToRender drops only stories whose first render had no link', () => {
  const deferred = [
    { id: 'has-links', globalTheme: 'two' },
    { id: 'no-links', globalTheme: 'two' },
    { id: 'broken', globalTheme: 'two' },
  ];
  const kept = deferredToRender(deferred, [
    { id: 'has-links', links: 3 },
    { id: 'no-links', links: 0 },
    { id: 'broken', links: 0, error: 'Timed out' },
  ]);
  assert.deepEqual(
    kept.map((visit) => visit.id),
    ['has-links', 'broken'],
  );
});

test('the report names story, themes, state and link text for a new failure', () => {
  const evaluation = evaluateSamples([
    sample({ textShadow: halo(NAVY), state: 'hover' }),
  ]);
  const report = formatReport({
    visits: 7,
    stories: 1,
    evaluation,
    diff: diffBaseline(evaluation.failures, [], new Set()),
    errors: [],
  });
  assert.match(report, /1 new failure not in link-halo-baseline.json/);
  assert.match(report, /halo \| "This is a link" \| hover/);
  assert.match(
    report,
    /story: {2}Molecules\/Link grid > Link Grid \(molecules-link-grid--link-grid\)/,
  );
  assert.match(report, /themes: global=one component=one/);
});

test('the report warns about stale entries and failed renders', () => {
  const evaluation = evaluateSamples([sample()]);
  const report = formatReport({
    visits: 1,
    stories: 1,
    evaluation,
    diff: { newFailures: [], known: [], stale: [entry('a', 'fixed')] },
    errors: [{ id: 'b', globalTheme: 'two', error: 'Timeout' }],
  });
  assert.match(report, /1 baseline entry no longer fails -- delete it/);
  assert.match(report, /b \(global=two\): Timeout/);
});

test('every state is checked, resting first', () => {
  assert.deepEqual(STATES, ['rest', 'hover', 'focus-visible']);
});
