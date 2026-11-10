/**
 * Guards keyboard focus when a modal is reopened.
 *
 * The modal has no close animation, so MicroModal must not wait for one. If it
 * does, closing with Escape leaves `is-open` set, and the next open returns
 * early without moving focus into the popup (the Events Calendar "more events"
 * popup showed this).
 *
 * Run with the Node test runner:
 *   node --test components/02-molecules/modal/yds-modal.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import MicroModal from 'micromodal';

const dom = new JSDOM(
  `<button id="open" data-micromodal-trigger="m1">More</button>
   <div id="m1" class="micromodal-slide" aria-hidden="true">
     <div data-micromodal-close tabindex="-1">
       <div role="dialog"><button id="close" data-micromodal-close>Close</button></div>
     </div>
   </div>`,
  { pretendToBeVisual: true },
);
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Drupal = { behaviors: {} };
globalThis.once = (id, selector, context) =>
  Array.from(context.querySelectorAll(selector));
globalThis.MicroModal = MicroModal;

const modal = document.getElementById('m1');
const trigger = document.getElementById('open');
const close = document.getElementById('close');

test('focus moves into the modal on every open, including after Escape', async () => {
  // eslint-disable-next-line import/extensions
  await import('./yds-modal.js');
  globalThis.Drupal.behaviors.ysModal.attach(document);

  for (let i = 0; i < 3; i += 1) {
    trigger.focus();
    trigger.click();
    assert.ok(modal.classList.contains('is-open'), `open #${i + 1}`);
    assert.equal(
      document.activeElement,
      close,
      `focus in modal on open #${i + 1}`,
    );

    modal.dispatchEvent(
      new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    assert.ok(!modal.classList.contains('is-open'), `closed #${i + 1}`);
    assert.equal(document.activeElement, trigger, 'focus returns to trigger');
  }
});
