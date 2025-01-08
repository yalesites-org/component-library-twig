Drupal.behaviors.utilityDropdownNav = {
  attach() {
    // Selectors
    const utilityDropdownNav = document.querySelector('.utility-nav__dropdown');
    const utilityDropdownNavToggles = document.querySelectorAll(
      '.utility-nav__cta[data-cta-control-type="dropdown"]',
    );
    const utilityDropdownNavContent = document.querySelector(
      '.utility-nav__dropdown-content',
    );

    // Function to toggle dropdown
    const toggleDropdown = (toggle) => {
      const isExpanded =
        utilityDropdownNav.getAttribute('aria-expanded') === 'true';
      utilityDropdownNav.setAttribute('aria-expanded', !isExpanded);
      toggle.setAttribute('aria-expanded', !isExpanded);
      utilityDropdownNavContent.setAttribute('aria-hidden', isExpanded);
    };

    // Function to close dropdown
    const closeDropdown = (toggle) => {
      utilityDropdownNav.setAttribute('aria-expanded', false);
      toggle.setAttribute('aria-expanded', false);
      utilityDropdownNavContent.setAttribute('aria-hidden', true);
    };

    // Event Listeners
    utilityDropdownNavToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => toggleDropdown(toggle));

      toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle);
        }
      });

      utilityDropdownNavContent.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeDropdown(toggle);
          toggle.focus();
        }
      });
    });
  },
};
