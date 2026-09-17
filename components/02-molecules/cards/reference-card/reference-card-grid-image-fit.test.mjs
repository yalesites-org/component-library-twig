/**
 * Pins that a grid card image is held to its card's shape on a real site.
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/cards/reference-card/reference-card-grid-image-fit.test.mjs
 *
 * YaleSites-Internal#1730: a photo carrying EXIF rotation rendered portrait in
 * a 3:2 news card and pushed the card to nearly twice the height of its
 * neighbours. The defect was not a missing rule -- the constraint existed, but
 * only under `.sb-show-main`, the class Storybook puts on its preview body, in
 * `01-atoms/images/image/cl-image.scss`. That file is not part of the shipped
 * stylesheet, so Storybook rendered correctly and every live site had no
 * constraint whatsoever.
 *
 * So this compiles `components/style.scss` -- the real entry point atomic
 * loads -- rather than the card partial. Compiling the partial would prove the
 * rule was written, which was never in doubt; only the bundle proves it ships.
 * Both directions matter, and both are asserted below: the constraint reaches
 * the bundle, and it is not Storybook-scoped once it gets there.
 *
 * Deliberately says nothing about *how* the image is constrained. The first
 * attempt at this fix asserted `min-height`, `height: 100%` on each wrapper and
 * `object-fit` separately, which pinned one particular implementation and would
 * have failed on a better one that fixed the bug just as well.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parse } from 'postcss';
import * as sass from 'sass';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..',
);

const { css } = sass.compile(path.join(repoRoot, 'components/style.scss'), {
  loadPaths: [repoRoot, path.join(repoRoot, 'node_modules')],
  // Webpack resolves the `~` package prefix the token imports use; plain Sass
  // needs to be told where it points.
  importers: [
    {
      findFileUrl(url) {
        return url.startsWith('~')
          ? pathToFileURL(path.join(repoRoot, 'node_modules', url.slice(1)))
          : null;
      },
    },
  ],
  quietDeps: true,
  logger: sass.Logger.silent,
});

/**
 * Selectors in the shipped bundle that give a grid card image an `object-fit`.
 *
 * Matched unquoted: Sass drops the quotes the source writes, so looking for
 * `[data-collection-type='grid']` here silently matches nothing.
 */
const constraining = [];

parse(css).walkDecls('object-fit', (declaration) => {
  declaration.parent.selectors?.forEach((raw) => {
    const selector = raw.replace(/\s+/g, ' ').trim();

    if (
      selector.includes('[data-collection-type=grid]') &&
      selector.includes('reference-card__image')
    ) {
      constraining.push(selector);
    }
  });
});

test('the shipped stylesheet constrains grid card images', () => {
  assert.ok(
    constraining.length > 0,
    'components/style.scss contains no object-fit for a grid ' +
      '.reference-card__image -- an image whose shape is unexpected will set ' +
      'the card height instead of being cropped to the card',
  );
});

test('the constraint is not scoped to Storybook', () => {
  // The whole defect: a rule that only ever matched inside Storybook's preview
  // body. If every constraining selector needed `.sb-show-main` again, live
  // sites would be unconstrained while Storybook still looked correct.
  const shipped = constraining.filter(
    (selector) => !selector.includes('sb-show-main'),
  );

  assert.ok(
    shipped.length > 0,
    `every grid card image rule is Storybook-scoped: ${constraining.join(
      ', ',
    )}`,
  );
});
