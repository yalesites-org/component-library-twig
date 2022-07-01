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
  return twig;
};
