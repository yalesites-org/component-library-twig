/**
 * Fails if a visreg story can play the looping placeholder video.
 *
 * Run with the Node test runner (no extra dependency):
 *   node --test components/_storybook/visreg-static-video.test.mjs
 *
 * `placeholder-loop.mp4` changes every frame, so a snapshot of any story that
 * autoplays it lands on a different frame each run and reports a diff when
 * nothing changed. Visreg stories must use `placeholder-static.mp4`, whose frames
 * are identical. A visreg story gets the looping video by default in two ways,
 * and must then override `video_background__content`: importing the
 * video-background fixture, or turning on a banner's video
 * (`grand_hero__video: 'true'`), whose template falls back to the looping video.
 * See `assets/videos/README.md`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import {
  componentTextFiles,
  projectRoot,
  VISREG_STORY_FILE,
} from './component-files.mjs';

const STATIC_VIDEO = '/assets/videos/placeholder-static.mp4';
const LOOP_SOURCES = [
  /placeholder-loop\.mp4/,
  /video-background\.yml/,
  /_video:\s*['"]?true/,
];

test('the static placeholder video exists', () => {
  assert.ok(existsSync(path.join(projectRoot, STATIC_VIDEO)));
});

test('no visreg story plays the looping placeholder video', () => {
  const offenders = componentTextFiles()
    .filter((file) => VISREG_STORY_FILE.test(file))
    .filter((file) => {
      const source = readFileSync(file, 'utf8');
      const usesLoop = LOOP_SOURCES.some((pattern) => pattern.test(source));
      return usesLoop && !source.includes(STATIC_VIDEO);
    })
    .map((file) => path.relative(projectRoot, file));

  assert.deepEqual(offenders, []);
});
