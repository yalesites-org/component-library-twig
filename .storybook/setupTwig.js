const { resolve } = require('path');
const twigDrupal = require('twig-drupal-filters');
const twigBEM = require('bem-twig-extension');
const twigAddAttributes = require('add-attributes-twig-extension');

module.exports.namespaces = {
  atoms: resolve(__dirname, '../', 'components/01-atoms'),
  molecules: resolve(__dirname, '../', 'components/02-molecules'),
  organisms: resolve(__dirname, '../', 'components/03-organisms'),
  'page-layouts': resolve(__dirname, '../', 'components/04-page-layouts'),
  'page-examples': resolve(__dirname, '../', 'components/05-page-examples'),
};

/* Adds a twig function to find the type of URL given */
function twigUrl(twigInstance) {
  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  const isAnchor = (url) => url.startsWith('#');

  const isRelative = (url) => url.startsWith('/');

  const isData = (url) => url.startsWith('data:');

  const isMailToLink = (url) => {
    return url.startsWith("mailto:");
  };

  const urlType = (url) => {
    const types = {
      download: (url) => {
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
        ].map((ext) => ext.toLowerCase());
        const extension = url.split('.').pop()?.toLowerCase();
        return fileExtensions.includes(extension);
      },

      internal: (url) => {
        return (
          urlHasCurrentDomain(url) ||
          isAnchor(url) ||
          isRelative(url) ||
          isData(url)
        );
      },

      mailto: (url) => {
        return isMailToLink(url);
      },

      external: (url) => {
        return !(
          url.indexOf(document.location.hostname) > -1 ||
          url.startsWith('/') ||
          url.startsWith('#') ||
          url.startsWith('data:')
        );
      },

    };

    if (!url) {
      return undefined;
    }

    const found = Object.keys(types).find((key) => types[key](url));
    return found;
  };

  twigInstance.extendFunction('url_type', urlType);
}

/**
 * Configures and extends a standard twig object.
 *
 * @param {Twig} twig - twig object that should be configured and extended.
 *
 * @returns {Twig} configured twig object.
 */
module.exports.setupTwig = function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  twigBEM(twig);
  twigAddAttributes(twig);
  twigUrl(twig);
  return twig;
};
