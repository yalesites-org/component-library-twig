/**
 * Pins the `data-card-size` contract on the card collection (#1648).
 *
 * Run with the Node test runner:
 *   node --test components/03-organisms/card-collection/card-collection-card-size.test.mjs
 *
 * The card-size dial is authored in Drupal (`ys_views_basic`, the "Card size"
 * select) and consumed entirely in SCSS, through the
 * `[data-collection-type='grid'][data-card-size='small']` selector. Nothing
 * between the two fails loudly: the prop name is a string in one repo's Twig
 * (`views-basic-rows.html.twig`, which sets `card_collection__card_size`) and a
 * string in this repo's Twig, so renaming one side and not the other renders a
 * perfectly valid page that silently ignores the author's choice. These tests
 * pin the attribute and its default so that drift fails here instead.
 *
 * Rendered via `{% embed %}`, because that is the only path Drupal uses -- see
 * the trap documented at length in card-collection-empty-wrapper.test.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../.storybook/setupTwig');

setupTwig(Twig);

const TEMPLATE = '@organisms/card-collection/yds-card-collection.twig';

/**
 * Renders the card collection the way the Drupal listing template does.
 *
 * @param {object} props - Props to pass through the embed's `with`.
 *
 * @returns {string} the rendered markup.
 */
const renderCollection = (props = {}) => {
  const withClause = JSON.stringify(props).replace(/"([^"]+)":/g, '$1:');
  return Twig.twig({
    data:
      `{% embed "${TEMPLATE}" with ${withClause} %}` +
      '{% block card_collection__cards %}<li class="probe">a card</li>{% endblock %}' +
      '{% endembed %}',
    namespaces,
    async: false,
  }).render({});
};

test('the authored card size reaches the attribute the SCSS selects on', () => {
  const out = renderCollection({ card_collection__card_size: 'small' });
  assert.match(out, /data-card-size="small"/);
});

test('a collection with no card size falls back to large', () => {
  // Large is the grid every card collection rendered before the dial existed,
  // so an unset value has to be indistinguishable from the old markup.
  assert.match(renderCollection(), /data-card-size="large"/);
});

test('the card size is emitted alongside the collection type it depends on', () => {
  // The SCSS rule is `[data-collection-type='grid'][data-card-size='small']`,
  // so the size alone does nothing -- both attributes have to land on the same
  // element for the narrower grid bands to apply at all.
  const out = renderCollection({
    card_collection__type: 'grid',
    card_collection__card_size: 'small',
  });
  assert.match(
    out,
    /<div[^>]*data-collection-type="grid"[^>]*data-card-size="small"/,
  );
});

test('card size does not disturb the featured attribute', () => {
  // data-collection-featured is a different concept (the per-card image/text
  // ratio) that is hardcoded to 'true' for every Drupal listing. The size dial
  // deliberately does not reuse it, so it must still default independently.
  const out = renderCollection({ card_collection__card_size: 'small' });
  assert.match(out, /data-collection-featured="true"/);
});

test('the superseded cards-per-row prop no longer emits an attribute', () => {
  // Guards against a half-finished rename leaving both spellings in the tree.
  const out = renderCollection({ card_collection__cards_per_row: '4' });
  assert.doesNotMatch(out, /data-cards-per-row/);
  assert.match(out, /data-card-size="large"/);
});

// ---------------------------------------------------------------------------
// The container-query bands, pinned against the measured region widths.
//
// The three thresholds in _grid-mixins.scss were not derived -- they were set
// from region widths MEASURED in a browser, because the flex bases overflow
// their row and shrink (see the comment on $container-grid-small-two-up). That
// makes them the kind of value that silently stops describing reality: change a
// layout's flex basis or a divider's width and the grid still renders, it just
// picks a different number of columns in one region than the author intended.
//
// These tests read the thresholds out of the SCSS rather than restating them,
// so the assertions are about the *relationship* between a region's width and
// its intended column count. Moving a band therefore fails here, and moving a
// region across a band fails here too, instead of surfacing as "why does the
// sidebar show two cards now".
//
// Widths are the measured ones from _grid-mixins.scss, in rem, per divider
// state. Keep the two in sync: if the measurements are ever retaken, they are
// retaken in both places.
// ---------------------------------------------------------------------------

