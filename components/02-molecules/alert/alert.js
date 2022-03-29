Drupal.behaviors.alert = {
  attach(context) {
    // Selectors
    const alerts = context.querySelectorAll('.alert');
    const alertToggle = '.alert__toggle';
    // Classes and States
    const alertState = 'data-alert-state';
    const buttonState = 'aria-expanded';

    // Function to expand an alert.
    const expand = (item, toggle) => {
      item.setAttribute(alertState, 'expanded');
      toggle.setAttribute(buttonState, 'true');
    };

    const collapse = (item, toggle) => {
      item.setAttribute(alertState, 'collapsed');
      toggle.setAttribute(buttonState, 'false');
    };

    alerts.forEach((alert) => {
      const toggle = alert.querySelector(alertToggle);

      toggle.addEventListener('click', () => {
        return alert.getAttribute(alertState) === 'expanded'
          ? collapse(alert, toggle)
          : expand(alert, toggle);
      });
    });
  },
};
