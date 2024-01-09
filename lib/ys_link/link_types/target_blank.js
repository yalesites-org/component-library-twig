/**
 * @file
 * Blank target link definition.
 * Note: Not really used, but in storybook.
 */

(function targetBlank(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const hasBlankTarget = (link) => link.getAttribute("target") === "_blank";

  Drupal.ys_links.linkTypes.targetBlank = {
    weight: 10,
    name: "Blank target",

    evaluator: (link) => hasBlankTarget(link),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      link.classList.add(
        "link--with-icon",
        "external-link",
        "ys_target-blank",
        "ys_linked",
        "link"
      );

      link = Drupal.ys_links.addPunctuationSpacing(link);

      link.dataset.linkType = "target-blank";
      link.dataset.linkStyle = "underline-with-icon";

      link.innerHTML = link.innerHTML.trim();
      if (Drupal.ys_links.hasNoIcon(link)) {
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan({
            content: "(opens in a new window/tab)",
          })
        );
        link.appendChild(
          Drupal.ys_links.createIcon({
            classes: ["fa-icon", "fa-solid", "fa-arrow-up-right-from-square"],
          })
        );
      }

      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is target blank`);
    },
  };
})(Drupal);
