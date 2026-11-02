/**
 * Guards the Audio Player's optional transcript.
 *
 * WCAG 2.1 Level A (SC 1.2.1) needs a text alternative for prerecorded audio.
 * The player accepts `audio_embed__transcript` and renders it as plain page
 * text below the player, styled like the Video description, so it is readable
 * without playing the audio and without JavaScript. The `has-transcript`
 * modifier is what Editoria11y keys on to stop asking for a transcript.
 *
 * A visible "Transcript" button above the text shows and hides it, so a long
 * transcript does not push the rest of the page down. The markup renders the
 * transcript open; the behavior collapses it once JavaScript runs, so a page
 * without JavaScript still shows the whole text.
 *
 * Renders the real template through the same Twig.js setup Storybook uses, and
 * runs the shipped behavior against that markup in jsdom.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/02-molecules/audio/audio-transcript.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { JSDOM } from 'jsdom';
import Twig from 'twig';
import { setupTwig, namespaces } from '../../_storybook/setup-twig.mjs';

setupTwig(Twig);

const componentDir = path.dirname(fileURLToPath(import.meta.url));

const template = Twig.twig({
  path: path.join(componentDir, 'yds-audio.twig'),
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

test('a transcript gets a visible Transcript toggle button', () => {
  const { document } = new JSDOM(
    render({ audio_embed__transcript: '<p>Text.</p>' }),
  ).window;
  const toggle = document.querySelector('.audio-embed__transcript-toggle');
  const text = document.querySelector('.audio-embed__text');

  assert.ok(toggle, 'no transcript toggle rendered');
  assert.equal(toggle.tagName, 'BUTTON');
  assert.equal(toggle.getAttribute('type'), 'button');
  assert.equal(toggle.textContent.trim(), 'Transcript');
  assert.ok(text.id, 'the transcript text needs an id for aria-controls');
  assert.equal(toggle.getAttribute('aria-controls'), text.id);
  // Open in the markup: without JavaScript the transcript must stay readable.
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(text.hidden, false);
  assert.equal(
    toggle.nextElementSibling,
    text,
    'the toggle should come right before the transcript text',
  );
});

test('without a transcript there is no toggle', () => {
  assert.doesNotMatch(render(), /audio-embed__transcript-toggle/);
});

const onceSource = readFileSync(
  new URL(import.meta.resolve('@drupal/once')),
  'utf8',
);
const behaviorSource = readFileSync(
  path.join(componentDir, 'yds-audio-player.js'),
  'utf8',
);

/** A jsdom window holding a player with a transcript and the behaviors. */
const loadPlayer = () => {
  const { window } = new JSDOM(
    render({ audio_embed__transcript: '<p>Text.</p>' }),
    { runScripts: 'outside-only' },
  );
  window.Drupal = { behaviors: {} };
  window.eval(onceSource.replace(/^export default once;\s*$/m, ''));
  window.eval(behaviorSource);

  return window;
};

/** Renders a player with a transcript and runs the shipped behavior on it. */
const attachTranscript = (times = 1) => {
  const window = loadPlayer();
  for (let run = 0; run < times; run += 1) {
    window.Drupal.behaviors.audioTranscript.attach(window.document);
  }
  const { document } = window;

  return {
    toggle: document.querySelector('.audio-embed__transcript-toggle'),
    text: document.querySelector('.audio-embed__text'),
  };
};

test('the behavior collapses the transcript until the button is pressed', () => {
  const { toggle, text } = attachTranscript();

  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(text.hidden, true);

  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(text.hidden, false);

  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(text.hidden, true);
});

test('attaching the behavior twice binds the button once', () => {
  const { toggle, text } = attachTranscript(2);

  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(text.hidden, false);
});

// In Drupal the <audio> comes from the block's media field, so a block whose
// file is missing has none. Atomic still loads the library for the transcript.
test('the player behavior skips a player with no audio element', () => {
  const window = loadPlayer();
  window.document.querySelector('audio').remove();

  assert.doesNotThrow(() =>
    window.Drupal.behaviors.audioPlayer.attach(window.document),
  );
});
