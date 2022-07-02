Drupal.behaviors.tabs = {
  attach(context) {
    // Selectors
    const tabSet = context.querySelectorAll('.tabs');

    tabSet.forEach((tabs) => {
      const tabLinks = tabs.querySelectorAll('.tabs__link');
      const tabContainers = tabs.querySelectorAll('.tabs__container');
      let activeIndex = 0;

      /**
       * goToTab
       * @description Goes to a specific tab based on index. Returns nothing.
       * @param {Number} index The index of the tab to go to.
       */
      function goToTab(index) {
        if (index !== activeIndex && index >= 0 && index <= tabLinks.length) {
          tabLinks[Number(activeIndex)].classList.remove('is-active');
          tabLinks[Number(index)].classList.add('is-active');
          tabContainers[Number(activeIndex)].classList.remove('is-active');
          tabContainers[Number(index)].classList.add('is-active');
          activeIndex = index;
        }
      }

      /**
       * handleClick
       * @description Handles click event listeners on each of the links in the
       *   tab navigation. Returns nothing.
       * @param {HTMLElement} link The link to listen for events on.
       * @param {Number} index The index of that link.
       */
      function handleClick(link, index) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          goToTab(index);
        });
      }

      /**
       * init
       * @description Initializes the component by removing the `no-js` class
       *   from the component, and attaching event listeners to each of the nav
       *   items. Returns nothing.
       */
      tabs.classList.remove('no-js');

      tabLinks.forEach((tab, index) => {
        handleClick(tab, index);
      });
    });
  },
};
