import ysLinks from '../ys_links';
import ysLinkSettings from '../ys_link_settings';

/**
 * @file
 * Screen reader only span for links.
 */

(function SrOnlyCreator(ysLinks) {
  ysLinks = ysLinks || {};

  ysLinks.createSrOnlySpan = (options = {}) => {
    const {
      content = '(unknown link--please let us know so we can add one)',
      classes = ['visually-hidden'],
      elementType = 'span',
    } = options;
    const span = document.createElement(elementType);
    span.classList.add(...classes);
    span.innerHTML = content;

    return span;
  };
})(ysLinks, ysLinkSettings);
