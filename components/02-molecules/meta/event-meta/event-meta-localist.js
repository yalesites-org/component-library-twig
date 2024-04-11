Drupal.behaviors.toggleLinks = {
  attach(context) {
    const showMoreDatesWrapper = context.querySelector(
      '.event-meta__all-dates',
    );
    const showMoreDatesButton = context.querySelector(
      '.event-meta__cta--show-more-dates',
    );

    const showMapWrapper = context.querySelector('.event-meta__event-show-map');
    const showMapButton = context.querySelector('.event-meta__cta--show-map');

    // Function to toggle aria-expanded attribute
    const toggleAriaExpanded = (element) => {
      const currentAriaExpanded =
        element.getAttribute('aria-expanded') === 'true';
      element.setAttribute('aria-expanded', String(!currentAriaExpanded));
    };

    // Function to toggle is-expanded class
    const toggleIsExpanded = (element) => {
      const currentIsExpanded = element.getAttribute('is-expanded') === 'true';
      element.setAttribute('is-expanded', String(!currentIsExpanded));
    };

    // Handle Show More Dates button click
    function handleShowMoreDatesClick(event) {
      const button = event.target;
      toggleAriaExpanded(button);
      toggleIsExpanded(showMoreDatesWrapper);

      const targetDiv = button.closest(
        '.event-meta__more-dates-link',
      ).nextElementSibling;
      if (
        targetDiv &&
        targetDiv.classList.contains('event-meta__multiple-dates') &&
        targetDiv.hasAttribute('aria-expanded')
      ) {
        toggleAriaExpanded(targetDiv);
        button.childNodes[4].textContent =
          button.childNodes[4].textContent.includes('Show more dates')
            ? 'Collapse more dates'
            : 'Show more dates';
      }
    }

    // Handle Show Map button click
    function handleShowMapClick(event) {
      const button = event.target;
      toggleAriaExpanded(button);
      toggleIsExpanded(showMapWrapper);

      const siblingDiv = button.nextElementSibling;
      if (siblingDiv && siblingDiv.hasAttribute('aria-expanded')) {
        toggleAriaExpanded(siblingDiv);
        button.childNodes[0].textContent =
          button.childNodes[0].textContent.includes('Show map')
            ? 'Hide map'
            : 'Show map';
      }
    }

    if (showMoreDatesButton) {
      showMoreDatesButton.setAttribute('aria-expanded', 'false');
      showMoreDatesButton.addEventListener('click', handleShowMoreDatesClick);
    }

    if (showMapButton) {
      showMapButton.setAttribute('aria-expanded', 'false');
      showMapButton.addEventListener('click', handleShowMapClick);
    }
  },
};
