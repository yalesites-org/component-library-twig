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

    // Function to toggle dropdown
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

    // Event Listeners
    utilityDropdownNavToggles.forEach((toggle, index) => {
      const nav = utilityDropdownNavs[index];
      const content = utilityDropdownNavContents[index];
      const utilityDropdownMenu = content.querySelector(
        '.utility-nav-dropdown__menu',
      );

      if (utilityDropdownMenu) {
        const dropdownWidth = utilityDropdownMenu.offsetWidth;
        utilityDropdownMenu.style.width = `${dropdownWidth + 40}px`;
      }

      toggle.addEventListener('click', () =>
        toggleDropdown(toggle, nav, content),
      );

      toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle, nav, content);
        }
      });

      content.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle, nav, content);
          toggle.focus();
        }
      });
    });
  },
};
