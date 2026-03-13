Drupal.behaviors.toggleLinks = {
  attach(context) {
    // Get all "Show More Dates" buttons by data attribute
    const showMoreDatesButtons = context.querySelectorAll(
      '[data-show-more-dates]',
    );
    const showMapWrapper = context.querySelector('.event-meta__event-show-map');
    const showMapButton = context.querySelector('.event-meta__cta--show-map');
    const mapElementWrapper = context.querySelector('.event-meta__map');

    // Function to toggle aria-expanded attribute
    const toggleAriaExpanded = (element) => {
      if (!element) return;
      const currentAriaExpanded =
        element.getAttribute('aria-expanded') === 'true';
      element.setAttribute('aria-expanded', String(!currentAriaExpanded));
    };

    // Function to toggle is-expanded class
    const toggleIsExpanded = (element) => {
      if (!element) return;
      const currentIsExpanded = element.getAttribute('is-expanded') === 'true';
      element.setAttribute('is-expanded', String(!currentIsExpanded));
    };

    // Handle Show More Dates button click
    function handleShowMoreDatesClick(event) {
      event.preventDefault();
      const button = event.currentTarget;
      toggleAriaExpanded(button);

      // Find the wrapper to expand/collapse
      const wrapperSelector = button.getAttribute('data-show-more-dates');
      const wrapper = wrapperSelector
        ? context.querySelector(wrapperSelector)
        : button.closest('.event-meta__more-dates-link')?.nextElementSibling;

      toggleIsExpanded(wrapper);

      if (
        wrapper &&
        wrapper.classList.contains('event-meta__multiple-dates') &&
        wrapper.hasAttribute('aria-expanded')
      ) {
        toggleAriaExpanded(wrapper);
      }
    }

    // Attach to all show more dates buttons
    showMoreDatesButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', handleShowMoreDatesClick);
    });

    // Handle Show Map button click
    function handleShowMapClick(event) {
      event.preventDefault();
      toggleAriaExpanded(showMapButton);
      toggleIsExpanded(showMapWrapper);
      toggleAriaExpanded(mapElementWrapper);
    }

    if (showMapButton) {
      showMapButton.setAttribute('aria-expanded', 'false');
      showMapButton.addEventListener('click', handleShowMapClick);
      mapElementWrapper.setAttribute('aria-expanded', 'false');
    }
  },
};
