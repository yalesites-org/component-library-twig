/**
 * Pins the helpers `check-link-halo.mjs` installs in the browser page
 * (`link-halo-page.mjs`), without a browser.
 *
 * Run with the Node test runner:
 *   node --test components/_storybook/link-halo-page.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { pseudoElementBox } from './link-halo.mjs';
import {
  PAGE_HELPERS,
  pageHelpersScript,
  waitForRender,
} from './link-halo-page.mjs';

/** Just enough of Storybook's channel: on, off, emit, and a listener count. */
const fakeChannel = () => {
  const listeners = new Map();
  const emitted = [];
  return {
    emitted,
    on(event, listener) {
      listeners.set(event, [...(listeners.get(event) ?? []), listener]);
    },
    off(event, listener) {
      listeners.set(
        event,
        (listeners.get(event) ?? []).filter((other) => other !== listener),
      );
    },
    emit(event, payload) {
      emitted.push([event, payload]);
    },
    fire(event, payload) {
      (listeners.get(event) ?? []).forEach((listener) => listener(payload));
    },
    count: () =>
      [...listeners.values()].reduce((sum, list) => sum + list.length, 0),
  };
};

test('waitForRender emits, then resolves on the render of its own story only', async () => {
  const channel = fakeChannel();
  let settled = false;
  const done = waitForRender(channel, 'a--one', 1000, () =>
    channel.emit('setCurrentStory', { storyId: 'a--one' }),
  ).then(() => {
    settled = true;
  });
  assert.deepEqual(channel.emitted, [
    ['setCurrentStory', { storyId: 'a--one' }],
  ]);
  channel.fire('storyRendered', 'b--other');
  await Promise.resolve();
  assert.equal(settled, false);
  channel.fire('storyRendered', 'a--one');
  await done;
  assert.equal(channel.count(), 0, 'every listener is removed');
});

test('waitForRender rejects on every failure event, storyMissing included', async () => {
  await Promise.all(
    ['storyErrored', 'storyMissing', 'storyThrewException'].map(
      async (event) => {
        const channel = fakeChannel();
        const done = waitForRender(
          channel,
          'a--one',
          1000,
          () => {},
          'setting args on',
        );
        channel.fire(event, { title: 'boom' });
        await assert.rejects(
          done,
          /Story failed to render \(setting args on a--one\): boom/,
        );
        assert.equal(channel.count(), 0, event);
      },
    ),
  );
});

test('waitForRender rejects when sending the request throws, and cleans up', async () => {
  const channel = fakeChannel();
  await assert.rejects(
    waitForRender(
      channel,
      'a--one',
      60000,
      () => {
        throw new Error('channel closed');
      },
      'switching to',
    ),
    /Story request failed \(switching to a--one\): channel closed/,
  );
  // The 60s timer was cleared too, or this test would hold the run open.
  assert.equal(channel.count(), 0);
});

test('waitForRender times out naming what it was doing', async () => {
  const channel = fakeChannel();
  await assert.rejects(
    waitForRender(channel, 'a--one', 5, () => {}, 'switching to'),
    /Timed out after 5ms switching to a--one\./,
  );
  assert.equal(channel.count(), 0);
});

test('waitForRender without a channel rejects', async () => {
  await assert.rejects(
    waitForRender(undefined, 'a--one', 5, () => {}),
    /The Storybook channel is not available/,
  );
});

test('the page script installs working copies of every helper', async () => {
  // Evaluated the way the browser does it: as a script, with nothing from
  // these modules in scope but what the script itself carries.
  const window = {};
  // eslint-disable-next-line no-new-func
  new Function('window', pageHelpersScript())(window);
  const helpers = window[PAGE_HELPERS];
  assert.deepEqual(Object.keys(helpers).sort(), [
    'parkGlobalThemes',
    'pickSample',
    'pseudoElementBox',
    'restoreGlobalThemes',
    'revealLineBox',
    'waitForRender',
  ]);
  // pickSample uses the halo test `evaluateSamples` uses, so the shadow
  // parsing it rests on has to come along: a blurred drop shadow and a
  // transparent one are passed over for the halo behind them.
  const halo = 'rgb(255, 255, 255) 0.48px 0px 0px';
  assert.equal(
    helpers.pickSample(
      (index) =>
        [
          { text: 'none', textShadow: 'none' },
          { text: 'blurred', textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' },
          { text: 'transparent', textShadow: 'rgba(0, 0, 0, 0) 1px 0px 0px' },
          { text: 'title', textShadow: halo, fontSize: 16 },
        ][index],
    ).text,
    'title',
  );
  assert.equal(
    helpers.pickSample(
      (index) =>
        [{ text: 'blurred', textShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 4px' }][
          index
        ],
    ).text,
    'blurred',
  );
  // revealLineBox clips to the ancestors, then scrolls once if it must.
  const scrolls = [];
  const view = { width: 1200, height: 800 };
  assert.deepEqual(
    helpers.revealLineBox(
      () => ({
        rect: { left: 1000, top: 300, right: 1600, bottom: 320 },
        clips: [{ left: 980, top: 290, right: 1180, bottom: 330 }],
        viewport: view,
      }),
      (x, y) => scrolls.push([x, y]),
    ),
    { left: 1000, top: 300, right: 1180, bottom: 320 },
  );
  assert.equal(
    helpers.revealLineBox(
      () => ({
        rect: { left: 100, top: 900, right: 180, bottom: 920 },
        clips: [],
        viewport: view,
      }),
      (x, y) => scrolls.push([x, y]),
    ),
    null,
  );
  assert.deepEqual(scrolls, [[0, 510]]);

  const style = {
    top: '0px',
    right: 'auto',
    bottom: 'auto',
    left: '5%',
    width: '50%',
    height: '10px',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    paddingLeft: '2px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderTopWidth: '0px',
    borderBottomWidth: '0px',
    boxSizing: 'content-box',
  };
  const block = { left: 1, top: 2, width: 300, height: 40 };
  assert.deepEqual(
    helpers.pseudoElementBox(style, block),
    pseudoElementBox(style, block),
  );

  const channel = fakeChannel();
  const done = helpers.waitForRender(channel, 'x', 1000, () =>
    channel.fire('storyRendered', 'x'),
  );
  await done;
});
