Drupal.behaviors.InThisSection = {
  attach(context) {
    // Selectors.
    const inThisSection = context.querySelector('.in-this-section');
    if (!inThisSection) {
      return;
    }
    const secondaryNav = context.querySelector(
      '.secondary-nav.menu-with-toggle',
    );
    const secondaryNavMenu = context.querySelector(
      '.secondary-nav__menu--level-0',
    );
    const inThisSectionNavControls = context.querySelectorAll(
      '.in-this-section__control',
    );
    const inThisSectionLinks = context.querySelectorAll(
      '.secondary-nav__link--level-0',
    );
    const inThisSectionButton = context.querySelector('.secondary-menu-toggle');
    const inThisSectionInner = context.querySelector('.in-this-section__inner');
    const controlsWidth = context.querySelector(
      '.in-this-section__control--left',
    ).offsetWidth;
    let scrollIndicatorDir;

    /**
     * getFirstVisible
     * @description Get the first item that is visible (not overflown).
     * @returns The value of the left edge of the first fully visible item plus
     * the width of the controls so that things aren't visually hidden by the
     * absolutely positioned elements.
     */
    function getFirstVisible() {
      const secondaryNavLeft = secondaryNav.getBoundingClientRect().left;
      const secondaryNavItems = secondaryNav.querySelectorAll(
        '.secondary-nav__item--level-0',
      );
      const visibleItems = [];

      secondaryNavItems.forEach((item) => {
        if (
          item.getBoundingClientRect().right >
          secondaryNavLeft + controlsWidth
        ) {
          visibleItems.push(item);
        }
      });

      return visibleItems[1].offsetLeft - controlsWidth;
    }

    /**
     * getLastHidden
     * @description Get the last item that is overflown (not visible).
     * @returns The value of the left edge of the first partially hidden item
     * minus the width of the controls so that things aren't visually hidden by
     * the absolutely positioned elements.
     */
    function getLastHidden() {
      const secondaryNavLeft = secondaryNav.getBoundingClientRect().left;
      const secondaryNavItems = secondaryNav.querySelectorAll(
        '.secondary-nav__item--level-0',
      );
      const hiddenItems = [];

      secondaryNavItems.forEach((item) => {
        if (item.getBoundingClientRect().left < secondaryNavLeft) {
          hiddenItems.push(item);
        }
      });

      // @TODO: if the user clicks the left arrow twice quickly when only the
      // first item is hidden (and before the arrow can disappear), this line
      // throws a js error. Not a huge deal, but could probably be refactored to
      // prevent it from happening.
      return hiddenItems[hiddenItems.length - 1].offsetLeft - controlsWidth;
    }

    /**
     * setOverflow
     * @description Get the positions of the in-this-section to determine whether an
     * overflow situation is in play.
     */
    function setOverflow() {
      const secondaryNavLeft = secondaryNav.getBoundingClientRect().left;
      const secondaryNavRight = secondaryNav.getBoundingClientRect().right;
      const firstSecondaryNavLeft = secondaryNav
        .querySelector('.secondary-nav__item--level-0:first-child')
        .getBoundingClientRect().left;
      const lastSecondaryNavRight = Math.floor(
        secondaryNav
          .querySelector('.secondary-nav__item--level-0:last-child')
          .getBoundingClientRect().right,
      );

      if (firstSecondaryNavLeft < secondaryNavLeft) {
        // If left side of first in-this-section is < left side of in-this-section.
        // And right side of last in-this-section is > right side of in-this-section.
        if (lastSecondaryNavRight > secondaryNavRight) {
          if (scrollIndicatorDir !== 'both') {
            scrollIndicatorDir = 'both';
            inThisSectionInner.setAttribute('data-scroll-indicator', 'both');
          }
          // If left side of first in-this-section is < left side of in-this-section.
          // But right side of last in-this-section is <= right side of in-this-section.
        } else if (scrollIndicatorDir !== 'left') {
          scrollIndicatorDir = 'left';
          inThisSectionInner.setAttribute('data-scroll-indicator', 'left');
        }
        // If left side of first in-this-section is >= left side of in-this-section.
        // And right side of last in-this-section is > right side of in-this-section.
      } else if (lastSecondaryNavRight > secondaryNavRight) {
        if (scrollIndicatorDir !== 'right') {
          scrollIndicatorDir = 'right';
          inThisSectionInner.setAttribute('data-scroll-indicator', 'right');
        }
        // If left side of first in-this-section is >= left side of in-this-section.
        // And right side of last in-this-section is <= right side of in-this-section.
      } else {
        scrollIndicatorDir = 'none';
        inThisSectionInner.setAttribute('data-scroll-indicator', 'none');
      }
    }

    /**
     * mouseNav
     * @description Support mouse navigation when horizontal scrolling occurs.
     */
    function mouseNav(direction) {
      secondaryNavMenu.scrollLeft =
        direction === 'right' ? getFirstVisible() : getLastHidden();
    }

    /**
     * ensureVisible
     * @description Ensure the focused tab is fully visible (not overflown).
     * @param {HTMLElement} item The focused item.
     */
    function ensureVisible(item) {
      const secondaryNavLeft = secondaryNav.getBoundingClientRect().left;
      const secondaryNavRight = secondaryNav.getBoundingClientRect().right;

      // if right side overflows control, set to left + control.
      if (
        Math.floor(item.getBoundingClientRect().right) >
        secondaryNavRight - controlsWidth
      ) {
        // If overflow right or both.
        if (
          inThisSectionInner.getAttribute('data-scroll-indicator') ===
            'right' ||
          inThisSectionInner.getAttribute('data-scroll-indicator') === 'both'
        ) {
          secondaryNavMenu.scrollLeft =
            item.parentElement.offsetLeft - controlsWidth;
        }
      }
      // If left side overflows control, set to left + control.
      else if (
        Math.floor(item.getBoundingClientRect().left) <
        secondaryNavLeft + controlsWidth
      ) {
        // If overflow left or both.
        if (
          inThisSectionInner.getAttribute('data-scroll-indicator') === 'left' ||
          inThisSectionInner.getAttribute('data-scroll-indicator') === 'both'
        ) {
          secondaryNavMenu.scrollLeft =
            item.parentElement.offsetLeft - controlsWidth;
        }
      }
    }

    /**
     * showAllin-this-section
     * @description remove in-this-section-overflow value.
     */
    function showAllSectionItems() {
      inThisSection.setAttribute('data-in-this-section-overflow', 'expanded');
      inThisSection.setAttribute('aria-expanded', 'true');
    }

    // Show all in-this-section on mobile.
    if (inThisSectionButton) {
      inThisSectionButton.addEventListener('click', () => {
        showAllSectionItems();
        setOverflow();
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
     * linksListeners
     * @description Support focus visualization.
     */
    inThisSectionLinks.forEach((link) => {
      link.addEventListener('focus', () => {
        ensureVisible(link);
      });
    });

    /**
     * init
     */
    setOverflow();

    inThisSectionNavControls.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();

        if (control.classList.contains('in-this-section__control--right')) {
          mouseNav('right');
        } else {
          mouseNav('left');
        }
      });
    });

    secondaryNavMenu.addEventListener('scroll', setOverflow);

    // Listen for window resize.
    window.addEventListener(
      'resize',
      debounce(function resizeListener() {
        setOverflow();
      }),
    );
  },
};
