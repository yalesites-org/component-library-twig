/**
 * @file
 * Link type render finder.
 */

(function linkRenderer(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const sortLinkTypesByWeight = () => {
    return Object.values(ysLinks.linkTypes).sort((a, b) => a.weight - b.weight);
  };

  const sortedLinkTypes = sortLinkTypesByWeight();
  if (ysLinkSettings.debug) {
    // eslint-disable-next-line no-console
    console.log('The link types being searched are: ', sortedLinkTypes);
  }

  // Given a link, determines which renderer should be used.
  ysLinks.getLinkRenderer = function getLinkRenderer(link) {
    // Find the first render whose evalulate returns true.
    const linkDefinition = Object.values(sortedLinkTypes).find(
      (linkDefinitions) => linkDefinitions.evaluator(link),
    );

    if (linkDefinition) {
      return linkDefinition.render;
    }

    // When I ran into this issue, it was due to not returning the renderer.
    // Hope you don't get here.  ;)
    // eslint-disable-next-line no-console
    console.error(
      'No link renderer found for link--are you missing a return in a custom link definition?',
      link,
    );
    // Catch-all don't modify the link
    return (aLink) => aLink;
  };
})(ysLinks, ysLinkSettings);
