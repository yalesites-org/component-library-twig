/**
 * @file
 * Internal (same domain) link definition.
 */

(function internal(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  const isAnchor = (url) => url.startsWith("#");

  const isRelative = (url) => url.startsWith("/");

  const isData = (url) => url.startsWith("data:");

  Drupal.ys_links.linkTypes.internal = {
    weight: 1000,
    name: "Internal",

    evaluator: (link) => {
      const href = link.getAttribute("href");

      return (
        urlHasCurrentDomain(href) ||
        isAnchor(href) ||
        isRelative(href) ||
        isData(href)
      );
    },
    render: (link) => {
      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is internal`);

      link.classList.add("ys_internal");
      link.classList.add("ys_linked");

      // link = Drupal.ys_links.addLinkClassIfChanged(link, (aLink) => {
      //   aLink = Drupal.ys_links.applyLinkStyle(aLink, "underline");
      //   aLink = Drupal.ys_links.applyLinkType(aLink, "normal");
      //   return aLink;
      // });

      return link;
    },
  };
})(Drupal);
