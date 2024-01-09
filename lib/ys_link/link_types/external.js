/**
 * @file
 * External link definition.
 */

(function external(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1 ||
    url.startsWith("/") ||
    url.startsWith("#") ||
    url.startsWith("data:");

  Drupal.ys_links.linkTypes.external = {
    weight: 900,
    name: "External",

    evaluator: (link) => {
      const url = link.getAttribute("href");
      return !urlHasCurrentDomain(url);
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      link.classList.add(
        "link--with-icon",
        "external-link",
        "ys_external",
        "ys_linked",
        "link"
      );

      link = Drupal.ys_links.addPunctuationSpacing(link);

      link.dataset.linkType = "external";
      link.dataset.linkStyle = "underline-with-icon";

      link.innerHTML = link.innerHTML.trim();
      if (Drupal.ys_links.hasNoIcon(link)) {
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan({ content: "(link is external)" })
        );
        link.appendChild(
          Drupal.ys_links.createIcon({
            classes: ["fa-icon", "fa-solid", "fa-arrow-up-right"],
          })
        );
      }
      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is external`);
    },
  };
})(Drupal);
