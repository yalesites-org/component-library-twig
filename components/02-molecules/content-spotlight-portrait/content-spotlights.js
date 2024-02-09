Drupal.behaviors.contentSpotlights = {
  attach(context) {
    // Define the selectors to check and store them in a variable
    const selectorsToCheck = '.text-with-image, .content-spotlight-portrait';
    // Select all elements with class "text-with-image" or "content-spotlight-portrait"
    const contentSpotlights = context.querySelectorAll(selectorsToCheck);

    // Iterate over each element
    contentSpotlights.forEach((element) => {
      // Check if the current element is the first element in a group
      const isFirst =
        !element.previousElementSibling ||
        !element.previousElementSibling.matches(selectorsToCheck);
      // Check if the current element is the last element in a group
      const isLast =
        !element.nextElementSibling ||
        !element.nextElementSibling.matches(selectorsToCheck);

      // Add "spotlights--first" class if the current element is the first element in a group
      if (isFirst) {
        element.classList.add('spotlights--first');
      }

      // Add "spotlights--last" class if the current element is the last element in a group
      if (isLast) {
        element.classList.add('spotlights--last');
      }
    });
  },
};
