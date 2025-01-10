Drupal.behaviors.utilityDropdownNav = {
  attach() {
    // Selectors
    const utilityDropdownNavs = document.querySelectorAll(
      '.utility-nav__dropdown',
    );
    const utilityDropdownNavToggles = document.querySelectorAll(
      '.utility-nav__cta[data-cta-control-type="dropdown"]',
    );
    const utilityDropdownNavContents = document.querySelectorAll(
      '.utility-nav__dropdown-content',
    );
    const siteHeader = document.querySelector('.site-header__menu-wrapper');

    // Function to toggle dropdown and adjust aria attributes
    const toggleDropdown = (toggle, nav, content) => {
      const isExpanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', !isExpanded);
      toggle.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
    };

    // Function to close dropdown
    const closeDropdown = (toggle, nav, content) => {
      nav.setAttribute('aria-expanded', false);
      toggle.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
    };

    // Function to adjust dropdown position
    const adjustDropdownPosition = (content) => {
      const isExpanded = content.getAttribute('aria-hidden') === 'false';
      const contentElement = content;
      const siteHeaderRect = siteHeader.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const overflowRight = contentRect.right - siteHeaderRect.right;

      if (!isExpanded) {
        contentElement.style.left = '';
        contentElement.style.right = '';
        return;
      }

      if (overflowRight > 0) {
        contentElement.style.left = 'auto';
        contentElement.style.right = '0';
      } else {
        contentElement.style.left = '';
        contentElement.style.right = '';
      }
    };

    // Function to adjust dropdown width based on window size
    const adjustDropdownWidth = (content, utilityDropdownMenu) => {
      const menuWidthStyle = utilityDropdownMenu;

      if (window.innerWidth >= 990 && utilityDropdownMenu) {
        const dropdownWidth = utilityDropdownMenu.offsetWidth;

        menuWidthStyle.style.width = 'auto'; // Reset width to auto before recalculating
        menuWidthStyle.style.width = `${dropdownWidth + 40}px`;
      } else if (utilityDropdownMenu) {
        menuWidthStyle.style.width = 'auto';
      }

      // Adjust dropdown position if inside the siteHeader
      if (siteHeader) {
        adjustDropdownPosition(content);
      }
    };

    // Debounce function to limit the rate at which a function can fire
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // Loop through each dropdown
    utilityDropdownNavToggles.forEach((toggle, index) => {
      const nav = utilityDropdownNavs[index];
      const content = utilityDropdownNavContents[index];
      const utilityDropdownMenu = content.querySelector(
        '.utility-nav-dropdown__menu',
      );

      // Initial adjustment
      adjustDropdownWidth(content, utilityDropdownMenu);

      // Adjust on window resize with debounce
      window.addEventListener(
        'resize',
        debounce(() => adjustDropdownWidth(content, utilityDropdownMenu), 200),
      );

      // Event listeners: 'click'
      toggle.addEventListener('click', () => {
        toggleDropdown(toggle, nav, content);
        // Adjust dropdown position if inside the siteHeader
        if (siteHeader) {
          adjustDropdownPosition(content);
        }
      });

      // Event listeners: 'keydown' (for accessibility)
      toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle, nav, content);
        }
      });

      // Event listeners: 'keydown' (for accessibility)
      // add focus to toggle when dropdown is closed
      content.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle, nav, content);
          toggle.focus();
        }
      });
    });
  },
};
