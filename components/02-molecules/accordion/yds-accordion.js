Drupal.behaviors.accordion = {
  attach(context) {
    // Selectors
    const items = context.querySelectorAll('.accordion-item');
    const controls = context.querySelectorAll('.accordion__controls');
    // Classes
    const itemContent = '.accordion-item__content';
    const itemState = 'data-accordion-expanded';
    const itemToggle = '.accordion-item__toggle';
    // States
    const buttonState = 'aria-expanded';

    // Function to expand an accordion item.
    const expand = (item) => {
      const toggle = item.querySelector(itemToggle);
      const content = item.querySelector(itemContent);

      content.style.setProperty(
        '--accordion-item-height',
        `${content.scrollHeight}px`,
      );
      item.setAttribute(itemState, 'true');
      toggle.setAttribute(buttonState, 'true');
    };

    // Function to collapse an accordion item.
    const collapse = (item) => {
      const toggle = item.querySelector(itemToggle);

      item.setAttribute(itemState, 'false');
      toggle.setAttribute(buttonState, 'false');
    };

    // Tels if the expand/collapse button is expanded
    const isButtonExpanded = (element) => {
      const value = element.getAttribute(buttonState);

      return value === 'true';
    };

    // Replaces the first word of a string with Collapse or Expand
    // based on the state given (true or false)
    const replaceCollapseOrExpand = (original, state) => {
      const firstWordOptions = {
        true: 'Collapse',
        false: 'Expand',
      };

      // Capture the first word of a string
      const firstWord = /^[^\s]+/;

      return original.replace(firstWord, firstWordOptions[state]);
    };

    // Replaces text and aria for the toggle all button
    const getNewToggleValue = (button) => {
      const initialValue = isButtonExpanded(button);
      const newValue = !initialValue;

      // Return the new value so that other things can happen
      return newValue;
    };

    // Hide all accordion content sections if JavaScript is enabled.
    items.forEach((item) => {
      collapse(item);
    });

    // Toggle accordion content when toggle is activated.
    items.forEach((item) => {
      const toggle = item.querySelector(itemToggle);

      toggle.addEventListener('click', () => {
        // Toggle the item's state.
        return toggle.getAttribute(buttonState) === 'true'
          ? collapse(item)
          : expand(item);
      });
    });

    controls.forEach((control) => {
      // Get all items relevant to the control.
      const allItems = control.parentNode.querySelectorAll('.accordion-item');
      // Add click listener on the parent <ul>
      control.addEventListener('click', (e) => {
        const action = getNewToggleValue(e.target);
        const targetButton = e.target;

        // Replace first word with expand or collapse message
        targetButton.innerHTML = replaceCollapseOrExpand(
          targetButton.innerHTML,
          action,
        );
        // Set the button state so that arrows and actions take place
        targetButton.setAttribute(buttonState, action);

        // Iterate over
        allItems.forEach((item) => {
          if (action === false) {
            collapse(item);
          } else {
            expand(item);
          }
        });
      });
    });
  },
};
