/**
 * Pins the reference card's `tel:` link across BOTH Twig engines (#1648).
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/cards/reference-card/reference-card-phone-link.test.mjs
 *
 * Phone is a free-text profile field, so the card only links a value that is
 * actually dial-able and renders anything else as plain text. That decision
 * lives in a single `matches` regex in the template, and a regex written as a
 * Twig string literal is the one place where Twig.js and Twig/PHP can be handed
 * *different patterns from identical source bytes*:
 *
 * - Twig/PHP runs single-quoted strings through `stripcslashes()`, so `\\`
 *   collapses to `\`.
 * - Twig.js 1.17.1 does not unescape `\\` in single-quoted strings at all, so
 *   the literal backslash survives into the pattern.
 *
 * `'/^\\+?[0-9]{5,}$/'` therefore linked in Drupal and never linked in
 * Storybook, and the naive one-backslash repair inverts the failure --
 * `stripcslashes()` drops an unrecognised escape, leaving `/^+?[0-9]{5,}$/`,
 * which Twig/PHP rejects outright as a SyntaxError. The pattern is written as a
 * character class (`[+]`) precisely so it contains no backslash for either
 * lexer to disagree about.
 *
 * These tests run the Storybook engine, which is the half that was silently
 * wrong -- so a future edit back to any backslash form fails here instead of
 * shipping a component that documents one behaviour and demonstrates another.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../../.storybook/setupTwig');

setupTwig(Twig);

const TEMPLATE = '@molecules/cards/reference-card/yds-reference-card.twig';

// Compiled once; the phone under test arrives as render context rather than
// being spliced into the template source, so each case is a render, not a
// recompile.
const card = Twig.twig({
  data:
    `{% include "${TEMPLATE}" with {` +
    "reference_card__heading: 'Ada Lovelace'," +
    'reference_card__phone: phone,' +
    'show_phone: true' +
    '} %}',
  namespaces,
  async: false,
});

/**
 * Renders the reference card with the phone pass-through turned on.
 *
 * @param {string} phone - The free-text phone value, as authored.
 *
 * @returns {string} the rendered markup.
 */
const renderPhone = (phone) => card.render({ phone });

// Dial-able values, one per distinct shape: bare digits, a leading `+`, the
// separator form the Storybook story itself uses, and `+` combined with
// separators. Each is paired with its EXACT expected href rather than a
// pattern, because a pattern here would only restate the template's own regex
// -- it would still pass if the `replace` filter above it stopped stripping a
// separator it currently strips, or normalised the digits into some other
// 5-or-more-digit string.
const DIALABLE = [
  ['2035550100', 'tel:2035550100'],
  ['+12035550100', 'tel:+12035550100'],
  ['203-555-0100', 'tel:2035550100'],
  ['+1 203 555 0100', 'tel:+12035550100'],
];

DIALABLE.forEach(([phone, expectedHref]) => {
  test(`a dial-able phone becomes a tel: link in Storybook: ${phone}`, () => {
    const out = renderPhone(phone);
    assert.ok(
      out.includes(`href="${expectedHref}"`),
      `expected href="${expectedHref}" in the rendered card`,
    );
  });
});

// The authored string, separators and all, is what the reader sees -- only the
// href is normalised. Checked with the href attributes stripped out first,
// because for a bare-digit value the authored string also appears inside the
// href, so a plain `includes` would pass even with no link text at all.
DIALABLE.forEach(([phone]) => {
  test(`the link text stays as authored: ${phone}`, () => {
    const withoutHrefs = renderPhone(phone).replace(/href="[^"]*"/g, '');
    assert.ok(
      withoutHrefs.includes(phone),
      `expected "${phone}" to render as the link's visible text`,
    );
  });
});

// The reason the regex exists at all: a tel: link nobody can call is worse
// than plain text.
const NOT_DIALABLE = ['1234', 'Main office', '203-555-0100 ext. 12'];

NOT_DIALABLE.forEach((phone) => {
  test(`a non-dial-able phone stays plain text: ${phone}`, () => {
    const out = renderPhone(phone);
    assert.doesNotMatch(out, /href="tel:/);
    assert.ok(
      out.includes(phone),
      `expected the authored value "${phone}" to still render as text`,
    );
  });
});

test('the phone regex contains no backslash for the two lexers to disagree on', () => {
  // The guard the docblock above is about. Asserted against the template
  // source rather than the render, because the whole failure mode is that the
  // render looks plausible in one engine while being wrong in the other.
  const source = readFileSync(
    new URL('./yds-reference-card.twig', import.meta.url),
    'utf8',
  );
  const matchesLine = source
    .split('\n')
    .find((line) => line.includes('matches') && line.includes('[0-9]{5,}'));

  assert.ok(matchesLine, 'expected to find the phone `matches` test');
  assert.doesNotMatch(
    matchesLine,
    /\\/,
    'the phone pattern must stay backslash-free: Twig/PHP unescapes `\\\\` and Twig.js does not, ' +
      'so any backslash form is wrong in one of the two engines',
  );
});
