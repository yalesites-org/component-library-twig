/* Adds a twig function to find the type of URL given */
module.exports = function twigUrl(twigInstance) {
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

  twigInstance.extendFunction('getUrlType', urlType);
}
