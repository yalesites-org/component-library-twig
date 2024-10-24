let ysLinks = {'item': 'value'};
let ysLinkSettings = {
  contextStart: ['body'],
  excludedClasses: [
    '.site-header__yale-branding',
    '.site-footer__site-branding',
    '.social-links__link',
    '.toolbar-icon',
    '.site-header__site-branding',
    '.gin-breadcrumb__link',
    '.glb-button',
    '.meta-sidebar__trigger',
    '.node-page-layout-builder-form a',
    '.layout-builder__link',
    '.toolbar-menu a',
    'a:has(img)'
  ],
  debug: false,
};

/**
 * @file
 * Copy button link definition for mailto (and probably more later).
 */

(function copyButtonCreator(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  // How can I get this from compoenent-library-twig????
  const copyButtonFunctionality = (event) => {
    event.preventDefault();

    const defaultCopyIcon = 'fa-copy';
    const selectedCopyIcon = 'fa-check';

    const elem = event.target;

    if (ysLinkSettings.ys_links.debug) {
      // eslint-disable-next-line
      console.log('elem: ', elem);
    }

    // Only fire if the target has id copy
    if (!elem.matches('.text-copy-button__button')) return;

    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }

    if (ysLinkSettings.ys_links.debug) {
      // eslint-disable-next-line no-console
      console.log(
        '.pre-text__text found: ',
        event.target.previousElementSibling.querySelector('.pre-text__text'),
      );
    }

    // Assumption: .pre-text__text is somewhere within the link itself
    const link = event.target.closest('a');
    const icon = link.querySelector('i.fa-copy');
    const preTextText = link.querySelector('.pre-text__text');
    const text = (preTextText || link).textContent.trim();
    const oldTitle = icon.getAttribute('title');
    const newTitle = 'Copied.  Select to copy again.';
    try {
      navigator.clipboard.writeText(text);
      icon.classList.remove(defaultCopyIcon);
      icon.classList.add(selectedCopyIcon);
      icon.setAttribute('title', newTitle);
      setTimeout(() => {
        icon.classList.remove(selectedCopyIcon);
        icon.classList.add(defaultCopyIcon);
        icon.setAttribute('title', oldTitle);
      }, 1000);
    } catch (error) {
      const triggerValue = elem;
      triggerValue.innerHTML = '(error)';
    }
  };

  ysLinks.createCopyButtonWithIcon = (
    clickEventHandler = copyButtonFunctionality,
    options = {},
  ) => {
    const {
      copyButtonClass = 'text-copy-button__button',
      icon = {
        classes: ['fa-solid', 'fa-copy', 'text-copy-button__button'],
        title: 'Copy to clipboard',
      },
    } = options;
    const button = document.createElement('button');
    button.classList.add(copyButtonClass);
    button.appendChild(
      ysLinks.createIcon({
        classes: icon.classes,
        title: icon.title,
      }),
    );
    button.addEventListener('click', clickEventHandler);
    return button;
  };
})(ysLinks, ysLinkSettings);

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

/**
 * @file
 * Download link definition.
 */

