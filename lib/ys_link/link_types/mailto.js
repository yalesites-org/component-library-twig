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
