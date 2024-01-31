/**
 * @file
 * Yalesites link icon generation.
 */

(function iconCreator(ysLinks) {
  ysLinks = ysLinks || {};

  ysLinks.createIcon = (options = {}) => {
    const {
      classes = [],
      aria = { hidden: true },
      role = 'img',
      title = '',
      elementType = 'i',
    } = options;

    classes.push('fa-fw');
    const faicon = document.createElement(elementType);
    faicon.classList.add(...classes);
    Object.entries(aria).forEach(([key, value]) =>
      faicon.setAttribute(`aria-${key}`, value),
    );

    if (role.length > 0) {
      faicon.setAttribute('role', role);
    }

    if (title.length > 0) {
      faicon.setAttribute('title', title);
    }

    return faicon;
  };
})(ysLinks, ysLinkSettings);
