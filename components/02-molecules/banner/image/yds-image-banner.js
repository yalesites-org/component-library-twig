/**
 * Image Banner caption: make a scrolling caption reachable by keyboard.
 *
 * The caption is capped at half the banner height and scrolls (see the
 * stylesheet). A scroll box with no focusable content cannot be scrolled with
 * the keyboard, so give it tabindex="0" only while it overflows.
 */
Drupal.behaviors.imageBannerCaption = {
  attach(context) {
    const captions = once(
      'image-banner-caption',
      '.image-banner__image figcaption',
      context,
    );

    const update = (caption) => {
      if (caption.scrollHeight > caption.clientHeight) {
        caption.setAttribute('tabindex', '0');
      } else {
        caption.removeAttribute('tabindex');
      }
    };

    captions.forEach((caption) => {
      update(caption);
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(() => update(caption)).observe(caption);
      }
    });
  },
};
