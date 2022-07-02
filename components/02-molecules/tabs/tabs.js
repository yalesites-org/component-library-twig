Drupal.behaviors.tabs = {
  attach(context) {
    // Selectors
    const tabs = context.querySelectorAll('.tabs');

    tabs.forEach((tabSet) => {
      const TabSet = tabSet;
      const tabNav = TabSet.querySelector('.tabs__nav');
      const tabLinks = TabSet.querySelectorAll('.tabs__link');
      const tabContainers = TabSet.querySelectorAll('.tabs__container');
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
       * setHeight
       * @description Sets the height of the tabs wrapper to support animating
       *   the height when switching tabs.
       */
      function setHeight() {
        const navHeight = tabNav.offsetHeight;
        const containerHeight = tabContainers[Number(activeIndex)].offsetHeight;
        const totalHeight = navHeight + containerHeight;

        TabSet.style.height = `${totalHeight}px`;
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
          setHeight();
        });
      }

      /**
       * init
       * @description Initializes the component by removing the `no-js` class
       *   from the component and setting the height for later animation. Also
       *   attaches event listeners to each of the nav items. Returns nothing.
       */
      TabSet.classList.remove('no-js');
      setHeight();

      tabLinks.forEach((tab, index) => {
        handleClick(tab, index);
      });
    });
  },
};
