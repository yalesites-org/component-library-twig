/**
 * @file
 * Download link definition.
 */

(function download(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const textHasExtension = (text, extension) => {
    return text.toLowerCase().includes(extension.toLowerCase());
  };

  Drupal.ys_links.linkTypes.download = {
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

      link = Drupal.ys_links.addPunctuationSpacing(link);

      link.dataset.linkType = 'download';
      link.dataset.linkStyle = 'underline-with-icon';

      link.innerHTML = link.innerHTML.trim();

      if (!textHasExtension(link.innerHTML, fileExtension)) {
        link.innerHTML += ` (${fileExtension})`;
      }

      // if the icon has not already been applied, apply it.
      if (Drupal.ys_links.hasNoIcon(link)) {
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan({ content: '(file download)' }),
        );
        link.appendChild(
          Drupal.ys_links.createIcon({
            classes: ['fa-icon', 'fa-regular', 'fa-circle-down'],
          }),
        );
      }

      Drupal.ys_links.debugLog(`${link.getAttribute('href')} is download`);
    },
  };
})(Drupal, drupalSettings);
