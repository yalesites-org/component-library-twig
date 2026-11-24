/**
 * Guards the Custom Card image link against becoming a silent tab stop.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/cards/custom-card/custom-card-image-link-focus.test.mjs
 *
 * The image link duplicates the heading link and is hidden from assistive
 * technology with `aria-hidden="true"`. A hidden link that can still take
 * keyboard focus is an empty tab stop for screen reader users and fails axe's
 * aria-hidden-focus rule, so it must also carry `tabindex="-1"`, the same
 * pairing the Reference Card uses. A mouse click on the image still follows
 * the link.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const template = readFileSync(
  path.join(componentDir, 'yds-custom-card.twig'),
  'utf8',
);

/** Every opening `<a ...>` tag, so assertions cannot match a comment. */
const anchorTags = template.match(/<a\b[^>]*>/gs) || [];
const imageLinkTag = anchorTags.find((tag) => tag.includes("'image-link'"));

test('the custom card template still renders an image link', () => {
  assert.ok(
    imageLinkTag,
    'no image-link <a> tag found in yds-custom-card.twig',
  );
});

test('the image link is hidden from assistive technology', () => {
  assert.match(imageLinkTag, /\baria-hidden="true"/);
});

test('the hidden image link is out of the keyboard tab order', () => {
  assert.match(imageLinkTag, /\btabindex="-1"/);
});

test('the image link still points at the card URL for mouse users', () => {
  assert.match(imageLinkTag, /\bhref="\{\{\s*custom_card__url\s*\}\}"/);
});
