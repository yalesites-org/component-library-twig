Drupal.behaviors.tabs = {
  attach(context) {
    // Selectors
    const tabs = context.querySelectorAll('.tabs');

    // Support the case where multiple tab sets are on the same page.
    tabs.forEach((tabSet) => {
      const TabSet = tabSet;
      const tabNav = TabSet.querySelector('.tabs__nav');
      // const tabControls = TabSet.querySelectorAll('.tabs__control');
      const tabLinks = TabSet.querySelectorAll('.tabs__link');
      const tabContainers = TabSet.querySelectorAll('.tabs__container');
      let activeIndex = 0;
      let overflowDir;
      // let navDirection;

      /**
       * setOverflow
       * @description Get the positions of the tabs and the tabs__items to
       *   determine whether an overflow situation is in play.
       */
      function setOverflow() {
        const tabsLeft = TabSet.getBoundingClientRect().left;
        const tabsRight = TabSet.getBoundingClientRect().right;
        const firstTabLeft = TabSet.querySelector(
          '.tabs__item:first-child',
        ).getBoundingClientRect().left;
        const lastTabRight = Math.floor(
          TabSet.querySelector('.tabs__item:last-child').getBoundingClientRect()
            .right,
        );

        if (firstTabLeft < tabsLeft) {
          // If left side of first tab is < left side of tabs.
          // And right side of last tab is > right side of tabs.
          if (lastTabRight > tabsRight) {
            if (overflowDir !== 'both') {
              overflowDir = 'both';
              TabSet.setAttribute('data-overflow', 'both');
            }
            // If left side of first tab is < left side of tabs.
            // But right side of last tab is <= right side of tabs.
          } else if (overflowDir !== 'left') {
            overflowDir = 'left';
            TabSet.setAttribute('data-overflow', 'left');
          }
          // If left side of first tab is >= left side of tabs.
          // And right side of last tab is > right side of tabs.
        } else if (lastTabRight > tabsRight) {
          if (overflowDir !== 'right') {
            overflowDir = 'right';
            TabSet.setAttribute('data-overflow', 'right');
          }
          // If left side or first tab is >= left side of tabs.
          // And right side of last tab is <= right side of tabs.
        } else {
          TabSet.setAttribute('data-overflow', 'none');
          overflowDir = 'none';
        }
      }

      // /**
      //  * mouseNav
      //  * @description Support mouse navigation when horizontal scrolling occurs.
      //  */
      // function mouseNav(direction) {
      //   // If right
      //   if (direction === 'right') {
      //     navDirection = direction;
      //   }
      // }

      // tabControls.forEach((control) => {
      //   control.addEventListener('click', (e) => {
      //     e.preventDefault();

      //     if (control.classList.contains('tabs__control--right')) {
      //       mouseNav('right');
      //     } else {
      //       mouseNav('left');
      //     }
      //   });
      // });

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
       * goToTab
       * @description Goes to a specific tab based on index. Returns nothing.
       * @param {Number} index The index of the tab to go to.
       */
      function goToTab(index) {
        if (index !== activeIndex && index >= 0 && index <= tabLinks.length) {
          tabLinks[Number(activeIndex)].removeAttribute('aria-selected');
          tabLinks[Number(activeIndex)].setAttribute('tabindex', '-1');
          tabLinks[Number(index)].setAttribute('aria-selected', 'true');
          tabLinks[Number(index)].removeAttribute('tabindex');
          tabLinks[Number(index)].focus();
          tabContainers[Number(activeIndex)].classList.remove('is-active');
          tabContainers[Number(index)].classList.add('is-active');
          activeIndex = index;
          setHeight();
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
       * debounce
       * @description Debounce to only run a function at most once every 200ms.
       * @param {} func The function to be run after the timeout.
       */
      function debounce(func) {
        let timer;
        return function debounceFunction(event) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(func, 200, event);
        };
      }

      /**
       * keyboardNav
       * @description Support keyboard navigation using the left, right, and
       *   down arrow keys.
       */
      tabLinks.forEach((tab, i) => {
        tab.addEventListener('keydown', (e) => {
          let dir;
          if (e.which === 37) {
            // Left.
            dir = i - 1;
          } else if (e.which === 39) {
            // Right.
            dir = i + 1;
          } else if (e.which === 40) {
            // Down.
            dir = 'down';
          } else {
            // Anything else.
            dir = null;
          }

          if (dir !== null) {
            e.preventDefault();
            if (dir === 'down') {
              const activePanel = TabSet.querySelector(
                '.tabs__container.is-active',
              );
              // Focus on the container.
              activePanel.focus();
            } else if (tabLinks[dir]) {
              // Activate the tab.
              goToTab(dir);
            }
          }
        });
      });

      /**
       * init
       * @description Initializes the component.
       *   Set the height for later animation.
       *   Set overflow properties.
       *   Add click listener to each tab.
       *   Add scroll listener to tab nav.
       *   Add resize listener to adjust the height when the browser is resized.
       */
      setHeight();
      setOverflow();

      tabLinks.forEach((tab, index) => {
        handleClick(tab, index);
      });

      tabNav.addEventListener('scroll', setOverflow);

      // Resize tab sets when the window is resized.
      window.addEventListener(
        'resize',
        debounce(function runSetHeight() {
          setHeight();
          setOverflow();
        }),
      );
    });
  },
};
