/**
 * The foreground-purity ratchet (YaleSites-Internal#1632).
 *
 * The companion to `contrast-gate.test.mjs`. The gate can only check colors it
 * can see -- pairings the token structure declares. It is blind to a component
 * that names a palette color directly in a foreground declaration, because that
 * color never enters the pairing registry at all. `.taxonomy-list--tags` is the
 * example the ticket names:
 *
 *   color: var(--color-section-foreground, var(--color-blue-yale));
 *
 * The Sass half of this hazard is already gated. Phase 0's
 * `color-system-defects.test.mjs` has a `themeable colors are not baked in as
 * Sass literals` test that catches `tokens.$color-*` in any color property, and
 * exactly one `tokens.$color-` occurrence survives in the tree -- inside a
 * comment documenting the fix. This file covers the CSS-level twin it cannot
 * see: a raw *palette* custom property read in foreground position.
 *
 * ## Why a ratchet rather than a ban
 *
 * There are 124 of these today. Banning them outright would be unmergeable, and
 * converting them is Phase 2's (#1631) job, component by component. So the
 * committed per-file counts in `foreground-purity-baseline.json` may only ever
 * go down: a file may be cleaned, but no file may gain a new one, and a file
 * not in the baseline may have none at all.
 *
 * Per-file rather than one total, so a regression names the component that
 * caused it instead of a number that went up by one somewhere in 37 files.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BASELINE,
  EXEMPT_PATHS,
  STYLELINT_CONFIG,
  paletteTokenNames,
  scanForegroundPurity,
} from './foreground-purity.mjs';

const findings = scanForegroundPurity();
const { counts } = findings;

test('no file has more raw palette foregrounds than its baseline allows', () => {
  const regressions = Object.entries(counts)
    .filter(([file, count]) => count > (BASELINE[file] ?? 0))
    .map(
      ([file, count]) =>
        `  ${file}: ${count}, baseline allows ${
          BASELINE[file] ?? 0
        }\n${findings.byFile[file]
          .map((hit) => `      line ${hit.line}: ${hit.text}`)
          .join('\n')}`,
    );

  assert.deepEqual(
    regressions,
    [],
    'a foreground declaration reads a raw palette token directly:\n' +
      `${regressions.join('\n')}\n\n` +
      'A palette token (--color-gray-700, --color-blue-yale) is a fixed swatch: ' +
      'it cannot follow the theme, so wherever the theme puts a background it ' +
      'does not expect, the text becomes unreadable and no contrast check can ' +
      'see it coming. Read a semantic token instead -- --color-text, ' +
      '--color-heading, --color-link-base, or the section contract ' +
      '--color-section-foreground. Raising the baseline is not a fix.',
  );
});

test('baseline entries for files that are now clean are retired', () => {
  const stale = Object.keys(BASELINE).filter((file) => !(file in counts));

  assert.deepEqual(
    stale,
    [],
    'these files no longer read a raw palette token in foreground position. ' +
      'Delete them from foreground-purity-baseline.json so the ratchet holds ' +
      'them at zero:\n' +
      `  ${stale.join('\n  ')}`,
  );
});

test('baseline counts are not padded above what is actually there', () => {
  const padded = Object.entries(BASELINE)
    .filter(([file, allowed]) => (counts[file] ?? 0) < allowed)
    .map(
      ([file, allowed]) =>
        `  ${file}: ${counts[file] ?? 0} left, baseline says ${allowed}`,
    );

  assert.deepEqual(
    padded,
    [],
    'the baseline allows more than the file contains, so the difference is ' +
      'free headroom for a regression nobody would notice. Lower these to the ' +
      'real count:\n' +
      `${padded.join('\n')}`,
  );
});

test('a baselined file names a ticket-worthy component, not an exempt path', () => {
  const exempted = Object.keys(BASELINE).filter((file) =>
    EXEMPT_PATHS.some((prefix) => file.startsWith(prefix)),
  );

  assert.deepEqual(
    exempted,
    [],
    'these baseline entries are for paths the scan already exempts, so they ' +
      'suppress nothing:\n' +
      `  ${exempted.join('\n  ')}`,
  );
});

// --- The scan must not go vacuous ----------------------------------------

test('the palette token list is derived and non-empty', () => {
  const names = paletteTokenNames();

  assert.ok(
    names.length > 30,
    `only ${names.length} palette tokens were derived from the token package; ` +
      'the color tree has been restructured and the scan is now nearly blind',
  );
  ['gray-700', 'blue-yale', 'basic-white'].forEach((name) => {
    assert.ok(
      names.includes(name),
      `palette token ${name} stopped being derived`,
    );
  });
});

test('semantic role tokens are not mistaken for palette tokens', () => {
  const names = paletteTokenNames();

  // `--color-text` and `--color-link-base` are the tokens components are being
  // told to use. If the derivation swept them in, the ratchet would be telling
  // people to stop doing the right thing.
  ['text', 'background', 'heading', 'link-base', 'link-hover'].forEach(
    (name) => {
      assert.ok(
        !names.includes(name),
        `${name} is a semantic role, not a palette swatch, and must not be flagged`,
      );
    },
  );
});

test('the scan still finds the case the ticket names', () => {
  const tags = findings.byFile['components/01-atoms/lists/_yds-list.scss'];

  assert.ok(
    tags && tags.some((hit) => hit.text.includes('--color-section-foreground')),
    'the .taxonomy-list--tags fallback -- ' +
      'color: var(--color-section-foreground, var(--color-blue-yale)) -- is the ' +
      'example the ticket cites as invisible to the gate. If the scan stops ' +
      'finding it, the scan is broken, not the file.',
  );
});

test('a semantic foreground declaration is not flagged', () => {
  // Guards the other direction: a scan that flagged everything would also be
  // "not vacuous" while being useless.
  assert.equal(
    scanForegroundPurity({
      sources: [['fake.scss', 'a { color: var(--color-text); }']],
    }).counts['fake.scss'],
    undefined,
  );
});

test('a raw palette foreground is flagged wherever it appears in the value', () => {
  const direct = scanForegroundPurity({
    sources: [['fake.scss', 'a { color: var(--color-gray-700); }']],
  });
  const fallback = scanForegroundPurity({
    sources: [
      ['fake.scss', 'a { color: var(--color-text, var(--color-gray-700)); }'],
    ],
  });
  const customProperty = scanForegroundPurity({
    sources: [['fake.scss', 'a { --color-heading: var(--color-blue-yale); }']],
  });

  assert.equal(direct.counts['fake.scss'], 1);
  assert.equal(fallback.counts['fake.scss'], 1);
  assert.equal(customProperty.counts['fake.scss'], 1);
});

test('a colour literal in a foreground custom property is flagged', () => {
  // The hole stylelint leaves: `color: #fff` is a stylelint error, but the same
  // mistake written as `--color-heading: #fff` is not, because stylelint's
  // property matching does not reach custom-property declarations here.
  const hex = scanForegroundPurity({
    sources: [['fake.scss', 'a { --color-heading: #fff; }']],
  });
  const named = scanForegroundPurity({
    sources: [['fake.scss', 'a { --color-text: white; }']],
  });
  const plainProperty = scanForegroundPurity({
    // Already a stylelint error; counting it here too would double-report.
    sources: [['fake.scss', 'a { color: #fff; }']],
  });

  assert.equal(hex.counts['fake.scss'], 1);
  assert.equal(named.counts['fake.scss'], 1);
  assert.equal(plainProperty.counts['fake.scss'], undefined);
});

test('a `//` inside a URL or a string does not blind the rest of the line', () => {
  // Regression: the comment stripper used to cut at the first `//` on a line,
  // so a violation sharing a line with a URL was silently invisible.
  // `_yds-form.scss` and `_yds-select.scss` both carry
  // `background-image: url("data:image/svg+xml,...http://www.w3.org/2000/svg...")`
  // and both are in the baseline, so this is a real shape, not a hypothetical.
  const cases = [
    [
      'scheme',
      'a { background: url(https://x.test/a.png); color: var(--color-gray-700); }',
    ],
    [
      'protocol-relative',
      'a { background: url(//cdn.test/a.png); color: var(--color-gray-700); }',
    ],
    ['quoted', 'a { content: "//"; color: var(--color-gray-700); }'],
    ['escaped quote', 'a { content: "x\\"//"; color: var(--color-gray-700); }'],
  ];

  cases.forEach(([name, source]) => {
    assert.equal(
      scanForegroundPurity({ sources: [['fake.scss', source]] }).counts[
        'fake.scss'
      ],
      1,
      `a ${name} URL/string swallowed the violation after it`,
    );
  });
});

test('a real line comment is still stripped', () => {
  const cases = [
    'a { color: var(--color-text); } // color: var(--color-gray-700);',
    '//////// color: var(--color-gray-700);',
  ];

  cases.forEach((source) => {
    assert.equal(
      scanForegroundPurity({ sources: [['fake.scss', source]] }).counts[
        'fake.scss'
      ],
      undefined,
      `stopped treating this as a comment: ${source}`,
    );
  });

  // ...and a trailing comment does not hide the real declaration before it.
  assert.equal(
    scanForegroundPurity({
      sources: [['fake.scss', 'a { color: var(--color-gray-700); } // note']],
    }).counts['fake.scss'],
    1,
  );
});

test('a commented-out declaration is not flagged', () => {
  const lineComment = scanForegroundPurity({
    sources: [['fake.scss', '// color: var(--color-gray-700);']],
  });
  const blockComment = scanForegroundPurity({
    sources: [['fake.scss', '/* color: var(--color-gray-700); */']],
  });

  assert.equal(lineComment.counts['fake.scss'], undefined);
  assert.equal(blockComment.counts['fake.scss'], undefined);
});

