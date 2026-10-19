/**
 * Guards the permissions policy delegated to the embed iframe.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/embed/embed-iframe-allow.test.mjs
 *
 * Chrome and Firefox refuse clipboard writes inside a cross-origin iframe
 * unless the embedding page delegates the permission with `allow`. This is the
 * only iframe the platform renders for an embed -- every `ys_embed` source that
 * sets `isIframe` routes through this template rather than its own markup -- so
 * if the attribute is dropped here, copy buttons inside every embed break at
 * once, silently and only in those browsers. Nothing in Storybook or a review
 * diff makes that visible, which is why it is pinned here.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const componentDir = path.dirname(fileURLToPath(import.meta.url));
const template = readFileSync(
  path.join(componentDir, 'yds-embed.twig'),
  'utf8',
);

/** The opening `<iframe ...>` tag, so assertions cannot match a comment. */
const iframeTag = template.match(/<iframe\b[^>]*>/s);

test('the embed template still renders exactly one iframe', () => {
  assert.ok(iframeTag, 'no <iframe> tag found in yds-embed.twig');
  assert.equal(
    template.match(/<iframe\b/g).length,
    1,
    'more than one iframe: every one of them needs the allow attribute',
  );
});

test('the embed iframe delegates clipboard-write to the embedded origin', () => {
  assert.match(iframeTag[0], /\ballow="[^"]*\bclipboard-write\b[^"]*"/);
});
