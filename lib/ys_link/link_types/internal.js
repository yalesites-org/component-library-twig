/**
 * @file
 * Internal (same domain) link definition.
 */

(function internal(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  const isAnchor = (url) => url.startsWith('#');

  const isRelative = (url) => url.startsWith('/');

  const isData = (url) => url.startsWith('data:');

  ysLinks.linkTypes.internal = {
    weight: 1000,
    name: 'Internal',

    evaluator: (link) => {
      const href = link.getAttribute('href');

      return (
        urlHasCurrentDomain(href) ||
        isAnchor(href) ||
        isRelative(href) ||
        isData(href)
      );
    },
    render: (link) => {
      ysLinks.debugLog(`${link.getAttribute('href')} is internal`);

      link.classList.add('ys_internal');
      link.classList.add('ys_linked');

      // link = ysLinks.addLinkClassIfChanged(link, (aLink) => {
      //   aLink = ysLinks.applyLinkStyle(aLink, "underline");
      //   aLink = ysLinks.applyLinkType(aLink, "normal");
      //   return aLink;
      // });

      return link;
    },
  };
})(ysLinks);
