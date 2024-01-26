/**
 * @file
 * Yalesites link icon generation.
 */

(function iconCreator(ysLinks) {
  ysLinks = ysLinks || {};

  const iconCreator = (options = {}) => {
    const {
      classes = [],
      aria = { hidden: true },
      role = 'img',
      title = '',
      elementType = 'i',
    } = options;

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

  const svgCreator = (options = {}) => {
    const {
      classes = [],
      aria = { hidden: true },
      role = '',
      title = '',
      iconName = 'arrow-up-right',
      svgName = 'solid',
    } = options;

    const elementType = 'use';

    const fasvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    fasvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    fasvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    fasvg.setAttribute('version', '1.1');
    const faicon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      elementType,
    );
    faicon.setAttribute(
      'xlink:href',
      `/fonts/fontawesome/sprites/${svgName}.svg#${iconName}`,
    );

    classes.push('fa-icon-svg');
    fasvg.classList.add(...classes);

    Object.entries(aria).forEach(([key, value]) =>
      fasvg.setAttribute(`aria-${key}`, value),
    );

    if (role.length > 0) {
      fasvg.setAttribute('role', role);
    }

    if (title.length > 0) {
      fasvg.setAttribute('title', title);
    }

    fasvg.append(faicon);
    return fasvg;
  };

  ysLinks.createIcon = svgCreator;
})(ysLinks, ysLinkSettings);
