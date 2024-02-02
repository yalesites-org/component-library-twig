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
