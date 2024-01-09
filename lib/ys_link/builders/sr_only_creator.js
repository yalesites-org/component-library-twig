/**
 * @file
 * Screen reader only span for links.
 */

(function SrOnlyCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};

  Drupal.ys_links.createSrOnlySpan = (options = {}) => {
    const {
      content = "(unknown link--please let us know so we can add one)",
      classes = ["sr-only"],
      elementType = "span",
    } = options;
    const span = document.createElement(elementType);
    span.classList.add(...classes);
    span.innerHTML = content;

    return span;
  };
})(Drupal, drupalSettings);