const GRID_MIXINS = new URL('../_grid-mixins.scss', import.meta.url);

/**
 * Reads a `$name: <n>rem;` threshold out of _grid-mixins.scss.
 *
 * Parsed rather than hardcoded so a band change fails these tests instead of
 * quietly invalidating them.
 *
 * @param {string} source - The stylesheet source.
 * @param {string} name - The Sass variable name, without the leading `$`.
 *
 * @returns {number} the threshold in rem.
 */
const readBand = (source, name) => {
  const match = source.match(new RegExp(`\\$${name}:\\s*([\\d.]+)rem`));
  assert.ok(match, `expected $${name} to be declared in _grid-mixins.scss`);
  return Number(match[1]);
};

const scss = readFileSync(GRID_MIXINS, 'utf8');
const BANDS = {
  largeTwoUp: readBand(scss, 'container-grid-two-up'),
  largeThreeUp: readBand(scss, 'container-grid-widest'),
  smallTwoUp: readBand(scss, 'container-grid-small-two-up'),
};

// Measured rendered widths, in rem, as recorded in _grid-mixins.scss.
const REGIONS = {
  'fifty-fifty': { noDivider: 41, withDivider: 39.94 },
  'seventy-thirty primary': { noDivider: 56, withDivider: 56 },
  'thirty-thirty-thirty': { noDivider: 26.67, withDivider: 25.26 },
  'seventy-thirty secondary': { noDivider: 26, withDivider: 23.89 },
};

/**
 * The number of columns a region of the given width renders at.
 *
 * Mirrors the container queries in _grid-mixins.scss: large cards step up at
 * $container-grid-two-up and again at $container-grid-widest; small cards get
 * one extra, narrower band at $container-grid-small-two-up before joining the
 * large ladder.
 *
 * @param {number} width - Region inline size, in rem.
 * @param {'large'|'small'} size - The authored card size.
 *
 * @returns {number} the column count.
 */
const columnsAt = (width, size) => {
  if (width >= BANDS.largeThreeUp) {
    return 3;
  }
  if (width >= BANDS.largeTwoUp) {
    return 2;
  }
  if (size === 'small' && width >= BANDS.smallTwoUp) {
    return 2;
  }
  return 1;
};

test('the bands are declared in the order the container queries assume', () => {
  // The ladder only makes sense strictly ascending: the small band has to sit
  // below the large two-up band (otherwise it is unreachable), and two-up below
  // three-up.
  assert.ok(
    BANDS.smallTwoUp < BANDS.largeTwoUp,
    `small two-up (${BANDS.smallTwoUp}rem) must be narrower than large two-up (${BANDS.largeTwoUp}rem), or the extra band never applies`,
  );
  assert.ok(
    BANDS.largeTwoUp < BANDS.largeThreeUp,
    `large two-up (${BANDS.largeTwoUp}rem) must be narrower than widest (${BANDS.largeThreeUp}rem)`,
  );
});

test('a thirds column fits two small cards in BOTH divider states', () => {
  // This is the region the extra band was added for, and the reason the
  // threshold is 25rem rather than 26rem: 25 sits below both measured
  // thirty-thirty-thirty widths, so showing dividers must not cost the column
  // its second card.
  const thirds = REGIONS['thirty-thirty-thirty'];
  assert.equal(columnsAt(thirds.noDivider, 'small'), 2);
  assert.equal(columnsAt(thirds.withDivider, 'small'), 2);
  // ...while large cards stay one-up there, which is the whole point of the dial.
  assert.equal(columnsAt(thirds.noDivider, 'large'), 1);
  assert.equal(columnsAt(thirds.withDivider, 'large'), 1);
});

