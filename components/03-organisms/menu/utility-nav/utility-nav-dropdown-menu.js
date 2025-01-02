Drupal.behaviors.utilityDropdownNav = {
  attach(context) {
    // Selectors
    const utilityDropdownNav = context.querySelector('.utility-nav__dropdown');
    const utilityDropdownNavToggle = context.querySelectorAll(
      '.utility-nav__cta[data-cta-control-type="dropdown"]',
    );
    const utilityDropdownNavContent = context.querySelector(
      '.utility-nav__dropdown-content',
    );

    const maxWidth = 990;

    // Event Listeners
    utilityDropdownNavToggle.forEach((toggle) => {
      const toggleHeight = toggle.offsetHeight;

      toggle.addEventListener('click', () => {
        const isExpanded =
          utilityDropdownNav.getAttribute('aria-expanded') === 'true';
        utilityDropdownNav.setAttribute('aria-expanded', !isExpanded);
        toggle.setAttribute('aria-expanded', !isExpanded);
        utilityDropdownNavContent.setAttribute('aria-hidden', isExpanded);
        if (window.innerWidth > maxWidth) {
          utilityDropdownNavContent.style.top = `${14 + toggleHeight}px`;
        }
      });

      toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          utilityDropdownNav.setAttribute('aria-expanded', false);
          toggle.setAttribute('aria-expanded', false);
          utilityDropdownNavContent.setAttribute('aria-hidden', true);
        }
      });

      utilityDropdownNavContent.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          utilityDropdownNav.setAttribute('aria-expanded', false);
          toggle.setAttribute('aria-expanded', false);
          utilityDropdownNavContent.setAttribute('aria-hidden', true);
          toggle.focus();
        }
      });
    });
  },
};
