/* Twig function that classifies a URL's type (internal/external/download/etc). */
export default function getUrlType(url, attributes = {}) {
  const urlHasCurrentDomain = (u) => u.indexOf(document.location.hostname) > -1;
  const isAnchor = (u) => u.startsWith('#');
  const isRelative = (u) => u.startsWith('/');
  const isData = (u) => u.startsWith('data:');
  const isQueryString = (u) => u.startsWith('?');
  const isMailToLink = (u) => u.startsWith('mailto:');

  const types = {
    'target-blank': () => attributes.target === '_blank',
    download: (u) => {
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
      const extension = u.split('.').pop()?.toLowerCase();
      return fileExtensions.includes(extension);
    },
    internal: (u) =>
      urlHasCurrentDomain(u) ||
      isQueryString(u) ||
      isAnchor(u) ||
      isRelative(u) ||
      isData(u),
    mailto: (u) => isMailToLink(u),
    external: (u) =>
      !(
        u.indexOf(document.location.hostname) > -1 ||
        u.startsWith('/') ||
        u.startsWith('#') ||
        u.startsWith('?') ||
        u.startsWith('data:')
      ),
  };

  if (!url) {
    return 'internal';
  }

  return Object.keys(types).find((key) => types[key](url));
}