test('the documented sidebar overlap is still exactly what the comment claims', () => {
  // _grid-mixins.scss records that the two narrow regions OVERLAP: with
  // dividers on, a thirds column (25.26rem) is narrower than a seventy-thirty
  // sidebar (26rem), so no single threshold can mean "two up in thirds, one up
  // in the sidebar". The accepted consequence is that a divider-less sidebar
  // also takes two small cards. That trade-off is deliberate, so pin it --
  // if a future change makes it untrue, the comment needs rewriting too.
  const sidebar = REGIONS['seventy-thirty secondary'];
  const thirds = REGIONS['thirty-thirty-thirty'];

  assert.ok(
    thirds.withDivider < sidebar.noDivider,
    'the overlap the comment describes no longer holds; re-read that comment before changing a band',
  );
  assert.equal(columnsAt(sidebar.noDivider, 'small'), 2);
  assert.equal(columnsAt(sidebar.withDivider, 'small'), 1);
});

test('every measured region lands in its intended band', () => {
  // Table-driven so a band change reports which region moved, not just that
  // something did. Expectations are the intended design, not a snapshot of
  // current behaviour -- they were written from the reasoning in
  // _grid-mixins.scss, so a mismatch means the code and that comment disagree.
  const expected = {
    'fifty-fifty': { large: 2, small: 2 },
    'seventy-thirty primary': { large: 2, small: 2 },
    'thirty-thirty-thirty': { large: 1, small: 2 },
    'seventy-thirty secondary': { large: 1, small: 2 },
  };

  const SIZES = ['large', 'small'];

  Object.entries(REGIONS).forEach(([region, widths]) => {
    SIZES.forEach((size) => {
      assert.equal(
        columnsAt(widths.noDivider, size),
        expected[region][size],
        `${region} (no divider, ${widths.noDivider}rem) at card size ${size}`,
      );
    });
  });

  // With dividers on, only the sidebar's small-card count is expected to drop
  // -- that is the overlap pinned above.
  assert.equal(
    columnsAt(REGIONS['seventy-thirty secondary'].withDivider, 'small'),
    1,
  );
  ['fifty-fifty', 'seventy-thirty primary', 'thirty-thirty-thirty'].forEach(
    (region) => {
      SIZES.forEach((size) => {
        assert.equal(
          columnsAt(REGIONS[region].withDivider, size),
          expected[region][size],
          `${region} (with divider, ${REGIONS[region].withDivider}rem) at card size ${size}`,
        );
      });
    },
  );
});

test('the small band stays under the narrowest thirds column, by however little', () => {
  // The tightest constraint in the whole ladder, and the one the band was
  // chosen for: $container-grid-small-two-up must stay at or below the
  // NARROWEST measured thirty-thirty-thirty width, or thirds loses its second
  // small card in the with-divider state.
  //
  // The margin is deliberately thin -- 25rem against a measured 25.26rem, so
  // 0.26rem. That is not sloppiness: _grid-mixins.scss explains that raising
  // the band above 26rem to fix the sidebar overlap would cost thirds its
  // second column, and thirds is the region this band exists for. So the
  // needle is threaded on purpose, and this test guards the thread rather than
  // demanding clearance that the design cannot give.
  //
  // If this fails, do not just nudge the band -- re-read the reasoning in
  // _grid-mixins.scss, because both regions are in tension and moving the band
  // trades one for the other.
  const narrowestThirds = Math.min(
    ...Object.values(REGIONS['thirty-thirty-thirty']),
  );

  assert.ok(
    BANDS.smallTwoUp <= narrowestThirds,
    `small two-up band (${BANDS.smallTwoUp}rem) must stay at or below the narrowest thirds column (${narrowestThirds}rem) or thirds drops to one small card when dividers are on`,
  );

  // Record the margin so an erosion is visible in the failure message next
  // time, rather than someone rediscovering how tight it always was.
  const margin = narrowestThirds - BANDS.smallTwoUp;
  assert.ok(
    margin < 1,
    `the margin is now ${margin.toFixed(
      2,
    )}rem; it has historically been ~0.26rem, so a jump this large means the measurements were retaken -- update the REGIONS table and this expectation together`,
  );
});

