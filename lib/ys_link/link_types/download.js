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
    weight: 10,
    name: 'Download',

    evaluator: (link) => {
      const url = link.getAttribute('href');
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
        link.appendChild(ysLinks.createIcon());
      }

      ysLinks.debugLog(`${link.getAttribute('href')} is download`);
    },
  };
})(ysLinks, ysLinkSettings);
