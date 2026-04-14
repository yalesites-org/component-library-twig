/**
 * @file yds-text-copy-button.js
 *
 * Copies the text inside `.pre-text__text` to the clipboard when a
 * `.text-copy-button__button` is clicked. After a successful copy the behavior
 * fires a `text-copy-button:copied` CustomEvent that bubbles up the DOM,
 * allowing consumers to swap in their own feedback UI.
 *
 * ## Overriding the default feedback
 *
 * The default feedback replaces the button's text content with
 * "Copied to clipboard", then reverts to "(Copy)" after 1.2 s. To replace
 * this with custom UI (e.g. an icon swap), listen for the event and call
 * `event.preventDefault()`:
 *
 * @example
 * document.addEventListener('text-copy-button:copied', (e) => {
 *   // Scope to a specific context if needed:
 *   if (!e.detail.button.closest('.my-component')) return;
 *
 *   // Prevent the default "(Copy)" → "Copied to clipboard" text swap.
 *   e.preventDefault();
 *
 *   // Provide custom feedback — e.g. toggle a CSS modifier for an icon swap.
 *   const btn = e.detail.button;
 *   btn.classList.add('my-component__copy-btn--copied');
 *   setTimeout(() => btn.classList.remove('my-component__copy-btn--copied'), 1200);
 * });
 *
 * ## Event detail
 *
 * @property {string}      detail.text   - The plain text that was copied.
 * @property {HTMLElement} detail.button - The button element that was clicked.
 */
Drupal.behaviors.textCopyButton = {
  attach(context) {
    // Only bind buttons that haven't been initialized (idempotency guard).
    // Drupal.attachBehaviors() is called on every AJAX request and every
    // Storybook render — without this guard, listeners stack.
    const elems = context.querySelectorAll(
      '.text-copy-button__button:not([data-text-copy-init])',
    );

    elems.forEach((elem) => {
      elem.setAttribute('data-text-copy-init', '');

      elem.addEventListener('click', (event) => {
        const btn = event.target.closest('.text-copy-button__button');
        if (!btn || !navigator.clipboard) return;

        // Use closest() rather than parentNode so this works regardless of
        // whether the button contains nested elements (text, SVG icons, etc.).
        const wrapper = btn.closest('.text-copy-button');
        if (!wrapper) return;

        const source = wrapper.querySelector('.pre-text__text');
        if (!source) return;

        const text = source.textContent.trim();

        navigator.clipboard
          .writeText(text)
          .then(() => {
            // Dispatch a cancelable event. Consumers can call preventDefault()
            // to suppress the default text feedback and provide their own UI.
            const copyEvent = new CustomEvent('text-copy-button:copied', {
              bubbles: true,
              cancelable: true,
              detail: { text, button: btn },
            });
            const useDefault = btn.dispatchEvent(copyEvent);

            if (useDefault) {
              btn.textContent = 'Copied to clipboard';
              setTimeout(() => {
                btn.textContent = '(Copy)';
              }, 1700);
            }
          })
          .catch(() => {
            btn.textContent = '(error)';
          });
      });
    });
  },
};
