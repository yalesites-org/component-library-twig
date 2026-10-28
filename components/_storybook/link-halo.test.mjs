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
import { readFileSync } from 'node:fs';

import {
  CHANNEL_TOLERANCE,
  STATES,
  THEME_CROSS_LIMIT,
  bootStoryId,
  composite,
  diffBaseline,
  evaluateSample,
  evaluateSamples,
  failureKey,
  formatArgs,
  formatReport,
  formatThemes,
  groupOfEntry,
  haloShadows,
  isLargeText,
  normaliseLinkText,
  parseColor,
  parseTextShadow,
  resolveBackground,
  SECTION_THEMES,
  STALE_SHARE_LIMIT,
  componentsChecked,
  coverageProblems,
  orderPages,
  parkGlobalThemes,
  pickSample,
  planPages,
  pseudoElementBox,
  restoreGlobalThemes,
  revealLineBox,
  scrollToReveal,
  visibleLineBox,
  splitGlobalThemeName,
  splitTopLevel,
  themeArgCombinations,
  themeArgs,
  updatedBaseline,
  visitKey,
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

const GREY_3_5 = 'rgb(136, 136, 136)'; // 3.54:1 on white
const GREY_5 = 'rgb(110, 110, 110)'; // 5.10:1 on white

test('a large-text pass between 3:1 and 4.5:1 is flagged as relying on the allowance', () => {
  const verdict = evaluateSample(sample({ color: GREY_3_5, fontSize: 24 }));
  assert.deepEqual(verdict.problems, []);
  assert.equal(verdict.largeTextAllowance, true);
  assert.match(verdict.contrast, /3\.54:1/);
});

test('normal text at 3.5:1 fails and is not flagged', () => {
  const verdict = evaluateSample(sample({ color: GREY_3_5 }));
  assert.equal(verdict.largeTextAllowance, undefined);
  assert.deepEqual(
    verdict.problems.map(({ check, largeTextAllowance }) => [
      check,
      largeTextAllowance,
    ]),
    [['contrast', undefined]],
  );
});

test('large text that clears 4.5:1 needs no allowance and is not flagged', () => {
  const verdict = evaluateSample(sample({ color: GREY_5, fontSize: 24 }));
  assert.deepEqual(verdict.problems, []);
  assert.equal(verdict.largeTextAllowance, undefined);
});

test('a large-text contrast failure says it was held to the 3:1 allowance', () => {
  const [problem] = evaluateSample(
    sample({ color: 'rgb(200, 200, 200)', fontSize: 24 }),
  ).problems;
  assert.equal(problem.largeTextAllowance, true);
  assert.match(problem.detail, /needs 3:1 \(WCAG large text\)/);
});

test('allowance passes are listed and reported, and leave failure keys alone', () => {
  const relying = sample({ color: GREY_3_5, fontSize: 24 });
  const evaluation = evaluateSamples([
    relying,
    relying,
    sample({ color: GREY_5, fontSize: 24 }),
  ]);
  assert.equal(evaluation.failures.length, 0);
  assert.equal(evaluation.largeTextAllowance.length, 1);
  assert.equal(evaluation.largeTextAllowance[0].count, 2);
  assert.match(evaluation.largeTextAllowance[0].detail, /3\.54:1/);

  const report = formatReport({
    visits: 1,
    stories: 1,
    evaluation,
    diff: { newFailures: [], known: [], stale: [] },
    errors: [],
  });
  assert.match(report, /1 link passes contrast only through/);
  assert.match(report, /functional-element-contrast\.mjs/);
  assert.match(report, /"This is a link"/);

  // A large-text failure carries the flag, but its key is the same as it
  // would be without it, so the baseline matches it as before.
  const failing = evaluateSamples([
    sample({ color: 'rgb(200, 200, 200)', fontSize: 24 }),
  ]).failures[0];
  assert.equal(failing.largeTextAllowance, true);
  const { largeTextAllowance, ...unflagged } = failing;
  assert.equal(failureKey(failing), failureKey(unflagged));
});

// A halo the way Chrome serializes one shadow of it, and a text node's sample.
const HALO_SHADOW = 'rgb(255, 255, 255) 0.48px 0px 0px';
const node = (text, textShadow, fontSize = 16) => ({
  text,
  textShadow,
  fontSize,
});

const pickFrom = (attempts) => {
  const tried = [];
  const picked = pickSample((index) => {
    tried.push(index);
    return attempts[index];
  });
  return { picked, tried };
};

test('pickSample prefers a visible text node that draws a halo', () => {
  const { picked, tried } = pickFrom([
    null,
    node('eyebrow', 'none'),
    node('title', HALO_SHADOW),
    node('never reached', 'rgb(0, 0, 0) 1px 0px 0px'),
  ]);
  assert.equal(picked.text, 'title');
  assert.deepEqual(tried, [0, 1, 2], 'stops at the first halo sample');
});

test('pickSample passes over a blurred drop shadow to reach the halo', () => {
  // A shadow is not a halo just because it is there (`haloShadows`): this
  // eyebrow's soft drop shadow would make the link read as drawing none.
  const { picked } = pickFrom([
    node('eyebrow', 'rgba(0, 0, 0, 0.5) 0px 2px 4px'),
    node('title', HALO_SHADOW, 32),
  ]);
  assert.equal(picked.text, 'title');
});

test('pickSample passes over a transparent shadow to reach the halo', () => {
  const { picked } = pickFrom([
    node('eyebrow', 'rgba(0, 0, 0, 0) 1px 0px 0px'),
    node('title', HALO_SHADOW),
  ]);
  assert.equal(picked.text, 'title');
});

test('pickSample takes the first visible node when all share one halo', () => {
  const { picked, tried } = pickFrom([
    null,
    node('first', HALO_SHADOW),
    node('second', HALO_SHADOW),
  ]);
  assert.equal(picked.text, 'first');
  assert.deepEqual(tried, [0, 1]);
});

test('pickSample falls back to the first visible node when none draws a halo', () => {
  const { picked, tried } = pickFrom([
    null,
    node('blurred', 'rgba(0, 0, 0, 0.5) 0px 2px 4px'),
    node('plain', 'none'),
  ]);
  assert.equal(picked.text, 'blurred');
  assert.deepEqual(tried, [0, 1, 2, 3], 'tries every node before falling back');
  assert.equal(
    pickSample((index) => [null, node('a', 'none'), node('b', 'none')][index])
      .text,
    'a',
  );
  assert.equal(
    pickSample(() => null),
    null,
  );
  assert.equal(
    pickSample(() => undefined),
    null,
  );
});

test('pickSample tries at most the limit', () => {
  const tried = [];
  pickSample((index) => {
    tried.push(index);
    return null;
  }, 3);
  assert.deepEqual(tried, [0, 1, 2]);
});

const VIEW = { width: 1200, height: 800 };
const rect = (left, top, width, height) => ({
  left,
  top,
  right: left + width,
  bottom: top + height,
});

test('scrollToReveal leaves a rect that is fully on screen alone', () => {
  assert.equal(scrollToReveal(rect(0, 0, 1200, 800), VIEW), null);
  assert.equal(scrollToReveal(rect(100, 300, 80, 20), VIEW), null);
});

test('scrollToReveal centres a rect that has any edge off screen', () => {
  // Below the fold: vertical scroll only.
  assert.deepEqual(scrollToReveal(rect(100, 900, 80, 20), VIEW), {
    x: 0,
    y: 510,
  });
  // Bottom edge a pixel past the viewport, centre well inside.
  assert.deepEqual(scrollToReveal(rect(100, 790, 80, 20), VIEW), {
    x: 0,
    y: 400,
  });
  // Right edge off screen though the centre is not: horizontal too.
  assert.deepEqual(scrollToReveal(rect(1150, 300, 80, 20), VIEW), {
    x: 590,
    y: -90,
  });
  // Left edge off screen.
  assert.deepEqual(scrollToReveal(rect(-30, 300, 80, 20), VIEW), {
    x: -590,
    y: -90,
  });
});

test('scrollToReveal survives serialization on its own', () => {
  // eslint-disable-next-line no-new-func
  const copy = (fn) => new Function(`return ${fn.toString()};`)();
  assert.deepEqual(
    copy(scrollToReveal)(rect(1150, 300, 80, 20), VIEW),
    scrollToReveal(rect(1150, 300, 80, 20), VIEW),
  );
});

// A clip on one axis only, the way an `overflow-x: hidden` box clips.
const clipX = (left, right) => ({
  left,
  right,
  top: -Infinity,
  bottom: Infinity,
});

test('visibleLineBox judges an ellipsis box near the right edge in place', () => {
  // The text runs to 1600px, past the viewport, but its `overflow: hidden`
  // box stops at 1180px: what is painted is all on screen.
  assert.deepEqual(
    visibleLineBox(rect(1000, 300, 600, 20), [rect(980, 290, 200, 40)], VIEW),
    { box: rect(1000, 300, 180, 20) },
  );
  // A container wider than the viewport on a page with `overflow-x:
  // hidden`, which no horizontal scroll can reach past.
  assert.deepEqual(
    visibleLineBox(rect(900, 300, 600, 20), [clipX(0, 1200)], VIEW),
    { box: rect(900, 300, 300, 20) },
  );
});

test('visibleLineBox judges a box fully on screen without scrolling', () => {
  assert.deepEqual(visibleLineBox(rect(100, 300, 80, 20), [], VIEW), {
    box: rect(100, 300, 80, 20),
  });
  assert.deepEqual(
    visibleLineBox(rect(100, 300, 80, 20), [clipX(0, 1200)], VIEW),
    { box: rect(100, 300, 80, 20) },
  );
});

test('visibleLineBox scrolls a box below the fold to the middle', () => {
  assert.deepEqual(visibleLineBox(rect(100, 900, 80, 20), [], VIEW), {
    scroll: { x: 0, y: 510 },
  });
  // The scroll centres what is painted, not the unclipped text.
  assert.deepEqual(
    visibleLineBox(rect(1000, 900, 600, 20), [rect(980, 0, 200, 2000)], VIEW),
    { scroll: { x: 0, y: 510 } },
  );
});

test('visibleLineBox calls a box its ancestors clip away hidden', () => {
  // A collapsed panel: zero height.
  assert.deepEqual(
    visibleLineBox(rect(100, 300, 80, 20), [rect(0, 290, 1200, 0)], VIEW),
    { hidden: true },
  );
  // Clipped off to the side by one ancestor, though another would show it.
  assert.deepEqual(
    visibleLineBox(
      rect(100, 300, 80, 20),
      [rect(0, 0, 1200, 800), clipX(500, 900)],
      VIEW,
    ),
    { hidden: true },
  );
  // Less than a pixel showing.
  assert.deepEqual(
    visibleLineBox(rect(100, 300, 80, 20), [clipX(179.5, 400)], VIEW),
    { hidden: true },
  );
});

test('revealLineBox scrolls at most once and re-checks once', () => {
  const run = (layouts) => {
    const scrolls = [];
    let measured = 0;
    const box = revealLineBox(
      () => {
        measured += 1;
        return layouts[measured - 1] ?? layouts[layouts.length - 1];
      },
      (x, y) => scrolls.push({ x, y }),
    );
    return { box, scrolls, measured };
  };
  const at = (top) => ({
    rect: rect(100, top, 80, 20),
    clips: [],
    viewport: VIEW,
  });

  // On screen: judged where it is.
  assert.deepEqual(run([at(300)]), {
    box: rect(100, 300, 80, 20),
    scrolls: [],
    measured: 1,
  });
  // Below the fold: one scroll, then judged where it landed.
  assert.deepEqual(run([at(900), at(390)]), {
    box: rect(100, 390, 80, 20),
    scrolls: [{ x: 0, y: 510 }],
    measured: 2,
  });
  // A scroll that does not bring it on screen (the page cannot scroll that
  // far) is not retried: skipped after the one re-check.
  assert.deepEqual(run([at(900)]), {
    box: null,
    scrolls: [{ x: 0, y: 510 }],
    measured: 2,
  });
  // Clipped away, or no line box at all: skipped without scrolling.
  assert.deepEqual(
    run([
      { rect: rect(100, 300, 80, 20), clips: [clipX(0, 0)], viewport: VIEW },
    ]),
    { box: null, scrolls: [], measured: 1 },
  );
  assert.deepEqual(run([null]), { box: null, scrolls: [], measured: 1 });
  // The line box gone after the scroll.
  assert.deepEqual(run([at(900), null]), {
    box: null,
    scrolls: [{ x: 0, y: 510 }],
    measured: 2,
  });
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

test('an unreadable text colour keeps the halo problem already found', () => {
  const verdict = evaluateSample(
    sample({ color: 'oklab(0.5 0.1 0.1)', textShadow: halo(NAVY) }),
  );
  assert.equal(verdict.skip, undefined);
  assert.deepEqual(
    verdict.problems.map(({ check }) => check),
    ['halo'],
  );
});

test('an unreadable text colour with a matching halo is still a skip', () => {
  const verdict = evaluateSample(sample({ color: 'oklab(0.5 0.1 0.1)' }));
  assert.match(verdict.skip, /unreadable text colour "oklab\(0.5 0.1 0.1\)"/);
  assert.equal(verdict.problems, undefined);
});

test('an unreadable halo colour still judges contrast and the readable halos', () => {
  const unreadable = 'oklab(1 0 0) 0.48px 0px 0px';
  const grey = { color: 'rgb(170, 170, 170)' };

  const contrast = evaluateSample(
    sample({ ...grey, textShadow: `${halo(WHITE)}, ${unreadable}` }),
  );
  assert.equal(contrast.skip, undefined);
  assert.deepEqual(
    contrast.problems.map(({ check }) => check),
    ['contrast'],
  );

  const both = evaluateSample(
    sample({ ...grey, textShadow: `${halo(NAVY)}, ${unreadable}` }),
  );
  assert.deepEqual(
    both.problems.map(({ check }) => check),
    ['halo', 'contrast'],
  );

  // Nothing found, but the halo was not fully judged: not a pass.
  const clean = evaluateSample(
    sample({ textShadow: `${halo(WHITE)}, ${unreadable}` }),
  );
  assert.match(clean.skip, /unreadable text-shadow/);
  assert.equal(clean.problems, undefined);
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
  const diff = diffBaseline(failures, baseline, new Set(['a|']));
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
    new Set(['a|']),
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
    new Set([`${failures[0].story}|`]),
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

test('an unfiltered run reports entries for renders that no longer exist as stale', () => {
  const baseline = [entry('a', 'kept'), entry('gone', 'old')];
  const failures = [entry('a', 'kept')];
  const visited = new Set(['a|']);

  // Filtered: `gone` might just have been filtered out, so it says nothing.
  assert.deepEqual(diffBaseline(failures, baseline, visited).stale, []);

  // Unfiltered: `gone` was not rendered, so it no longer exists.
  assert.deepEqual(
    diffBaseline(failures, baseline, visited, true).stale.map(
      (stale) => stale.story,
    ),
    ['gone'],
  );
  // A stale entry warns; it is never a new failure.
  assert.deepEqual(
    diffBaseline(failures, baseline, visited, true).newFailures,
    [],
  );
});

test('an unfiltered update drops entries for renders that are gone, a filtered one keeps them', () => {
  const baseline = [entry('a', 'kept'), entry('gone', 'old')];
  const failures = [entry('a', 'kept')];
  const visited = new Set(['a|']);

  assert.deepEqual(updatedBaseline(failures, baseline, visited, true), [
    entry('a', 'kept'),
  ]);
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

test('planPages honours a filter and refuses to plan nothing', () => {
  const options = { globalThemes: ['one'], labels: { one: 'Old Blues' } };
  assert.equal(
    planPages(indexFixture, { ...options, filter: /visreg/ }).length,
    1,
  );
  assert.throws(
    () => planPages(indexFixture, { ...options, filter: /nope/ }),
    /No stories in scope match/,
  );
  assert.throws(() => planPages({}, options), /storybook:build/);
});

test('bootStoryId is the first planned story, and an empty plan says why', () => {
  const options = { globalThemes: ['one'], labels: { one: 'Old Blues' } };
  assert.equal(
    bootStoryId(indexFixture, options),
    planPages(indexFixture, options)[0].id,
  );
  assert.equal(
    bootStoryId(indexFixture, { ...options, filter: /visreg/ }),
    planPages(indexFixture, { ...options, filter: /visreg/ })[0].id,
  );
  // A filter that matches no in-scope story: the plan's own message, not a
  // TypeError from indexing an empty plan.
  assert.throws(
    () => bootStoryId(indexFixture, { ...options, filter: /nope/ }),
    (error) =>
      !(error instanceof TypeError) &&
      /No stories in scope match \/nope\//.test(error.message),
  );
  assert.throws(
    () => bootStoryId(indexFixture, { ...options, inScope: () => false }),
    /No stories to visit/,
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

/** argTypes the way `readStories` hands them over. */
const calloutArgTypes = {
  backgroundColor: {
    name: 'Callout Theme (dial)',
    options: ['one', 'two', 'three'],
  },
  sectionTheme: { name: 'Section Theme', options: ['default', 'one'] },
  linkType: { name: 'Link Type', options: ['cta', 'link'] },
  columnCount: { name: 'Columns', options: ['two', 'three', 'four'] },
  footerVariation: {
    name: 'Footer Variation (dial)',
    options: ['basic', 'mega'],
  },
  single: { name: 'Lonely Theme (dial)', options: ['one'] },
};

test('themeArgs keeps controls that choose a theme and nothing else', () => {
  assert.deepEqual(themeArgs(calloutArgTypes), [
    { name: 'backgroundColor', options: ['one', 'two', 'three'] },
    { name: 'sectionTheme', options: ['default', 'one'] },
  ]);
  // A label that says theme is not enough when the options are not themes,
  // and theme words are not enough when the label does not say theme.
  assert.deepEqual(themeArgs({ columnCount: calloutArgTypes.columnCount }), []);
  assert.deepEqual(themeArgs(undefined), []);
});

test('themeArgCombinations crosses every theme control, initial values first', () => {
  const { combinations, crossed } = themeArgCombinations(
    themeArgs(calloutArgTypes),
    { backgroundColor: 'two', sectionTheme: 'default' },
  );
  assert.equal(crossed, true);
  assert.equal(combinations.length, 6);
  assert.deepEqual(combinations[0], {
    backgroundColor: 'two',
    sectionTheme: 'default',
  });
  assert.equal(
    new Set(combinations.map((combination) => formatArgs(combination))).size,
    6,
    'every combination once',
  );
});

test('themeArgCombinations falls back to one control at a time past the limit', () => {
  const args = [
    { name: 'a', options: ['one', 'two', 'three'] },
    { name: 'b', options: ['one', 'two', 'three'] },
  ];
  const { combinations, crossed } = themeArgCombinations(args, {}, 8);
  assert.equal(crossed, false);
  // The initial combination, then each other value of each control alone.
  assert.deepEqual(combinations.map(formatArgs), [
    'a=one b=one',
    'a=two b=one',
    'a=three b=one',
    'a=one b=two',
    'a=one b=three',
  ]);
  assert.ok(THEME_CROSS_LIMIT >= 49, 'the largest real cross is 49');
  assert.deepEqual(themeArgCombinations([], {}).combinations, []);
});

test('a link that draws no halo is left alone, contrast included', () => {
  const result = evaluateSamples([
    sample({ textShadow: 'none', color: 'rgb(250, 250, 250)' }),
  ]);
  assert.equal(result.checked, 0);
  assert.equal(result.notHalo, 1);
  assert.deepEqual(result.failures, []);
});

test('theme args are part of a failure key, and absent when there are none', () => {
  const plain = { ...entry('a', 'x') };
  assert.equal(failureKey(plain), 'a | global=one | rest | halo |  | x');
  assert.equal(
    failureKey({ ...plain, args: 'siteHeaderAccent=two' }),
    'a | global=one | siteHeaderAccent=two | rest | halo |  | x',
  );

  // Two accents of one header render the same data-*-theme attributes; the
  // args are what keep one from hiding the other.
  const { failures } = evaluateSamples([
    sample({ textShadow: halo(NAVY), args: { siteHeaderAccent: 'one' } }),
    sample({ textShadow: halo(NAVY), args: { siteHeaderAccent: 'two' } }),
  ]);
  assert.deepEqual(
    failures.map((failure) => failure.args),
    ['siteHeaderAccent=one', 'siteHeaderAccent=two'],
  );
  const updated = updatedBaseline(
    failures,
    [],
    new Set(failures.map(groupOfEntry)),
  );
  assert.equal(updated[0].args, 'siteHeaderAccent=one');
  assert.equal(
    'args' in updatedBaseline([plain], [], new Set(['a|']))[0],
    false,
  );
});

test('the report names the theme args of a failure and of a failed render', () => {
  const evaluation = evaluateSamples([
    sample({ textShadow: halo(NAVY), args: { bgColor: 'three' } }),
  ]);
  const report = formatReport({
    visits: 1,
    stories: 1,
    evaluation,
    diff: diffBaseline(evaluation.failures, [], new Set()),
    errors: [
      { id: 'b', globalTheme: 'two', args: { bgColor: 'four' }, error: 'x' },
    ],
  });
  assert.match(report, /args: {3}bgColor=three/);
  assert.match(report, /b \(global=two bgColor=four\): x/);
});

test('a narrow viewport is part of a failure key, and absent at the default width', () => {
  const plain = { ...entry('a', 'x') };
  assert.equal(
    failureKey({ ...plain, viewport: 768 }),
    'a | global=one | 768px | rest | halo |  | x',
  );
  assert.equal(
    failureKey({ ...plain, args: 'bgColor=two', viewport: 768 }),
    'a | global=one | bgColor=two | 768px | rest | halo |  | x',
  );

  // The same link failing at both widths is two failures, so fixing one
  // width cannot hide behind the other's baseline entry.
  const { failures, combinations } = evaluateSamples([
    sample({ textShadow: halo(NAVY) }),
    sample({ textShadow: halo(NAVY), viewport: 768 }),
  ]);
  assert.equal(combinations, 2);
  assert.equal(failures.length, 2);
  const wide = failures.find((failure) => !('viewport' in failure));
  const narrow = failures.find((failure) => failure.viewport === 768);
  assert.ok(wide && narrow);
  assert.notEqual(failureKey(wide), failureKey(narrow));

  // A baseline entry only knows the render it came from.
  assert.equal(visitKey({ id: 'a', args: null }), 'a|');
  assert.equal(visitKey({ id: 'a', args: null, viewport: 768 }), 'a||768px');
  assert.equal(groupOfEntry(wide), visitKey({ id: wide.story, args: null }));
  assert.equal(
    groupOfEntry(narrow),
    visitKey({ id: narrow.story, args: null, viewport: 768 }),
  );
  const wideOnly = new Set([groupOfEntry(wide)]);
  assert.deepEqual(
    diffBaseline([wide], failures, wideOnly).stale,
    [],
    'a filtered run that rendered only the wide page does not call the narrow entry stale',
  );
  const updated = updatedBaseline(failures, [], new Set());
  assert.equal(updated.filter((item) => 'viewport' in item).length, 1);
  assert.equal(updated.find((item) => 'viewport' in item).viewport, 768);
});

test('the report names the viewport of a narrow failure and of a failed render', () => {
  const evaluation = evaluateSamples([
    sample({ textShadow: halo(NAVY), viewport: 768 }),
  ]);
  const report = formatReport({
    visits: 1,
    stories: 1,
    evaluation,
    diff: diffBaseline(evaluation.failures, [], new Set()),
    errors: [{ id: 'b', args: null, viewport: 768, error: 'x' }],
  });
  assert.match(report, /viewport: 768px/);
  assert.match(report, /b \(768px\): x/);
});

test('an excluded component judged only at a narrow width still fails the run', () => {
  // NO_HALO_LINKS is enforced over every viewport together: a judged sample
  // from the narrow pass counts for the story's component like any other.
  const evaluation = evaluateSamples([
    sample({ story: 'organisms-menu--secondary', viewport: 768 }),
    sample(),
  ]);
  const problems = coverageProblems({
    checkedByComponent: componentsChecked(evaluation.checkedByStory, (story) =>
      story.startsWith('organisms-menu')
        ? '03-organisms/menu'
        : '02-molecules/link-grid',
    ),
    components: ['02-molecules/link-grid', '03-organisms/menu'],
    expectedEmpty: { '03-organisms/menu': 'no rich-text slot' },
    stale: 0,
    baselineSize: 0,
    complete: true,
  });
  assert.match(
    problems.join('\n'),
    /03-organisms\/menu is in NO_HALO_LINKS, but 1 halo link sample .* Remove it/,
  );
});

const labels = {
  one: 'Old Blues',
  two: 'New Haven Green',
  five: 'It’s Your Yale',
};
const planIndex = {
  entries: {
    story: {
      type: 'story',
      id: 'molecules-callout--callout',
      title: 'Molecules/Callout',
      name: 'Callout',
      importPath: './components/02-molecules/callout/callout.stories.js',
    },
    sectioned: {
      type: 'story',
      id: 'atoms-controls--cta',
      title: 'Atoms/Controls',
      name: 'CTA',
      importPath: './components/01-atoms/controls/controls.stories.js',
    },
    footer: {
      type: 'story',
      id: 'organisms-footer--footer',
      title: 'Organisms/Footer',
      name: 'Footer',
      importPath:
        './components/03-organisms/site-footer/site-footer.stories.js',
    },
    ...Object.fromEntries(
      [
        'Old Blues Section Two',
        'New Haven Green Section Two',
        'Old Blues',
        'Extras',
      ].map((name) => [
        name,
        {
          type: 'story',
          id: `molecules-callout-visreg--${name
            .toLowerCase()
            .replace(/ /g, '-')}`,
          title: 'Molecules/Callout/Visreg',
          name,
          importPath:
            './components/02-molecules/callout/callout.visreg.stories.js',
          tags: ['visreg'],
        },
      ]),
    ),
  },
};
const planStories = {
  'molecules-callout--callout': {
    argTypes: {
      backgroundColor: {
        name: 'Callout Theme (dial)',
        options: ['one', 'two'],
      },
    },
    initialArgs: { backgroundColor: 'two' },
  },
  'atoms-controls--cta': {
    argTypes: {
      sectionTheme: { name: 'Section Theme', options: ['default', 'one'] },
      componentTheme: { name: 'Button Theme (dial)', options: ['one', 'two'] },
    },
    initialArgs: {},
  },
};

test('splitGlobalThemeName finds the global theme a visreg story is named for', () => {
  assert.deepEqual(splitGlobalThemeName('Old Blues Section Two', labels), {
    global: 'one',
    rest: 'Section Two',
  });
  assert.deepEqual(splitGlobalThemeName('It’s Your Yale', labels), {
    global: 'five',
    rest: '',
  });
  assert.deepEqual(splitGlobalThemeName('Old Bluesy', labels), {
    global: null,
    rest: 'Old Bluesy',
  });
});

test('planPages renders each story once per dial value and copies it into every theme combination', () => {
  const pages = planPages(planIndex, {
    globalThemes: ['one', 'two'],
    labels,
    stories: planStories,
    sectionless: ({ importPath }) => importPath.includes('site-footer'),
    sectionThemes: ['default', 'one'],
  });
  const byId = (id) => pages.filter((page) => page.id === id);

  // A dial is rendered once per value, initial value first; each render is
  // copied into no section and every section theme, in every global theme.
  const callout = byId('molecules-callout--callout');
  assert.deepEqual(
    callout.map((page) => page.args),
    [{ backgroundColor: 'two' }, { backgroundColor: 'one' }],
  );
  assert.deepEqual(
    callout[0].clones.map(({ global, section }) => `${global}/${section}`),
    [
      'one/null',
      'one/default',
      'one/one',
      'two/null',
      'two/default',
      'two/one',
    ],
  );

  // The story's own section control is never rendered per value: the copies
  // set it, and there is no sectionless copy because the story always renders
  // a section.
  const cta = byId('atoms-controls--cta');
  assert.equal(cta.length, 2);
  assert.equal(cta[0].sectionArg, 'sectionTheme');
  assert.deepEqual(cta[0].args, { componentTheme: 'one' });
  assert.deepEqual(
    cta[0].clones.map(({ section }) => section),
    ['default', 'one', 'default', 'one'],
  );

  // Page chrome is never put in a section.
  assert.deepEqual(
    byId('organisms-footer--footer')[0].clones.map(({ section }) => section),
    [null, null],
  );

  // Visreg stories that differ only in global theme are rendered once, each
  // copy keyed by the story that shows its theme; one with no theme in its
  // name is copied into every global theme under its own id.
  const visreg = pages.filter((page) => page.visreg);
  assert.deepEqual(
    visreg.map((page) => [
      page.id,
      page.clones.map((clone) => `${clone.global}:${clone.story}`),
    ]),
    [
      [
        'molecules-callout-visreg--extras',
        [
          'one:molecules-callout-visreg--extras',
          'two:molecules-callout-visreg--extras',
        ],
      ],
      [
        'molecules-callout-visreg--old-blues-section-two',
        [
          'one:molecules-callout-visreg--old-blues-section-two',
          'two:molecules-callout-visreg--new-haven-green-section-two',
        ],
      ],
      [
        'molecules-callout-visreg--old-blues',
        ['one:molecules-callout-visreg--old-blues'],
      ],
    ],
  );

  assert.equal(orderPages(pages)[0].clones.length, 6);
  assert.throws(
    () =>
      planPages(planIndex, { globalThemes: ['one'], labels, filter: /nope/ }),
    /No stories in scope/,
  );
});

test('planPages adds a narrow copy of each page only for the stories that ask for one', () => {
  const options = {
    globalThemes: ['one', 'two'],
    labels,
    stories: planStories,
    sectionThemes: ['default', 'one'],
  };
  const wide = planPages(planIndex, options);
  const pages = planPages(planIndex, {
    ...options,
    viewports: ({ importPath }) =>
      importPath.includes('/callout/callout.stories') ? [768] : [],
  });

  // Every default page is planned exactly as before, at the default width,
  // and the narrow ones come after all of them.
  assert.deepEqual(pages.slice(0, wide.length), wide);
  assert.ok(wide.every((page) => page.viewport === null));

  const narrow = pages.slice(wide.length);
  assert.deepEqual(
    narrow.map((page) => [page.id, page.args, page.viewport]),
    [
      ['molecules-callout--callout', { backgroundColor: 'two' }, 768],
      ['molecules-callout--callout', { backgroundColor: 'one' }, 768],
    ],
  );
  const wideCallout = wide.find(
    (page) => page.id === 'molecules-callout--callout',
  );
  assert.deepEqual(narrow[0].clones, wideCallout.clones);
  assert.notEqual(visitKey(narrow[0]), visitKey(wideCallout));
});

test('SECTION_THEMES matches theme-constants.js', () => {
  const source = readFileSync(
    new URL('./theme-constants.js', import.meta.url),
    'utf8',
  );
  const declared = source
    .match(/export const sectionThemes = \[([^\]]*)\]/)[1]
    .match(/'([^']+)'/g)
    .map((value) => value.slice(1, -1));
  assert.deepEqual(SECTION_THEMES, declared);
});

test('a run that judged nothing, or nothing of a component, cannot pass', () => {
  const run = (overrides) =>
    coverageProblems({
      checkedByComponent: new Map([
        ['02-molecules/link-grid', 10],
        ['03-organisms/site-header', 0],
      ]),
      components: ['02-molecules/link-grid', '03-organisms/site-header'],
      expectedEmpty: { '03-organisms/site-header': 'nav links only' },
      stale: 0,
      baselineSize: 100,
      complete: true,
      ...overrides,
    });

  assert.deepEqual(run({}), []);

  const nothing = run({ checkedByComponent: new Map() });
  assert.equal(nothing.length, 2);
  assert.match(nothing[0], /No halo link was judged at all/);
  assert.match(nothing[1], /link-grid is in scope, but no halo link/);

  assert.match(
    run({ expectedEmpty: {} }).join('\n'),
    /site-header is in scope, but no halo link in its stories was judged.*NO_HALO_LINKS/,
  );
  assert.match(
    run({
      checkedByComponent: new Map([
        ['02-molecules/link-grid', 10],
        ['03-organisms/site-header', 3],
      ]),
    }).join('\n'),
    /site-header is in NO_HALO_LINKS, but 3 halo link samples .* Remove it/,
  );
});

test('an unfiltered run that leaves too much of the baseline stale fails', () => {
  const run = (stale, complete = true) =>
    coverageProblems({
      checkedByComponent: new Map([['02-molecules/link-grid', 10]]),
      components: ['02-molecules/link-grid'],
      stale,
      baselineSize: 100,
      complete,
    });
  assert.equal(STALE_SHARE_LIMIT, 0.1);
  assert.deepEqual(run(10), []);
  assert.match(
    run(11).join(''),
    /11 of 100 baseline entries \(11%\).*10% limit/,
  );
  // A filtered run cannot tell a fix from a story it left out.
  assert.deepEqual(run(50, false), []);
});

test('a filtered run does not demand halo links from every component it rendered', () => {
  const run = (complete) =>
    coverageProblems({
      checkedByComponent: new Map([
        ['02-molecules/link-grid', 4],
        ['02-molecules/meta', 0],
        ['03-organisms/site-header', 2],
      ]),
      components: [
        '02-molecules/link-grid',
        '02-molecules/meta',
        '03-organisms/site-header',
      ],
      expectedEmpty: { '03-organisms/site-header': 'nav links only' },
      stale: 0,
      baselineSize: 100,
      complete,
    });

  assert.equal(run(true).length, 2);
  assert.deepEqual(run(false), []);
  // Judging nothing at all fails a filtered run too.
  assert.match(
    coverageProblems({
      checkedByComponent: new Map(),
      components: ['02-molecules/meta'],
      stale: 0,
      baselineSize: 100,
      complete: false,
    }).join('\n'),
    /No halo link was judged at all/,
  );
});

/** Computed styles of an absolutely positioned pseudo-element. */
const pseudoStyle = (overrides = {}) => ({
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  width: 'auto',
  height: 'auto',
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  paddingTop: '0px',
  paddingRight: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  borderTopWidth: '0px',
  borderRightWidth: '0px',
  borderBottomWidth: '0px',
  borderLeftWidth: '0px',
  boxSizing: 'content-box',
  ...overrides,
});
const BLOCK = { left: 10, top: 20, width: 200, height: 100 };

test('pseudoElementBox: inset 0 covers the containing block', () => {
  assert.deepEqual(
    pseudoElementBox(
      pseudoStyle({ top: '0px', right: '0px', bottom: '0px', left: '0px' }),
      BLOCK,
    ),
    { left: 10, top: 20, right: 210, bottom: 120 },
  );
});

test('pseudoElementBox: width 100% adds padding and border under content-box only', () => {
  const style = {
    top: '0px',
    left: '0px',
    width: '100%',
    height: '50%',
    paddingLeft: '5%',
    paddingRight: '4px',
    borderLeftWidth: '1px',
  };
  // 200 + 5% of the block width (10) + 4 + 1.
  assert.deepEqual(pseudoElementBox(pseudoStyle(style), BLOCK), {
    left: 10,
    top: 20,
    right: 225,
    bottom: 70,
  });
  assert.deepEqual(
    pseudoElementBox(pseudoStyle({ ...style, boxSizing: 'border-box' }), BLOCK),
    { left: 10, top: 20, right: 210, bottom: 70 },
  );
});

test('pseudoElementBox: an auto inset is solved from the opposite one', () => {
  assert.deepEqual(
    pseudoElementBox(
      pseudoStyle({
        right: '10px',
        bottom: '0',
        width: '50px',
        height: '10%',
        marginRight: '5px',
      }),
      BLOCK,
    ),
    // left = 200 - 10 - 5 - 50; top = 100 - 0 - 10.
    { left: 145, top: 110, right: 195, bottom: 120 },
  );
  // Width and height auto, both insets set: the size fills the gap.
  assert.deepEqual(
    pseudoElementBox(
      pseudoStyle({
        top: '10%',
        bottom: '20px',
        left: '15px',
        right: '25px',
        marginLeft: '5px',
      }),
      BLOCK,
    ),
    { left: 30, top: 30, right: 185, bottom: 100 },
  );
});

test('pseudoElementBox: geometry it cannot resolve is null', () => {
  assert.equal(pseudoElementBox(pseudoStyle({ top: '0px' }), BLOCK), null);
  assert.equal(
    pseudoElementBox(
      pseudoStyle({ top: 'calc(1px + 2%)', left: '0px' }),
      BLOCK,
    ),
    null,
  );
});

test('pseudoElementBox survives being serialized into the page', () => {
  // The check sends its source to the browser, so it must close over
  // nothing from this module.
  // eslint-disable-next-line no-new-func
  const copy = new Function(`return ${pseudoElementBox.toString()};`)();
  const style = pseudoStyle({
    right: '10px',
    bottom: '0',
    width: '50px',
    height: '10%',
  });
  assert.deepEqual(copy(style, BLOCK), pseudoElementBox(style, BLOCK));
});

test('judged samples are summed per component', () => {
  assert.deepEqual(
    componentsChecked(
      new Map([
        ['molecules-callout--a', 2],
        ['molecules-callout-visreg--b', 3],
        ['molecules-meta--c', 1],
      ]),
      (story) => (story.startsWith('molecules-callout') ? 'callout' : 'meta'),
    ),
    new Map([
      ['callout', 5],
      ['meta', 1],
    ]),
  );
});

/**
 * Just enough of an element for the global theme parking: attributes and a
 * parent.
 */
const fakeElement = (attributes = {}, parentElement = null) => {
  const values = new Map(Object.entries(attributes));
  return {
    parentElement,
    values,
    hasAttribute: (name) => values.has(name),
    getAttribute: (name) => values.get(name) ?? null,
    setAttribute: (name, value) => values.set(name, String(value)),
    removeAttribute: (name) => values.delete(name),
  };
};

test('the global theme on every ancestor of the matrix is parked, then restored', () => {
  // <html> has none, <body> has the toolbar's, and a wrapper in between
  // carries one too: all of them would reach the copies.
  const html = fakeElement();
  const body = fakeElement(
    { 'data-global-theme': 'one', 'data-font-pairing': 'yalenew' },
    html,
  );
  const wrapper = fakeElement({ 'data-global-theme': 'five' }, body);

  assert.equal(parkGlobalThemes(wrapper), 2);
  [html, body, wrapper].forEach((element) =>
    assert.equal(element.hasAttribute('data-global-theme'), false),
  );
  // Unrelated attributes are left alone.
  assert.equal(body.getAttribute('data-font-pairing'), 'yalenew');

  assert.equal(restoreGlobalThemes(wrapper), 2);
  assert.deepEqual(Object.fromEntries(body.values), {
    'data-global-theme': 'one',
    'data-font-pairing': 'yalenew',
  });
  assert.deepEqual(Object.fromEntries(wrapper.values), {
    'data-global-theme': 'five',
  });
  assert.equal(html.values.size, 0);
});

test('parking twice keeps the original theme, and a theme set while parked wins', () => {
  const body = fakeElement({ 'data-global-theme': 'one' });
  assert.equal(parkGlobalThemes(body), 1);
  // Nothing left to park: the parked value is not overwritten.
  assert.equal(parkGlobalThemes(body), 0);
  assert.equal(body.getAttribute('data-link-halo-parked-global'), 'one');
  // The check reads every `data-*-theme` on a link's ancestors into its
  // theme combination; the parked value must not be one of them.
  [...body.values.keys()].forEach((name) =>
    assert.doesNotMatch(name, /^data-(.+)-theme$/),
  );

  // The decorator set the toolbar's theme again while it was parked.
  body.setAttribute('data-global-theme', 'three');
  assert.equal(restoreGlobalThemes(body), 1);
  assert.deepEqual(Object.fromEntries(body.values), {
    'data-global-theme': 'three',
  });
  // Restoring with nothing parked is a no-op.
  assert.equal(restoreGlobalThemes(body), 0);
  assert.equal(parkGlobalThemes(null), 0);
});

test('parking survives being serialized into the page', () => {
  // eslint-disable-next-line no-new-func
  const park = new Function(`return ${parkGlobalThemes.toString()};`)();
  // eslint-disable-next-line no-new-func
  const restore = new Function(`return ${restoreGlobalThemes.toString()};`)();
  const body = fakeElement({ 'data-global-theme': 'two' });
  assert.equal(park(body), 1);
  assert.equal(body.hasAttribute('data-global-theme'), false);
  assert.equal(restore(body), 1);
  assert.equal(body.getAttribute('data-global-theme'), 'two');
});
