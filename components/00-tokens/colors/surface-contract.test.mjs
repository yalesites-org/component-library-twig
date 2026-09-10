/**
 * The surface-contract guardrail (YaleSites-Internal#1631, Phase 2).
 *
 * `surface-contract.mjs` holds the reasoning and the detection; this file turns
 * it into a build failure. The invariant it defends, in one line:
 *
 *   If a component paints a background, it must publish the contract.
 *
 * Without it, Phase 2 converts a component and nothing stops the next one from
 * arriving unconverted -- and an unconverted painting surface is not a cosmetic
 * gap, it is the original bug, reintroduced. The AC asks for this to land *with*
 * the conversion rather than after it, for exactly that reason.
 *
 * The tests below come in two halves, the same split the other gates in this
 * directory use. The first half asserts against the real stylesheets, so it can
 * only prove the invariant holds today. The second half runs the classifier on
 * synthetic input, so the gate is also known to go red -- a gate nobody has
 * seen fail is a gate nobody knows works.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PENDING,
  paintsThemedBackground,
  publishesContract,
  stripComments,
  surveySurfaces,
  themedProperties,
  unpublishedPaintingScopes,
} from './surface-contract.mjs';

// --- Against the real stylesheets ----------------------------------------

test('no component paints a themed background without publishing the contract', () => {
  const { newLeaks } = surveySurfaces();

  assert.deepEqual(
    newLeaks,
    [],
    'these stylesheets paint a background at a themed scope but never declare ' +
      '--color-section-background / --color-section-foreground, so everything ' +
      "inside them reads the ENCLOSING surface's foreground against the " +
      'background they just painted. Publish the contract next to the paint -- ' +
      'components/02-molecules/callout/_yds-callout.scss is the reference ' +
      'implementation. Adding the file to surface-contract-baseline.json is ' +
      `not a fix.\n${newLeaks.join('\n')}`,
  );
});

test('a converted surface is removed from the pending list rather than left in it', () => {
  const { fixedPending } = surveySurfaces();

  assert.deepEqual(
    fixedPending,
    [],
    'these stylesheets now publish the contract but are still listed in ' +
      'surface-contract-baseline.json. Delete their entries, or the guardrail ' +
      `silently stops enforcing a surface that is already fixed.\n${fixedPending.join(
        '\n',
      )}`,
  );
});

test('a pending entry that no longer paints a themed background is stale', () => {
  const { stalePending } = surveySurfaces();

  assert.deepEqual(
    stalePending,
    [],
    'these paths are listed in surface-contract-baseline.json but no longer ' +
      'paint a themed background -- either the file moved or the paint went ' +
      'away. A stale entry suppresses nothing while looking like it suppresses ' +
      `something.\n${stalePending.join('\n')}`,
  );
});

test('every pending entry states a reason and the ticket that owns it', () => {
  // Held to the same standard as `contrast-gate.test.mjs:84-96`, deliberately:
  // a pending entry without a real reason and a real ticket is
  // indistinguishable from an opt-out, and two baselines in one directory
  // enforcing different standards for the same thing is how one of them ends
  // up meaning nothing.
  Object.entries(PENDING).forEach(([path, entry]) => {
    assert.ok(
      entry.reason && entry.reason.length > 20,
      `pending entry ${path} needs a reason explaining why it is not converted yet`,
    );
    assert.match(
      entry.ticket,
      /^yalesites-org\/[\w-]+#\d+$/,
      `pending entry ${path} needs a fully-qualified owning ticket, so the ` +
        'burn-down is traceable to work someone is actually doing',
    );
  });
});

test('the burn-down is actually burning down', () => {
  const { converted } = surveySurfaces();

  // Not a vanity metric: if this ever reads 0 the detector has stopped
  // recognising the reference implementation, and every other assertion in
  // this file would pass vacuously.
  assert.ok(
    converted.length > 0,
    'no stylesheet was detected as publishing the contract, which almost ' +
      'certainly means the detector is broken rather than that the library ' +
      'regressed -- _yds-callout.scss has published it since #1628.',
  );
});

// --- The classifier itself, on synthetic input ---------------------------

test('a background painted inside a dial block counts, whatever the value', () => {
  // A flat grey painted at a themed scope leaks worse than a slot colour: it
  // does not move with the theme at all. This is the meta chip shape (#1662).
  const source = `
    .thing {
      &[data-component-theme='one'] {
        background-color: var(--color-gray-100);
      }
    }
  `;

  assert.equal(paintsThemedBackground(source), true);
});

test('a private variable named in the dial and painted at the root counts', () => {
  const source = `
    .thing {
      --color-thing-fallback: var(--color-gray-100);

      @each $theme, $value in $themes {
        &[data-component-theme='#{$theme}'] {
          --color-thing-background: var(--component-themes-#{$theme}-background);
        }
      }

      background-color: var(--color-thing-background);
    }
  `;

  assert.equal(paintsThemedBackground(source), true);

  // Only declarations INSIDE the dial block are collected -- a root-level one
  // is not part of the block dial and must not make the file look themed.
  const themed = themedProperties(source);
  assert.equal(themed.has('--color-thing-background'), true);
  assert.equal(themed.has('--color-thing-fallback'), false);
});

test('a background that sets no colour is not painting a surface', () => {
  const source = `
    .thing {
      &[data-component-theme='one'] {
        background-color: transparent;
      }
    }
  `;

  assert.equal(paintsThemedBackground(source), false);
});

test('a component with no themed scope at all is out of scope', () => {
  const source = `
    .thing {
      background-color: var(--color-gray-100);
    }
  `;

  assert.equal(paintsThemedBackground(source), false);
});

test('publishing needs both halves of the contract, not just a foreground', () => {
  // text-with-image and content-spotlight-portrait each declared only
  // `--color-section-foreground` before #1631. A foreground with no matching
  // background is half a contract: a descendant reading
  // `var(--color-section-background)` still resolves to the section's.
  const foregroundOnly = `--color-section-foreground: var(--color-text);`;
  const both = `
    --color-section-background: var(--color-background);
    --color-section-foreground: var(--color-text);
  `;

  assert.equal(publishesContract(foregroundOnly), false);
  assert.equal(publishesContract(both), true);
});

test('prose describing the contract is not mistaken for declaring it', () => {
  // _yds-layout.scss explains the whole contract in ~90 lines of comment, and
  // several components quote the property names in theirs.
  const source = `
    // Sets --color-section-background: var(--color-thing) for its descendants.
    /* --color-section-foreground: var(--color-text); */
    .thing {
      &[data-component-theme='one'] {
        background-color: var(--color-gray-100);
      }
    }
  `;

  assert.equal(publishesContract(stripComments(source)), false);
});

test('a painting block is caught even when another block in the file publishes', () => {
  // The file-level check alone says "this file publishes" and moves on. But
  // theme six is not a `component-themes` key, so every converted component
  // needs a SECOND, hand-written publish for it -- and forgetting that one is
  // the most likely way to get this wrong. Verified against the real tree:
  // deleting only the theme-six publish from
  // `_yds-facts-and-figures-group.scss` turns the gate red.
  const source = `
    .thing {
      &[data-component-theme='one'] {
        background-color: var(--color-thing-background);

        @include tokens.publish-surface(
          var(--color-thing-background),
          var(--color-text)
        );
      }

      &[data-component-theme='six'] {
        background-color: var(--color-thing-background);
      }
    }
  `;

  assert.equal(publishesContract(source), true, 'the file does publish');
  assert.equal(
    unpublishedPaintingScopes(source).length,
    1,
    'but one themed block paints without publishing inside itself',
  );
  assert.deepEqual(
    surveySurfaces([['components/thing.scss', source]]).newLeaks,
    ['components/thing.scss'],
  );
});
