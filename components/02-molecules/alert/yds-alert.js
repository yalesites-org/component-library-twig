Drupal.behaviors.alert = {
  attach(context) {
    // Selectors
    const alerts = context.querySelectorAll('.alert');
    const alertToggle = '.alert__toggle';
    // Classes and States
    const alertId = 'data-alert-id';
    const alertState = 'data-alert-state';
    const buttonState = 'aria-expanded';

    // The toggle must keep working even when localStorage cannot be used --
    // blocked (private browsing, cookie-blocking extensions, corporate policy)
    // or full. Storage is only how the state is remembered between page loads,
    // so a failure to read or write it must never stop the alert being set up.
    // Without it the state lives in the data attribute for the life of the page.
    const readState = (id) => {
      try {
        return localStorage.getItem(id);
      } catch (e) {
        return null;
      }
    };

    const writeState = (id, value) => {
      try {
        localStorage.setItem(id, value);
      } catch (e) {
        // Nothing to do: the state is already on the element.
      }
    };

    // Function to expand an alert.
    const expand = (item, toggle, id) => {
      item.setAttribute(alertState, 'expanded');
      toggle.setAttribute(buttonState, 'true');
      writeState(id, 'expanded');
    };

    // Function to collapse an alert.
    const collapse = (item, toggle, id) => {
      item.setAttribute(alertState, 'collapsed');
      toggle.setAttribute(buttonState, 'false');
      writeState(id, 'collapsed');
    };

    // Function to dismiss an alert.
    const dismiss = (item, id) => {
      item.setAttribute(alertState, 'dismissed');
      writeState(id, 'dismissed');
    };

    // Function to animate the dismissal of an alert.
    const animatedDismiss = (item, id) => {
      dismiss(item, id);
      item.classList.add('alert__animate');
    };

    // Function to remove old alerts from storage.
    const resetAlerts = () => {
      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.substring(0, 12) === 'ys-alert-id-') {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {
        // Storage is unavailable, so there is nothing stored to clear.
      }
    };

    const alertCount = alerts.length;
    let newAlerts = 0;

    alerts.forEach((alert) => {
      const id = alert.getAttribute(alertId);
      const type = alert.getAttribute('data-alert-type');
      const toggle = alert.querySelector(alertToggle);

      // Get the alert state if previously interacted with by the user.
      const state = readState(id);

      // If the current alert has no state, clear other values from storage.
      if (state == null) {
        newAlerts += 1;
      }

      // If the alert was dismissed, keep it dismissed.
      if (state === 'dismissed') {
        dismiss(alert, id);
        // If the alert was collapsed, load it in the collapsed state.
      } else if (state === 'collapsed') {
        collapse(alert, toggle, id);
      }

      // Toggle alert state
      toggle.addEventListener('click', () => {
        if (type === 'emergency') {
          // For emergency alerts, toggle the "expanded/collapsed" state.
          return alert.getAttribute(alertState) === 'expanded'
            ? collapse(alert, toggle, id)
            : expand(alert, toggle, id);
        }

        // For all other alert types, dismiss the alert with animation.
        return animatedDismiss(alert, id);
      });
    });

    if (alertCount === newAlerts) {
      resetAlerts();
    }
  },
};
