/**
 * Guards the Location block of the Localist event meta when the Place is
 * missing parts of its address or its coordinates.
 *
 * Drupal always sends `place` with the term's name, so `place` is never empty
 * once an event has a Place. The template used to print the city/state line
 * and the map on that alone, so a Place with only a name showed a lone comma
 * under its name and a "Show Map" control opening an iframe pointed at
 * `q=,`, a map with no location in it.
 *
 * The map is drawn from latitude and longitude, not from the street address,
 * so it renders only when the Place has both.
 *
 * Renders the real template through the same Twig.js setup Storybook uses.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/meta/event-meta/event-meta-place-address.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { JSDOM } from 'jsdom';
import Twig from 'twig';
import { setupTwig, namespaces } from '../../../_storybook/setup-twig.mjs';

// The CTAs' getUrlType() reads the page hostname; Node has no document.
globalThis.document = { location: { hostname: 'localhost' } };
setupTwig(Twig);

const componentDir = path.dirname(fileURLToPath(import.meta.url));

const template = Twig.twig({
  path: path.join(componentDir, 'yds-event-meta-localist.twig'),
  namespaces,
  async: false,
  rethrow: true,
});

const fullPlace = {
  name: 'Example Hall',
  address: '1120 East Fort Avenue',
  city: 'Baltimore',
  state: 'MD',
  postal_code: '21230',
  latitude: '39.2704',
  longitude: '-76.6122',
};

/** Renders the event meta with the given place and returns its document. */
const renderWithPlace = (place) =>
  new JSDOM(
    template.render({
      event_title__heading: 'Sample Event',
      event_dates: [],
      place,
    }),
  ).window.document;

/** The Location text with whitespace collapsed, line breaks shown as " | ". */
const locationText = (document) => {
  const location = document.querySelector('.event-meta__location');
  assert.ok(location, 'no .event-meta__location rendered');
  location.querySelectorAll('br').forEach((br) => br.replaceWith(' | '));
  return location.textContent.replace(/\s+/g, ' ').trim();
};

test('a Place with only a name shows the name and no stray comma', () => {
  const document = renderWithPlace({ name: 'Example Hall' });

  assert.equal(locationText(document), 'Example Hall');
});

test('a Place with only a name renders no map, toggle or empty iframe', () => {
  const document = renderWithPlace({ name: 'Example Hall' });

  assert.equal(document.querySelector('.event-meta__event-show-map'), null);
  assert.equal(document.querySelector('.event-meta__cta--show-map'), null);
  assert.equal(document.querySelector('iframe'), null);
});

test('a Place with a full address and coordinates renders as before', () => {
  const document = renderWithPlace(fullPlace);

  assert.equal(
    locationText(document),
    'Example Hall | 1120 East Fort Avenue Baltimore, MD 21230',
  );
  assert.ok(document.querySelector('.event-meta__cta--show-map'));
  assert.equal(
    document.querySelector('.event-meta__map iframe').getAttribute('src'),
    'https://maps.google.com/maps?q=39.2704,-76.6122&z=15&output=embed',
  );
  assert.equal(
    document
      .querySelector('.event-meta__cta--directions-link')
      .getAttribute('href'),
    'https://www.google.com/maps/dir/Current+Location/39.2704,-76.6122',
  );
});

test('a Place with an address but no coordinates shows the address, no map', () => {
  const document = renderWithPlace({
    ...fullPlace,
    latitude: null,
    longitude: null,
  });

  assert.equal(
    locationText(document),
    'Example Hall | 1120 East Fort Avenue Baltimore, MD 21230',
  );
  assert.equal(document.querySelector('.event-meta__event-show-map'), null);
  assert.equal(document.querySelector('iframe'), null);
});

test('a Place with only one coordinate renders no map', () => {
  const document = renderWithPlace({ ...fullPlace, longitude: '' });

  assert.equal(document.querySelector('iframe'), null);
});

test('a Place missing its city or state shows no dangling comma', () => {
  assert.equal(
    locationText(
      renderWithPlace({
        name: 'Example Hall',
        state: 'CT',
        postal_code: '06510',
      }),
    ),
    'Example Hall | CT 06510',
  );
  assert.equal(
    locationText(renderWithPlace({ name: 'Example Hall', city: 'New Haven' })),
    'Example Hall | New Haven',
  );
});
