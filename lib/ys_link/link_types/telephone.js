/**
 * @file
 * Telephone link definition.
 */

(function telephone(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const TELEPHONE_REGEX =
    /^(?:(?:tel:)?(?:(?:\+|00)\d{1,3}\s?)?[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4})$/;

  Drupal.ys_links.linkTypes.telephone = {
    weight: 20,
    name: "Telephone",

    evaluator: (link) => link.getAttribute("href").match(TELEPHONE_REGEX),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      const hasTel = link.getAttribute("href").match(/^tel:/);

      if (!navigator.clipboard) {
        if (!hasTel) {
          link.setAttribute("href", `tel:${link.getAttribute("href")}`);
        }
        link.classList.add("ys_linked");
        return;
      }

      if (!hasTel) {
        link.setAttribute("href", `tel:${link.getAttribute("href")}`);
      }
      link.classList.add("ys_skipped");
    },
  };
})(Drupal, drupalSettings);
