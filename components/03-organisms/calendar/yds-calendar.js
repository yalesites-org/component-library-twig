import MicroModal from 'micromodal';

Drupal.behaviors.eventsCalendar = {
  attach(context) {
    // Classes
    const calendar = '.calendar';
    const event = '.calendar-event';
    const eventClass = 'calendar-event';
    const activeClass = 'is-active';
    const visibleClass = 'is-visible';
    const disabledClass = 'calendar__day--disabled';
    const day = '.calendar__day';
    const todaySelector = '.calendar__day--today';
    const week = '.calendar__week';
    const weekDays = '.calendar__weekdays';
    const modalContent = '.modal__calendar-events';
    const modalTitleSelector = '.modal__title';
    const eventToggle = '.calendar-event__toggle';
    const mobileEvents = '.calendar__mobile-events';
    const dayEventsContainer = '.calendar__day-events';
    const prevButton = '.calendar__nav-btn--prev';
    const nextButton = '.calendar__nav-btn--next';
    const mobileNav = '.calendar__nav--mobile';
    const desktopNav = '.calendar__nav--desktop';

    // Selectors.
    const calendars = context.querySelectorAll(calendar);
    const eventsToggle = context.querySelectorAll(eventToggle);

    // Create a MediaQueryList.
    const mql = window.matchMedia(`(min-width: 1200px )`);

    // Create a temporary div element to parse the HTML content.
    const tempDiv = document.createElement('div');

    // Initialize MicroModal.
    MicroModal.init();

    calendars.forEach((c) => {
      const calendarDays = c.querySelectorAll(day);
      const calendarWeeks = c.querySelectorAll(week);
      const calendarDayNames = c.querySelector(weekDays).querySelectorAll('li');
      const moreEventsContainer = c.querySelector(modalContent);
      const modalTitle = c.querySelector(modalTitleSelector);
      const mobileEventsContainer = c.querySelector(mobileEvents);
      const today = c.querySelector(todaySelector);
      const mobileCalendarPrevBtn = c
        .querySelector(mobileNav)
        .querySelector(prevButton);
      const mobileCalendarNextBtn = c
        .querySelector(mobileNav)
        .querySelector(nextButton);
      const desktopCalendarPrevBtn = c
        .querySelector(desktopNav)
        .querySelector(prevButton);
      const desktopCalendarNextBtn = c
        .querySelector(desktopNav)
        .querySelector(nextButton);
      let activeDayIndex = 0;

      // Handle the 'More events' button click.
      eventsToggle.forEach((el) => {
        el.addEventListener('click', () => {
          const thisDay = el.closest(day);
          const thisEvents = thisDay.querySelectorAll(event);

          // Set the innerHTML of the temporary div to the innerHTML content of the active date time.
          tempDiv.innerHTML = thisDay.querySelector('time').innerHTML;
          // Clear previous content.
          moreEventsContainer.innerHTML = '';
          modalTitle.innerHTML = '';
          modalTitle.innerHTML = tempDiv.textContent || tempDiv.innerText;
          thisEvents.forEach((e) => {
            const clonedEvent = e.cloneNode(true);
            clonedEvent.classList.add(`${eventClass}--modal`);
            moreEventsContainer.appendChild(clonedEvent);
          });
        });
      });

      // Handle day click on mobile.
      function handleDayClick(e) {
        const thisDay = e.currentTarget;
        const thisWeekDays = thisDay
          .closest(week)
          .querySelectorAll('.calendar__day');

        // Only apply functionality for the current month, non-disabled days.
        if (thisDay.classList.contains(disabledClass)) {
          return;
        }

        // Only apply functionality for screens below 992px.
        if (mql.matches) return;

        // Reset tabindex and remove is-active class from all days.
        calendarDays.forEach((d) => {
          d.setAttribute('tabindex', -1);
          d.classList.remove(activeClass);
        });

        // Reset active class for the calendar day names.
        calendarDayNames.forEach((d) => {
          d.classList.remove(activeClass);
        });
        // Get the active day index.
        thisWeekDays.forEach((d, i) => {
          if (d === thisDay) {
            activeDayIndex = i;
          }
        });
        // Set the active class to the clicked day and to the corresponding day name item.
        calendarDayNames[activeDayIndex].classList.add(activeClass);
        thisDay.setAttribute('tabindex', 0);
        thisDay.classList.add(activeClass);

        // Clone events and add them to the mobile event's container.
        const dayEvents = thisDay.querySelector(dayEventsContainer);
        if (dayEvents) {
          const thisEvents = dayEvents.querySelectorAll(event);
          mobileEventsContainer.innerHTML = ''; // Clear previous events
          thisEvents.forEach((ev) => {
            const clonedEvent = ev.cloneNode(true);
            clonedEvent.classList.add(`${eventClass}--mobile`);
            mobileEventsContainer.appendChild(clonedEvent);
          });
        } else {
          mobileEventsContainer.innerHTML = `<li>No events</li>`;
        }
      }
      // Get the first list item that doesn't have the disabledClass.
      const getFirstNonDisabledItem = (ul) => {
        for (let i = 0; i < ul.length; i += 1) {
          if (!ul[i].classList.contains(disabledClass)) {
            return ul[i];
          }
        }
        return null;
      };

      // Set visible week by the index. Set active the first day of the visible week.
      const showWeek = (index) => {
        calendarWeeks.forEach((item, i) => {
          if (i === index) {
            item.classList.add(visibleClass);
            const firstNonDisabledItem = getFirstNonDisabledItem(
              item.querySelectorAll(day),
            );
            // Trigger click event on the first enabled day of the visible week.
            if (firstNonDisabledItem) {
              firstNonDisabledItem.click();
            }
          } else {
            item.classList.remove(visibleClass);
          }
        });
      };

      // Helper function to find the closest calendar-wrapper with an ID that starts with 'calendar-wrapper'.
      const getCalendarWrapper = (clickEvent) =>
        clickEvent.target.closest('[id^="calendar-wrapper"]');

      // Function to refresh the calendar data via AJAX based on the given button (prev/next) and calendarWrapper.
      const refreshCalendarData = (calendarWrapper, button) => {
        if (!calendarWrapper) return; // If no calendarWrapper found, exit the function.

        // Use Drupal's AJAX system to refresh the calendar data.
        Drupal.ajax({
          url: '/events-calendar',
          submit: {
            calendar_id: `#${calendarWrapper.id}`, // Pass the calendar wrapper ID.
            month: button.dataset.month, // Pass the selected month from the button.
            year: button.dataset.year, // Pass the selected year from the button.
          },
          progress: { type: 'fullscreen' }, // Show a fullscreen progress indicator during the refresh.
        }).execute();
      };

      // Handle calendar navigation.
      const handleMobileCalendarNavigation = () => {
        const getVisibleWeekIndex = () =>
          Array.from(calendarWeeks).findIndex((item) =>
            item.classList.contains('is-visible'),
          );
        mobileCalendarPrevBtn.addEventListener('click', (clickEvent) => {
          const currentIndex = getVisibleWeekIndex();
          if (currentIndex > 0) {
            showWeek(currentIndex - 1);
          } else {
            const calendarWrapper = getCalendarWrapper(clickEvent);
            refreshCalendarData(calendarWrapper, mobileCalendarPrevBtn);
          }
        });

        mobileCalendarNextBtn.addEventListener('click', (clickEvent) => {
          const currentIndex = getVisibleWeekIndex();
          if (currentIndex < calendarWeeks.length - 1) {
            showWeek(currentIndex + 1);
          } else {
            const calendarWrapper = getCalendarWrapper(clickEvent);
            refreshCalendarData(calendarWrapper, mobileCalendarNextBtn);
          }
        });
      };

      const handleDesktopCalendarNavigation = () => {
        desktopCalendarPrevBtn.addEventListener('click', (clickEvent) => {
          const calendarWrapper = getCalendarWrapper(clickEvent);
          refreshCalendarData(calendarWrapper, desktopCalendarPrevBtn);
        });

        desktopCalendarNextBtn.addEventListener('click', (clickEvent) => {
          const calendarWrapper = getCalendarWrapper(clickEvent);
          refreshCalendarData(calendarWrapper, desktopCalendarNextBtn);
        });
      };

      calendarDays.forEach((d) => {
        d.addEventListener('click', handleDayClick);
      });
      handleMobileCalendarNavigation();
      handleDesktopCalendarNavigation();

      // On mobile make the current week the visible week by default.
      if (today) {
        today.closest(week).classList.add(visibleClass);
        today.click();
      } else {
        showWeek(0);
      }

      // Handle dynamic resizing.
      window.addEventListener('resize', () => {
        if (mql.matches) {
          // Clear mobile events container when resizing above 992px.
          mobileEventsContainer.innerHTML = '';
        }
      });

      mql.addEventListener('change', () => {
        if (mql.matches) {
          // Clear mobile events container when resizing above 992px.
          mobileEventsContainer.innerHTML = '';
        } else {
          // Show the first month's week on mobile when changing to mobile media query.
          showWeek(0);
          MicroModal.close();
        }
      });
    });
  },
};
