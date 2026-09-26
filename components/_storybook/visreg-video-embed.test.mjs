/**
 * Fails if a visreg story can render the live YouTube player.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/visreg-video-embed.test.mjs
 *
 * A visreg story gets the live player by importing a fixture that carries it
 * (`video-embed.yml`, `video.yml`) or by naming the host, and must then assign
 * `STATIC_VIDEO_EMBED` to the embed slot. Rationale: "Video embeds" in
 * STORYBOOK.md.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import {
  componentTextFiles,
  projectRoot,
  VISREG_STORY_FILE,
} from './component-files.mjs';
import STATIC_VIDEO_EMBED from './static-video-embed.mjs';

const LIVE_PLAYER_SOURCES = [
  /video-embed\.yml/,
  /\/video\.yml/,
  /youtube(-nocookie)?\.com/,
];

/** The stand-in assigned to an embed slot; importing it alone does not count. */
const USES_STAND_IN = /_content(__\d+)?:\s*STATIC_VIDEO_EMBED\b/;

test('the static stand-in makes no outside request', () => {
  assert.doesNotMatch(STATIC_VIDEO_EMBED, /\bsrc=|https?:/);
});

test('no visreg story renders the live YouTube player', () => {
  const offenders = componentTextFiles()
    .filter((file) => VISREG_STORY_FILE.test(file))
    .filter((file) => {
      const source = readFileSync(file, 'utf8');
      const usesLive = LIVE_PLAYER_SOURCES.some((pattern) =>
        pattern.test(source),
      );
      return usesLive && !USES_STAND_IN.test(source);
    })
    .map((file) => path.relative(projectRoot, file));

  assert.deepEqual(offenders, []);
});