test('a colour function outside a foreground declaration is not flagged', () => {
  // Regression: the literal alternation is interpolated into a larger pattern,
  // and without a non-capturing group around it the `|` split the WHOLE pattern
  // instead, leaving a branch that matched a bare `rgb(` anywhere in the file.
  // That silently added three phantom hits across the tree.
  assert.deepEqual(
    scanForegroundPurity({
      sources: [
        ['fake.scss', 'a { box-shadow: 0 0 4px rgb(0 0 0 / 20%); }'],
        ['fake2.scss', 'b { background: hsl(0, 0%, 50%); }'],
      ],
    }).counts,
    {},
  );
});

test('the two halves of the rule exempt the same documentation chrome', () => {
  // The stylelint rule and this scan are two halves of one policy. Nothing else
  // would notice if they started exempting different files, so this is the same
  // drift check the repo already applies to SECTION_THEMES vs _yds-layout.scss.
  const globs = STYLELINT_CONFIG.overrides
    .flatMap((override) => override.files)
    .filter(
      (file) => file.includes('_storybook') || file.includes('cl-colors'),
    );

  const expected = STYLELINT_CONFIG.UNTHEMED_DOCUMENTATION_CHROME.map(
    (prefix) => (prefix.endsWith('/') ? `${prefix}**/*.scss` : prefix),
  );

  assert.deepEqual(globs.sort(), expected.sort());
  STYLELINT_CONFIG.UNTHEMED_DOCUMENTATION_CHROME.forEach((prefix) => {
    assert.ok(
      EXEMPT_PATHS.includes(prefix),
      `${prefix} is exempt from the stylelint half but not from this scan`,
    );
  });
});

test('a background declaration is not flagged', () => {
  // Palette tokens are legitimate in background position: a background is the
  // thing a foreground has to contrast with, and the gate checks those pairings
  // where they are declared in tokens.
  assert.equal(
    scanForegroundPurity({
      sources: [
        ['fake.scss', 'a { background-color: var(--color-gray-700); }'],
      ],
    }).counts['fake.scss'],
    undefined,
  );
});
