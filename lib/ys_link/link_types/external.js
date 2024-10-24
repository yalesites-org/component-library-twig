import ysLinks from '../ys_links';
import ysLinkSettings from '../ys_link_settings';

/**
 * @file
 * External link definition.
 */

(function external(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1 ||
    url.startsWith('/') ||
    url.startsWith('#') ||
    url.startsWith('?') ||
    url.startsWith('data:');

  ysLinks.linkTypes.external = {
    weight: 900,
    name: 'External',

    evaluator: (link) => {
      const url = link.getAttribute('href');
      return url && !urlHasCurrentDomain(url);
    },
    render: (link) => {
      if (link.classList.contains('ys_linked')) {
        return;
      }

      link.classList.add(
        'link--with-icon',
        'external-link',
        'ys_external',
        'ys_linked',
        'link',
      );

      link = ysLinks.addPunctuationSpacing(link);

      link.dataset.linkType = 'external';
      link.dataset.linkStyle = 'underline-with-icon';

      link.innerHTML = link.innerHTML.trim();
      if (ysLinks.hasNoIcon(link)) {
        link.appendChild(
          ysLinks.createSrOnlySpan({ content: '(link is external)' }),
        );
        link.appendChild(
          ysLinks.createIcon({
            classes: ['fa-icon', 'fa-solid', 'fa-arrow-up-right'],
          }),
        );
      }
      ysLinks.debugLog(`${link.getAttribute('href')} is external`);
    },
  };
})(ysLinks);
