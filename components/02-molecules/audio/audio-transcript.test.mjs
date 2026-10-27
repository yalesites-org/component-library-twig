/**
 * Guards the Audio Player's optional transcript.
 *
 * WCAG 2.1 Level A (SC 1.2.1) needs a text alternative for prerecorded audio.
 * The player accepts `audio_embed__transcript` and renders it as plain page
 * text below the player, styled like the Video description, so it is readable
 * without playing the audio and without JavaScript. The `has-transcript`
 * modifier is what Editoria11y keys on to stop asking for a transcript.
 *
 * Renders the real template through the same Twig.js setup Storybook uses.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/audio/audio-transcript.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Twig from 'twig';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

setupTwig(Twig);

const template = Twig.twig({
  path: path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'yds-audio.twig',
  ),
  namespaces,
  async: false,
  rethrow: true,
});

const render = (props = {}) =>
  template.render({
    audio_embed__content: 'Listen to this content',
    audio_embed__url: 'https://example.com/audio.mp3',
    ...props,
  });

/** The opening tag of the component root. */
const rootTag = (html) =>
  html.match(/<div[^>]*class="[^"]*audio-embed[^"]*"[^>]*>/)[0];

test('a transcript renders as page text after the player', () => {
  const html = render({
    audio_embed__transcript:
      '<p>Speaker one: hello.</p><p>Speaker two: hi.</p>',
  });
  const transcript = html.match(
    /<div[^>]*class="[^"]*audio-embed__text[^"]*"[^>]*>([\s\S]*?)<\/div>/,
  );
  assert.ok(transcript, 'no audio-embed__text element rendered');
  assert.match(
    transcript[1],
    /<p>Speaker one: hello\.<\/p><p>Speaker two: hi\.<\/p>/,
  );
  assert.ok(
    html.indexOf('audio-embed__text') > html.indexOf('audio-embed__player'),
    'the transcript should follow the player',
  );
  assert.doesNotMatch(transcript[0], /\bhidden\b|aria-hidden/);
});

test('a transcript marks the player with the has-transcript modifier', () => {
  const html = render({ audio_embed__transcript: '<p>Text.</p>' });
  assert.match(rootTag(html), /audio-embed--has-transcript/);
});

test('without a transcript there is no text area and no modifier', () => {
  const html = render();
  assert.doesNotMatch(html, /audio-embed__text/);
  assert.doesNotMatch(rootTag(html), /has-transcript/);
});
