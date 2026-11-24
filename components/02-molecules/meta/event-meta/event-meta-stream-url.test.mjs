/**
 * Pins that an event's Stream URL shows whether or not any other detail does.
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/meta/event-meta/event-meta-stream-url.test.mjs
 *
 * The details grid is wrapped in one condition that lists the fields it can
 * show. Stream URL was missing from that list, so an online event with only a
 * meeting link rendered no link at all: it appeared only when a cost, room,
 * audience or similar field happened to open the grid (YaleSites-Internal#2285).
 * Every story fixture fills those fields in, so nothing in Storybook showed it.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import Twig from 'twig';

// bem(), add_attributes() and the namespace map come from the same sources
// Storybook uses, so this test compiles the template the way Storybook does.
import { setupTwig, namespaces } from '../../../_storybook/setup-twig.mjs';

setupTwig(Twig);

// The CTA's getUrlType() reads the page hostname; Node has no document.
// Without it the CTA renders as a <button> with no href.
globalThis.document = { location: { hostname: 'localhost' } };

const template = '@molecules/meta/event-meta/yds-event-meta-localist.twig';

const streamUrl =
  'https://yale.zoom.us/j/91234567890?pwd=AbCdEfGhIjKlMnOpQrStUvWxYz123456';

const date = {
  formatted_start_date: 'Friday, January 15th, 2027',
  formatted_end_date: 'Friday, January 15th, 2027',
  original_start: 1800032400,
  original_end: 1800036000,
  is_past_event: false,
  is_all_day: false,
};

/** The fields an editor fills in for an online event with only a link. */
const onlineEvent = {
  event_title__heading: 'Online Event',
  event_dates: [date],
  event_featured_date: date,
  event_featured_index: 0,
  event_meta__format: 'Online',
  ics_url: '#',
  stream_url: streamUrl,
};

const render = (context) =>
  Twig.twig({
    data: `{% include "${template}" %}`,
    namespaces,
    async: false,
  }).render(context);

/** Every anchor whose href is the stream URL, with its text content. */
const streamLinks = (markup) =>
  [...markup.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
    .filter(([, href]) => href === streamUrl.replace(/&/g, '&amp;'))
    .map(([, , text]) => text.replace(/<[^>]*>/g, '').trim());

test('an online event with only a Stream URL shows the link', () => {
  const links = streamLinks(render(onlineEvent));

  assert.equal(
    links.length,
    1,
    'expected exactly one link to the stream URL when no other detail is set',
  );
});

test('the Stream URL still shows alongside other details', () => {
  const links = streamLinks(
    render({
      ...onlineEvent,
      ticket_cost: 'Free',
      event_audience: [{ name: 'Students' }],
    }),
  );

  assert.equal(links.length, 1);
});

test('the stream link names its action rather than printing the URL', () => {
  const [text] = streamLinks(render(onlineEvent));

  assert.equal(text, 'Join Event Online');
});

test('an event with no details renders no details grid', () => {
  const { stream_url: _omitted, ...noDetails } = onlineEvent;

  assert.doesNotMatch(render(noDetails), /event-meta__details-wrapper/);
});
