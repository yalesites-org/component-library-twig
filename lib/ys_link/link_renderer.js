/**
 * @file
 * Link type render finder.
 */

(function linkRenderer(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const sortLinkTypesByWeight = () => {
    return Object.values(Drupal.ys_links.linkTypes).sort(
      (a, b) => a.weight - b.weight
    );
  };

  const sortedLinkTypes = sortLinkTypesByWeight();
  if (drupalSettings.ys_links.debug) {
    // eslint-disable-next-line no-console
    console.log("The link types being searched are: ", sortedLinkTypes);
  }

  // Given a link, determines which renderer should be used.
  Drupal.ys_links.getLinkRenderer = function getLinkRenderer(link) {
    // Find the first render whose evalulate returns true.
    const linkDefinition = Object.values(sortedLinkTypes).find(
      (linkDefinitions) => linkDefinitions.evaluator(link)
    );

    if (linkDefinition) {
      return linkDefinition.render;
    }

    // When I ran into this issue, it was due to not returning the renderer.
    // Hope you don't get here.  ;)
    // eslint-disable-next-line no-console
    console.error(
      "No link renderer found for link--are you missing a return in a custom link definition?",
      link
    );
    // Catch-all don't modify the link
    return (aLink) => aLink;
  };
})(Drupal, drupalSettings);
