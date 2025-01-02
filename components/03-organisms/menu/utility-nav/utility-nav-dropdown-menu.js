Drupal.behaviors.utilityDropdownNav = {
  attach(context) {
    // Selectors
    const utilityDropdownNav = context.querySelector('.utility-nav__dropdown');
    const utilityDropdownNavToggle = context.querySelectorAll(
      '.utility-nav__cta[data-cta-control-type="dropdown"]',
    );

    // Event Listeners
    utilityDropdownNavToggle.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const isExpanded =
          utilityDropdownNav.getAttribute('aria-expanded') === 'true';
        utilityDropdownNav.setAttribute('aria-expanded', !isExpanded);
        toggle.setAttribute('aria-expanded', !isExpanded);
      });
    });
  },
};
