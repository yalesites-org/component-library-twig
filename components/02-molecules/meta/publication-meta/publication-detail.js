/**
 * Publication detail — copy citation to clipboard.
 *
 * Looks for any `[data-copy-citation]` button inside `.publication-detail`
 * and copies the textContent of the element targeted by the button's
 * `data-copy-target` attribute (a CSS selector) into the clipboard.
 */
/* eslint-disable no-param-reassign */
Drupal.behaviors.publicationDetailCopyCitation = {
  attach(context) {
    const buttons = once(
      'publication-detail-copy-citation',
      '[data-copy-citation]',
      context,
    );

    buttons.forEach((button) => {
      const targetSelector = button.getAttribute('data-copy-target');
      const defaultLabel = button.textContent.trim();

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const target = targetSelector
          ? document.querySelector(targetSelector)
          : null;
        if (!target) {
          return;
        }

        const text = target.innerText.replace(/\s+/g, ' ').trim();

        try {
          await navigator.clipboard.writeText(text);
          button.textContent = Drupal.t('Copied!');
          button.setAttribute('aria-live', 'polite');
          window.setTimeout(() => {
            button.textContent = defaultLabel;
          }, 2000);
        } catch (err) {
          button.textContent = Drupal.t('Copy failed');
          window.setTimeout(() => {
            button.textContent = defaultLabel;
          }, 2000);
        }
      });
    });
  },
};
