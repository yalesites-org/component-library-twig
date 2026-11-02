/**
 * Helpers the link halo check runs inside the browser page
 * (YaleSites-Internal#1939).
 *
 * `page.evaluate` sends a function to the page as source text, so a function
 * it runs cannot call anything defined in Node. The few helpers the in-page
 * code shares are therefore installed on the page once per document, from
 * their own source, by `check-link-halo.mjs`
 * (`page.evaluateOnNewDocument(pageHelpersScript())`), and the in-page code
 * reads them from `window[PAGE_HELPERS]`. The script declares every helper,
 * and the ones they call (the `text-shadow` parsing behind `drawsHalo`), in
 * one function scope, so a helper may call another by name but must refer to
 * nothing outside that set; `link-halo-page.test.mjs` evaluates the script
 * with nothing else in scope to prove it.
 *
 * Kept free of Puppeteer so the tests can import it without a browser.
 *
 * @see link-halo-page.test.mjs
 * @see check-link-halo.mjs
 */
import {
  drawsHalo,
  haloShadows,
  parkGlobalThemes,
  parseColor,
  parseTextShadow,
  pickSample,
  pseudoElementBox,
  restoreGlobalThemes,
  revealLineBox,
  scrollToReveal,
  splitTopLevel,
  visibleLineBox,
} from './link-halo.mjs';

/** The `window` property the helpers are installed under. */
export const PAGE_HELPERS = 'linkHaloHelpers';

/**
 * Emits a request on Storybook's channel and waits for the story to render.
 *
 * Switching stories, changing globals and updating args all end the same
 * way: the preview emits `storyRendered` with the story id, or one of the
 * failure events. Listeners are attached before `emit` runs, so a render that
 * completes synchronously is not missed, and are all removed however the wait
 * ends.
 *
 * @param {?{on: function, off: function}} channel
 *   The preview's channel (`window.__STORYBOOK_ADDONS_CHANNEL__`).
 * @param {string} id
 *   The story whose render ends the wait; renders of any other are ignored.
 * @param {number} timeout
 *   Most milliseconds to wait.
 * @param {function(): void} emit
 *   Sends the request.
 * @param {string} [action]
 *   What the request does, for the error message: "switching to", "setting
 *   args on".
 * @return {Promise<void>}
 *   Resolves once the story has rendered; rejects if it errors, is missing,
 *   or times out.
 */
export function waitForRender(
  channel,
  id,
  timeout,
  emit,
  action = 'rendering',
) {
  if (!channel) {
    return Promise.reject(new Error('The Storybook channel is not available.'));
  }

  return new Promise((resolve, reject) => {
    const failures = ['storyErrored', 'storyMissing', 'storyThrewException'];
    // Declared first and assigned below: the listeners and `finish` refer to
    // each other.
    let timer;
    let onRendered;
    let onFailure;
    const finish = (error) => {
      clearTimeout(timer);
      channel.off('storyRendered', onRendered);
      failures.forEach((event) => channel.off(event, onFailure));
      if (error) reject(error);
      else resolve();
    };
    onRendered = (renderedId) => {
      if (renderedId === id) finish();
    };
    onFailure = (detail) => {
      finish(
        new Error(
          `Story failed to render (${action} ${id}): ${
            detail?.title ?? detail?.message ?? String(detail)
          }`,
        ),
      );
    };

    timer = setTimeout(
      () => finish(new Error(`Timed out after ${timeout}ms ${action} ${id}.`)),
      timeout,
    );
    channel.on('storyRendered', onRendered);
    failures.forEach((event) => channel.on(event, onFailure));
    // A request that throws as it is sent fails the wait like a render
    // error, rather than leaving the timer and listeners behind.
    try {
      emit();
    } catch (error) {
      finish(
        new Error(
          `Story request failed (${action} ${id}): ${
            error?.message ?? String(error)
          }`,
        ),
      );
    }
  });
}

/**
 * The script that installs the helpers on a page.
 *
 * @return {string}
 *   Source for `page.evaluateOnNewDocument`.
 */
export const pageHelpersScript = () =>
  `window[${JSON.stringify(PAGE_HELPERS)}] = (() => {
${[
  splitTopLevel,
  parseColor,
  parseTextShadow,
  haloShadows,
  drawsHalo,
  pickSample,
  pseudoElementBox,
  scrollToReveal,
  visibleLineBox,
  revealLineBox,
  parkGlobalThemes,
  restoreGlobalThemes,
  waitForRender,
]
  .map((helper) => helper.toString())
  .join('\n')}
return {
  pickSample,
  pseudoElementBox,
  revealLineBox,
  parkGlobalThemes,
  restoreGlobalThemes,
  waitForRender,
};
})();`;
