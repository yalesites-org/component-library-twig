Drupal.behaviors.layout = {
  attach(context) {
    // Classes.
    // This array of classes should not have the preceding `.` so that we can
    // check for them in `classList.contains` below.
    const classesToCheck = [
      'text-field',
      'wrapped-image',
      'text-with-image',
      'content-spotlight-portrait',
    ];
    const spotlightClasses = ['text-with-image', 'content-spotlight-portrait'];
    // Generate a string of the above classes with preceding `.` for the
    // querySelectorAll below.
    const bodyCopyClasses = classesToCheck.map((i) => `.${i}`);
    const spotlightClassesString = spotlightClasses.map((i) => `.${i}`);
    // Selectors.
    const bodyCopyComponents = context.querySelectorAll(bodyCopyClasses);
    const spotlightComponents = context.querySelectorAll(
      spotlightClassesString,
    );
    // Add the `no-page-spacing` class to the component if the next element
    bodyCopyComponents.forEach((component) => {
      const nextElement = component.nextElementSibling;

      if (
        // If there is a next element.
        nextElement &&
        // And the next element contains one of the classesToCheck
        classesToCheck.some((className) =>
          nextElement.classList.contains(className),
        )
      ) {
        // Add the `no-page-spacing` class to the component.
        component.classList.add('no-page-spacing');
      }
    });

    // Check spotlightComponent classes and add first and last classes
    spotlightComponents.forEach((component, index) => {
      const nextSibling = component.nextElementSibling;
      const isLastItem = index === spotlightComponents.length - 1;
      const isFirstItem = index === 0;

      if (nextSibling) {
        const containsClass = spotlightClasses.some((className) =>
          nextSibling.classList.contains(className),
        );

        // First item = If the next sibling does contain one of the spotlight classes
        if (containsClass && isFirstItem) {
          component.classList.add('spotlight-item--first');
        }

        // Last item = If the next sibling does not contain one of the spotlight classes
        if (!containsClass && isLastItem) {
          component.classList.add('spotlight-item--last');
        }
      }
    });
  },
};
