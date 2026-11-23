/**
 * Pins that every Event card story and example passes an explicit, fixed date.
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/cards/reference-card/event-card-fixed-date.test.mjs
 *
 * Without `reference_card__date` the date atom falls back to "today", so visual
 * regression flags a diff every day even though nothing changed.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (rel) => readFileSync(new URL(rel, import.meta.url), 'utf8');

test('visreg Event card story passes a fixed date', () => {
  const src = read('../cards.visreg.stories.js');
  const block = src.split("card_collection__source_type: 'event'")[1];
  assert.ok(block, 'event card block not found');
  assert.match(block.split('})}')[0], /reference_card__date:/);
});

test('Event card story passes a fixed date', () => {
  const src = read('./reference-card.stories.js');
  const block = src.split("card_collection__source_type: 'event'")[1];
  assert.ok(block, 'event card block not found');
  assert.match(block.split('})}')[0], /reference_card__date:/);
});

test('every event collection page example passes a fixed date', () => {
  const src = read(
    '../../../05-page-examples/events/_event-collection--example.twig',
  );
  const includes = src.split("card_collection__source_type: 'event',").slice(1);
  assert.equal(includes.length, 3);
  includes.forEach((chunk) => {
    assert.match(
      chunk.split('}')[0],
      /reference_card__date: '\d{4}-\d{2}-\d{2}/,
    );
  });
});