(function download(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const textHasExtension = (text, extension) => {
    return text.toLowerCase().includes(extension.toLowerCase());
  };

  ysLinks.linkTypes.download = {
    weight: 11,
    name: 'Download',

    evaluator: (link) => {
      const url = link.getAttribute('href');
      if (url === null) {
        return false;
      }

      const fileExtensions = [
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'zip',
        'csv',
        'xml',
        'rtf',
      ].map((ext) => ext.toLowerCase());
      const extension = url.split('.').pop().toLowerCase();
      return (
        fileExtensions.includes(extension) ||
        link.dataset.linkType === 'download'
      );
    },
    render: (link) => {
      if (link.classList.contains('ys_linked')) {
        return;
      }

      const fileExtension = link
        .getAttribute('href')
        .split('.')
        .pop()
        .toUpperCase();
      link.classList.add(
        'link--with-icon',
        'external-link',
        'ys_download',
        'ys_linked',
        'link',
      );

      link = ysLinks.addPunctuationSpacing(link);

      link.dataset.linkType = 'download';
      link.dataset.linkStyle = 'underline-with-icon';

      if (link.getAttribute('download') === null) {
        link.setAttribute('download', '');
      }

      link.innerHTML = link.innerHTML.trim();

      if (!textHasExtension(link.innerHTML, fileExtension)) {
        link.innerHTML += ` (${fileExtension})`;
      }

      // if the icon has not already been applied, apply it.
      if (ysLinks.hasNoIcon(link)) {
        link.appendChild(
          ysLinks.createSrOnlySpan({ content: '(file download)' }),
        );
        link.appendChild(
          ysLinks.createIcon({
            classes: ['fa-icon', 'fa-regular', 'fa-circle-down'],
          }),
        );
      }

      ysLinks.debugLog(`${link.getAttribute('href')} is download`);
    },
  };
})(ysLinks, ysLinkSettings);

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

  const isQueryString = (url) => url.startsWith('?');

  ysLinks.linkTypes.internal = {
    weight: 1000,
    name: 'Internal',

    evaluator: (link) => {
      const href = link.getAttribute('href');

      return (
        href &&
        (urlHasCurrentDomain(href) ||
          isQueryString(href) ||
          isAnchor(href) ||
          isRelative(href) ||
          isData(href))
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

/**
 * @file
 * Mailto link definition.
 */

(function mailto(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const isMailToLink = (link) => {
    const href = link.getAttribute('href');
    return href && href.startsWith('mailto:');
  };

  ysLinks.linkTypes.mailto = {
    weight: 30,
    name: 'Mailto',

    evaluator: isMailToLink,
    render: (link) => {
      if (link.classList.contains('ys_linked')) {
        return;
      }

      link.classList.add('ys_skipped');
    },
  };
})(ysLinks);

/**
 * @file
 * Blank target link definition.
 * Note: Not really used, but in storybook.
 */

(function targetBlank(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const hasBlankTarget = (link) => link.getAttribute('target') === '_blank';

  ysLinks.linkTypes.targetBlank = {
    weight: 10,
    name: 'Blank target',

    evaluator: (link) => hasBlankTarget(link),
    render: (link) => {
      if (link.classList.contains('ys_linked')) {
        return;
      }

      link.classList.add(
        'link--with-icon',
        'external-link',
        'ys_target-blank',
        'ys_linked',
        'link',
      );

      link = ysLinks.addPunctuationSpacing(link);

      link.dataset.linkType = 'target-blank';
      link.dataset.linkStyle = 'underline-with-icon';

      link.innerHTML = link.innerHTML.trim();
      if (ysLinks.hasNoIcon(link)) {
        link.appendChild(
          ysLinks.createSrOnlySpan({
            content: '(opens in a new window/tab)',
          }),
        );
        link.appendChild(
          ysLinks.createIcon({
            classes: ['fa-icon', 'fa-solid', 'fa-arrow-up-right-from-square'],
          }),
        );
      }

      ysLinks.debugLog(`${link.getAttribute('href')} is target blank`);
    },
  };
})(ysLinks);

/**
 * @file
 * Telephone link definition.
 */

(function telephone(ysLinks) {
  ysLinks = ysLinks || {};
  ysLinks.linkTypes = ysLinks.linkTypes || {};

  const TELEPHONE_REGEX =
    /^(?:(?:tel:)?(?:(?:\+|00)\d{1,3}\s?)?[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4})$/;

  ysLinks.linkTypes.telephone = {
    weight: 20,
    name: 'Telephone',

    evaluator: (link) =>
      link.getAttribute('href') &&
      link.getAttribute('href').match(TELEPHONE_REGEX),
    render: (link) => {
      if (link.classList.contains('ys_linked')) {
        return;
      }

      const hasTel = link.getAttribute('href').match(/^tel:/);

      if (!navigator.clipboard) {
        if (!hasTel) {
          link.setAttribute('href', `tel:${link.getAttribute('href')}`);
        }
        link.classList.add('ys_linked');
        return;
      }

      if (!hasTel) {
        link.setAttribute('href', `tel:${link.getAttribute('href')}`);
      }
      link.classList.add('ys_skipped');
    },
  };
})(ysLinks, ysLinkSettings);

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

/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function init(ysLinks, ysLinkSettings) {
  ysLinks = ysLinks || {};
  ysLinks.debug = false;

  // Global way to handle debugging logs
  ysLinks.debugLog = (message) => {
    if (ysLinkSettings.debug) {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  };

  // Tests if the link has no icons already.
  ysLinks.hasNoIcon = (link) => {
    return link.querySelectorAll('.fa-icon').length === 0;
  };

  /* Looks at the next character after a link to determine if it is a
  punctuation.  In CKE text, we must append a class that will help render it
  closer to the link for looks. */
  ysLinks.punctuationAfter = (link) => {
    const punctuationRegex = /(\.|\?|!|”|"|'|,|\)|\]|-)$/;

    if (link.nextSibling === null) {
      return false;
    }

    const nextCharacter = link.nextSibling.textContent.trim()[0];

    return (
      nextCharacter !== undefined &&
      nextCharacter.match(punctuationRegex) !== null
    );
  };

  // Adds the punctuation modifier if it exists.
  ysLinks.addPunctuationSpacing = (link) => {
    if (ysLinks.punctuationAfter(link)) {
      link.classList.add('ys_punctuation-after');
    }

    return link;
  };

  // Attempts to detect if a link is inside of a component or not.
  // Based on this, we will determine whether to decorate it or not.
  ysLinks.isInComponent = (link) => {
    const component = link.closest(
      [
        '.component-wrapper',
        '[data-component-theme]',
        '[data-menu-variation]',
        '[data-component-width]',
      ].join(', '),
    );

    return component !== null;
  };

  // Runs a function on a link element and determines whether it has change or not.
  ysLinks.ifDidChange = (link, fn) => {
    link = fn(link);

    return link.changed;
  };

  // Adds a link class if the element was changed by our function.
  // This is a way to conditionally update the linkStyle and linkType
  // attributes and know if they were changed.  If they were, we probably want
  // the link class.  Otherwise, the link class messes up a lot of different
  // controls, which we might want to fix in the future.
  ysLinks.addLinkClassIfChanged = (link, fn) => {
    if (ysLinks.ifDidChange(link, fn)) {
      link.classList.add('link');
      link.changed = true;
    }

    return link;
  };

  // Applies the linkStyle if it isn't set and if it's not in a component
  ysLinks.applyLinkStyle = (link, style) => {
    if (!link.dataset.linkStyle && !ysLinks.isInComponent(link)) {
      link.dataset.linkStyle = style;
      link.changed = true;
    }

    return link;
  };

  // Applies the linkType if it isn't set and if it's not in a component
  ysLinks.applyLinkType = (link, type) => {
    if (!link.dataset.linkType && !ysLinks.isInComponent(link)) {
      link.dataset.linkType = type;
    }

    return link;
  };

  const getExclusionParams = (excludedClasses) => {
    let queryParams = 'a';
    if (excludedClasses.length > 0) {
      queryParams = `a:not(${excludedClasses})`;
    }

    // Exclude already decorated items.
    queryParams += ':not(:has(>i.fa-icon))';
    // Ensure we only get links that have hrefs on the tag.
    queryParams += ':not(:not([href]))';

    return queryParams;
  };

  const getContextParams = (contexts) => {
    return contexts.join(', ');
  };

  const defaultConfiguration = () => ({
    contextStart: ['#main-content'],
    excludedClasses: [],
    debug: true,
  });

  const setConfiguration = (newSettings) => {
    const settings = newSettings || defaultConfiguration();
    return Object.assign(defaultConfiguration(), settings);
  };

  const retrieveAllLinksFromContexts = (contexts, excludedClasses) => {
    return (
      contexts
        .map(function findLinks(linkContext) {
          return Array.from(
            linkContext.querySelectorAll(getExclusionParams(excludedClasses)),
          );
        })
        .flat() || []
    );
  };

  class ExecutionTimer {
    constructor() {
      this.start = new Date().getTime();
    }

    end() {
      const end = new Date().getTime();
      const time = end - this.start;
      ysLinks.debugLog(`Execution time: ${time}ms`);
    }
  }

  const getExecutionTimer = () => {
    if (ysLinkSettings.debug) {
      return new ExecutionTimer();
    }

    return { end: () => {} };
  };

  const linkHasNoDecoration = (link) => {
    const linkContainsAnITag = link.querySelector('i') !== null;
    return !link.classList.contains('ys_linked') && !linkContainsAnITag;
  };

  ysLinks.attach = function attach(context, ysLinkSettings) {
    ysLinkSettings = setConfiguration(ysLinkSettings || {});

    const executionTimer = getExecutionTimer();

    ysLinks.debugLog('Drupal settings: ', ysLinkSettings);

    const contextStart = getContextParams([ysLinkSettings.contextStart].flat());
    const pageContexts = Array.from(context.querySelectorAll(contextStart));
    const excludedClasses = ysLinkSettings.excludedClasses.join(', ');

    const links = retrieveAllLinksFromContexts(pageContexts, excludedClasses);

    links.forEach(function findLinkRenderer(link) {
      if (linkHasNoDecoration(link)) {
        const linkRenderer = ysLinks.getLinkRenderer(link);
        linkRenderer(link);
      }
    });

    executionTimer.end();
  };

  document.addEventListener('DOMContentLoaded', function (_event) {
    ysLinks.attach(document, ysLinkSettings);
  });
})(ysLinks, ysLinkSettings);
