Drupal.behaviors.menuToggle = {
  attach(context) {
    // Selectors.
    const menuToggle = context.querySelector('.menu-toggle');
    const header = context.querySelector('.site-header');
    const headerOverlay = context.querySelector('.site-header__overlay');
    const body = context.querySelector('body');
    const main = context.querySelector('.main');
    // Classes.
    const frozen = 'frozen';
    const mainMenuState = 'data-main-menu-state';

    // Function to toggle "background" content scrolling when the mobile
    // navigation is open.
    function toggleBgScroll(state) {
      if (state === 'open') {
        // Disable scrolling of "background" content.
        body.classList.add(frozen);
        // Get the header height
        const headerHeight =
          header.offsetHeight + header.getBoundingClientRect().top;
        // Set a padding-top on the main element to accommodate for the "fixed"
        // header when it is taken out of the flow of content.
        main.style.paddingTop = `${headerHeight}px`;
      } else {
        // Enable scrolling of page content.
        body.classList.remove(frozen);
        // Reset css values.
        main.style.paddingTop = '';
      }
    }

    // Function to toggle the open/closed state of the main menu.
    function toggleMenuState(target, attribute) {
      const menuState =
        target.getAttribute(attribute) === 'closed' ? 'open' : 'closed';
      const ariaButtonState =
        target.getAttribute(attribute) === 'closed' ? 'true' : 'false';

      // Set the menu state.
      target.setAttribute(attribute, menuState);

      // Set the button aria properties.
      menuToggle.setAttribute('aria-expanded', ariaButtonState);

      // Set the Bg scroll state.
      toggleBgScroll(menuState);
    }

    // Show/Hide menu on toggle click.
    menuToggle.addEventListener('click', () => {
      toggleMenuState(header, mainMenuState);
    });

    // Hide menu on escape key press.
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        if (header.getAttribute(mainMenuState) === 'open') {
          // Close the main menu if open.
          toggleMenuState(header, mainMenuState);
        }
      }
    });

    // Hide menu on overlay click.
    headerOverlay.addEventListener('click', () => {
      toggleMenuState(header, mainMenuState);
    });
  },
};
