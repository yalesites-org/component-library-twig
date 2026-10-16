/**
 * Puts the real `once()` into a `node:vm` sandbox, for tests that run
 * behavior source against a DOM harness.
 *
 * Behaviors call `once()` as a global. On a Drupal page it comes from
 * `core/once`, which atomic.libraries.yml declares for these libraries; in
 * Storybook `config/emulsify-core/storybook/preview.js` sets
 * `global.once` from `@drupal/once`. Both are the same library, so this loads
 * that library's own source into the sandbox rather than a stub: a test then
 * exercises the behavior exactly as shipped, including skipping an element it
 * has already processed.
 *
 * `once()` reads `document` and `Element` from its scope, so the sandbox must
 * provide both (`Element` being the harness's element class), and the harness
 * element must answer `matchesOnceSelector()` from its `matches()`.
 */
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const onceSource = readFileSync(
  new URL(import.meta.resolve('@drupal/once')),
  'utf8',
).replace(/^export default once;\s*$/m, 'globalThis.once = once;');

/**
 * Evaluates `@drupal/once` in a sandbox, defining the global `once` there.
 *
 * @param {object} sandbox - A contextified `node:vm` sandbox.
 */
export const installOnce = (sandbox) => {
  vm.runInContext(onceSource, sandbox, { filename: '@drupal/once' });
};

/**
 * Matches the two selector shapes `once()` builds, `[data-once~="id"]` and
 * `:not([data-once~="id"])`.
 *
 * @param {string} selector - The selector `once()` passed to `matches()`.
 * @param {{getAttribute: Function}} element - The harness element.
 *
 * @returns {boolean|undefined} the match, or undefined for any other selector.
 */
export const matchesOnceSelector = (selector, element) => {
  const [, negated, id] =
    /^(:not\()?\[data-once~="([^"]+)"\]\)?$/.exec(selector) || [];

  if (!id) return undefined;

  const processed = (element.getAttribute('data-once') || '')
    .split(/\s+/)
    .includes(id);

  return negated ? !processed : processed;
};
