Drupal.behaviors.menuToggle = {
  attach(context) {
    // Selectors
    const menuToggle = context.querySelectorAll('.menu-toggle');
    // const menu = context.getElementById('main-nav');
    const header = context.querySelector('.site-header');
    // const headerMenu = context.querySelector('.header__menu');
    // const headerMenuBefore = context.querySelector('.header__sub-menu-overlay');
    // const headerOverlay = context.querySelector('.header__overlay');
    // const subMenuCloseButtons = context.querySelectorAll(
    //   '.main-menu__close-sub',
    // );
    // Classes
    // const openSubButtonClass = 'expand-sub--open';
    // const openSubMenuClass = 'main-menu--sub-open';

    // Function to toggle the open/closed state of an element.
    function toggleMenuState(target, attribute) {
      const menuState =
        target.getAttribute(attribute) === 'closed' ? 'open' : 'closed';

      target.setAttribute(attribute, menuState);
    }

    // // Function to close sub-menus.
    // function closeSubMenus() {
    //   const openSubButtons = context.querySelectorAll('.expand-sub--open');
    //   const openSubMenus = context.querySelectorAll('.main-menu--sub-open');

    //   toggleMenuState(headerMenu, 'data-sub-menu-state');
    //   openSubButtons.forEach((item) => {
    //     item.classList.remove(openSubButtonClass);
    //   });

    //   openSubMenus.forEach((item) => {
    //     item.classList.remove(openSubMenuClass);
    //   });
    // }

    // // Function to toggle sub-menus.
    // function toggleSubMenu(menuItem, subMenu) {
    //   menuItem.classList.toggle(openSubMenuClass);
    //   subMenu.classList.toggle(openSubButtonClass);
    // }

    // if (menu) {
    //   const expandMenu = menu.getElementsByClassName('expand-sub');

    // Show/Hide menu on toggle click.
    menuToggle.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        toggleMenuState(header, 'data-main-menu-state');
      });
    });

    // Hide menu on escape key press.
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        // if (
        //   context
        //     .querySelector('.header__menu')
        //     .getAttribute('data-sub-menu-state') === 'open'
        // ) {
        //   // Close sub menu if open.
        //   closeSubMenus();
        // } else if (header.getAttribute('data-main-menu-state') === 'open') {
        if (header.getAttribute('data-main-menu-state') === 'open') {
          // Close the main menu if open.
          toggleMenuState(header, 'data-main-menu-state');
        }
      }
    });

    // // Hide menu on overlay click.
    // headerOverlay.addEventListener('click', () => {
    //   toggleMenuState(header, 'data-main-menu-state');
    // });

    // // Expose sub menu on click.
    // expandMenu.forEach((item) => {
    //   item.addEventListener('click', (e) => {
    //     const menuItem = e.currentTarget;
    //     const subMenu = menuItem.nextElementSibling;

    //     toggleMenuState(headerMenu, 'data-sub-menu-state');
    //     toggleSubMenu(menuItem, subMenu);
    //   });
    // });

    // // Close sub menu when the "side bar" is clicked.
    // headerMenuBefore.addEventListener('click', () => {
    //   closeSubMenus();
    // });

    // // Close sub menu men the "Back" button is clicked.
    // subMenuCloseButtons.forEach((item) => {
    //   item.addEventListener('click', () => {
    //     closeSubMenus();
    //   });
    // });
    // }
  },
};
