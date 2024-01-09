/**
 * @file
 * Mailto link definition.
 */

(function mailto(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const isMailToLink = (link) => {
    return link.getAttribute("href").startsWith("mailto:");
  };

  Drupal.ys_links.linkTypes.mailto = {
    weight: 30,
    name: "Mailto",

    evaluator: isMailToLink,
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      link.classList.add("ys_skipped");
    },
  };
})(Drupal);
