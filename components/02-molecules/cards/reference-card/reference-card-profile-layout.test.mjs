/**
 * Pins the People card arrangement on the shared reference card (#1682).
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/cards/reference-card/reference-card-profile-layout.test.mjs
 *
 * Every people card grid follows the old directory card: department above the
 * name, and email shown as the word "Email" linked to the address. The link's
 * accessible name adds the person's name, so a screen-reader user moving card
 * to card does not meet a run of identical "Email" links.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Twig = require('twig');
const { setupTwig, namespaces } = require('../../../../.storybook/setupTwig');

setupTwig(Twig);

const html = Twig.twig({
  data:
    '{% include "@molecules/cards/reference-card/yds-reference-card.twig" with {' +
    "reference_card__heading: 'Ada Lovelace'," +
    "reference_card__department: 'Mathematics'," +
    "reference_card__email: 'ada@example.edu'," +
    'show_department: true,' +
    'show_email: true' +
    '} %}',
  namespaces,
  async: false,
}).render();

test('department renders above the name', () => {
  const department = html.indexOf('reference-card__department');
  assert.ok(department > -1, 'department is rendered');
  assert.ok(
    department < html.indexOf('Ada Lovelace'),
    'department comes before the heading',
  );
});

test('email renders as the word "Email" linked to the address', () => {
  const link = html.match(
    /<a[^>]*href="mailto:ada@example.edu"[^>]*>([^<]*)<\/a>/,
  );
  assert.ok(link, 'a mailto: link is rendered');
  assert.equal(link[1].trim(), 'Email');
  assert.match(link[0], /aria-label="Email Ada Lovelace"/);
});
