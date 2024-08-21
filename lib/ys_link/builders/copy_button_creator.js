import ysLinks from '../ys_links';
import ysLinkSettings from '../ys_link_settings';

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
