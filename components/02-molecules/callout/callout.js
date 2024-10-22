Drupal.behaviors.callout = {
  attach(context) {
    // A list of components classes to check
    // This will be changed to a class list below, but we need this to know
    // which data attribute to create later.
    const components = ['quick-links', 'callouts'];

    // Define the selectors to check and store them in a variable
    // 1. Map over the components array and add a period to each item
    // 2. Join the array into a string separated by commas
    //
    // Will be of the form '.quick-links, .callouts'
    const selectorsToCheck = components
      .map((componentName) => `.${componentName}`)
      .join(', ');

    // Select all elements with class "text-with-image" or "content-spotlight-portrait"
    const calloutsAndQuickLinks = context.querySelectorAll(selectorsToCheck);

    // Iterate over each element
    calloutsAndQuickLinks.forEach((element) => {
      // Define previous and next sibling elements
      let prevElement = element.previousElementSibling;
      let nextElement = element.nextElementSibling;

      // Check if current element has contextual element
      if (nextElement && nextElement.classList.contains('contextual')) {
        nextElement = nextElement.nextElementSibling;
      }

      // Check if current element has contextual element for previous sibling
      if (prevElement && prevElement.classList.contains('contextual')) {
        prevElement = prevElement.previousElementSibling;
      }

      // Check if the current element is the first element in a group
      const isFirst =
        !element.previousElementSibling ||
        !element.previousElementSibling.matches(selectorsToCheck);

      // Check if the current element is the last element in a group
      const isLast =
        !element.nextElementSibling ||
        !element.nextElementSibling.matches(selectorsToCheck);

      // Find the right component name to set the data attribute correctly.
      // data-unknown-position means we have an issue.
      let componentName = 'unknown';
      components.forEach((component) => {
        if (element.classList.contains(component)) {
          componentName = component;
        }
      });

      // Sets data-spotlights-position to "first" if the current element is the first element in a group
      if (isFirst) {
        element.setAttribute(`data-${componentName}-position`, 'first');
      }

      // Sets data-spotlights-position to "last" if the current element is the first element in a group
      if (isLast) {
        element.setAttribute(`data-${componentName}-position`, 'last');
      }

      if (isFirst && isLast) {
        element.setAttribute(
          `data-${componentName}-position`,
          'first-and-last',
        );
      }
    });
  },
};
