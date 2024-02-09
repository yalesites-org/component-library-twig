Drupal.behaviors.contentSpotlights = {
  attach(context) {
    // Select all spotlight components
    // those with the classes '.text-with-image' and '.content-spotlight-portrait'
    const contentSpotlights = context.querySelectorAll(
      '.text-with-image, .content-spotlight-portrait',
    );

    // Set an empty array to hold the current group of spotlights.
    let currentGroup = [];

    // Check if the group contains any elements
    function markFirstAndLast(group) {
      if (group.length > 0) {
        // Add classes to the first and last spotlights in a group.
        group[0].classList.add('spotlights--first');
        group[group.length - 1].classList.add('spotlights--last');
      }
    }

    // Loop through the spotlights and group them.
    contentSpotlights.forEach((element, index) => {
      // Get the previous sibling of the current element.
      const prevSibling = element.previousElementSibling;

      // Check if the previous sibling of the current element matches one of the target classes
      if (
        prevSibling &&
        prevSibling.matches('.text-with-image, .content-spotlight-portrait')
      ) {
        // Add the current element to the current group
        currentGroup.push(element);
      } else {
        // If the previous sibling does not match, mark the first and last elements of the previous group
        markFirstAndLast(currentGroup);
        // Start a new group with the current element
        currentGroup = [element];
      }

      // If this is the last element, mark the first and last elements of the last group
      if (index === contentSpotlights.length - 1) {
        markFirstAndLast(currentGroup);
      }
    });
  },
};