// ---------------------------------------------------------------------------
// The viewport floor under the container bands.
//
// Column count comes from the container; the card's own internal layout comes
// from the viewport. Those two only coexist while they cannot disagree, and
// they disagreed below $break-m: a phone-width full-width region is ~44rem,
// inside the 34-70rem band, so the grid handed back two or three columns while
// _yds-reference-card.scss still flipped every card in them to its horizontal
// image-beside-text layout (that rule runs from $break-s to
// $break-card-collection-max). The result was narrow columns of horizontal
// cards. (#1648 QA)
//
// The fix confines the container bands to $break-m and up, where the card has
// no horizontal rule left. These tests pin that separation, because nothing
// else can: Storybook renders a canvas container narrower than the viewport,
// so it puts the container under 34rem exactly when the viewport is in the
// s-to-m band and the conflict never appears there.
// ---------------------------------------------------------------------------

const REFERENCE_CARD_SCSS = readFileSync(
  new URL(
    '../../02-molecules/cards/reference-card/_yds-reference-card.scss',
    import.meta.url,
  ),
  'utf8',
);

/**
 * Returns the body of the brace-delimited block that follows `needle`.
 *
 * @param {string} source - The stylesheet source.
 * @param {string} needle - Text immediately preceding the block's `{`.
 *
 * @returns {string} the block body, braces excluded.
 */
const blockAfter = (source, needle) => {
  const start = source.indexOf(needle);
  assert.ok(start !== -1, `expected to find "${needle}"`);
  const open = source.indexOf('{', start);
  assert.ok(open !== -1, `expected a block after "${needle}"`);

  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '{') {
      depth += 1;
    } else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(open + 1, i);
      }
    }
  }
  throw new Error(`unbalanced braces after "${needle}"`);
};

test('the container bands are gated on the viewport, not just the container', () => {
  // The gate itself. Keyed to $break-m because that is where the card stops
  // having a horizontal layout, not because 768px is a round number.
  const gate = blockAfter(scss, '@mixin single-column-below-break-m');
  assert.match(gate, /@media \(min-width: tokens\.\$break-m\)/);
});

test('no card-grid container band escapes the viewport gate', () => {
  // Counted rather than eyeballed: an added band that forgets the wrapper is
  // exactly how this regression comes back, and it would render fine on a
  // desktop and in Storybook.
  ['container-grid(', 'container-grid-small'].forEach((name) => {
    const body = blockAfter(scss, `@mixin ${name}`);
    const gated = blockAfter(body, '@include single-column-below-break-m');

    const count = (text) =>
      (text.match(/@container \(min-width:/g) || []).length;

    assert.ok(count(gated) > 0, `${name} declares no bands inside the gate`);
    assert.equal(
      count(body),
      count(gated),
      `${name} has a @container band outside @include single-column-below-break-m; below $break-m it would give multiple columns of horizontal cards`,
    );
  });
});

test('the grid is single-column across the whole band where cards go horizontal', () => {
  // The invariant the gate exists to hold, stated as a relationship between
  // the two files rather than as two constants that happen to line up today.
  // If either side moves, this is what should fail.
  const horizontalRuleMax = REFERENCE_CARD_SCSS.match(
    /\$break-card-collection-max:\s*tokens\.\$break-m\s*-\s*([\d.]+)/,
  );
  assert.ok(
    horizontalRuleMax,
    'expected $break-card-collection-max to still be derived from $break-m',
  );
  assert.ok(
    Number(horizontalRuleMax[1]) > 0,
    'the card horizontal layout must stop strictly below $break-m, which is where the container bands start',
  );

  // And that the bound is still spent on a real horizontal-layout rule, rather
  // than left declared with nothing reading it. Matched on the media query
  // alone, not on the selector block around it, so reformatting the selectors
  // does not fail a test about breakpoints.
  assert.match(
    REFERENCE_CARD_SCSS,
    /@media \(min-width: tokens\.\$break-s\) and \(max-width: \$break-card-collection-max\)/,
    'the horizontal card rule moved; re-check it against the container bands in _grid-mixins.scss',
  );
});
