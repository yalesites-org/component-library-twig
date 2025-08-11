import MicroModal from 'micromodal';

Drupal.behaviors.eventsCalendar = {
  attach(context) {
    // Classes
    const calendar = '.calendar';
    const event = '.calendar-event';
    const eventClass = 'calendar-event';
    const visibleClass = 'is-visible';
    const day = '.calendar__day';
    const modalContent = '.modal__calendar-events';
    const modalTitleSelector = '.modal__title';
    const eventToggle = '.calendar-event__toggle';
    const prevButton = '.calendar__nav-btn--prev';
    const nextButton = '.calendar__nav-btn--next';
    const desktopNav = '.calendar__nav--desktop';
    const dialogTitle = '.calendar__dialog-title';
    const dayEvents = '.calendar__day--events';
    const noEvents = '.calendar__no-events-message';
    const storybook = '.sb-show-main';

    // Selectors.
    const calendars = context.querySelectorAll(calendar);
    const eventsToggle = context.querySelectorAll(eventToggle);

    // Determines if we're in storybook (no drupal endpoints)
    const isStorybook = !(context.querySelector(storybook) === null);

    // Create a MediaQueryList.
    const mql = window.matchMedia(`(min-width: 1200px )`);

    // Create a temporary div element to parse the HTML content.
    const tempDiv = document.createElement('div');

    // Initialize MicroModal.
    MicroModal.init();

    calendars.forEach((c) => {
      const moreEventsContainer = c.querySelector(modalContent);
      const modalTitle = c.querySelector(modalTitleSelector);
      const desktopCalendarPrevBtn = c
        .querySelector(desktopNav)
        .querySelector(prevButton);
      const desktopCalendarNextBtn = c
        .querySelector(desktopNav)
        .querySelector(nextButton);
      const calendarEvents = c.querySelectorAll(dayEvents);
      const calendarNoEvents = c.querySelector(noEvents);
      const getNearestFilterForm = () =>
        c.closest('form') || document.querySelector('form.ys-filter-form');
      const handleNoMonthEvents = () => {
        // If there are no events in the current month, show the 'No Events' text on mobile.
        if (!calendarEvents.length) {
          calendarNoEvents.classList.add(visibleClass);
        }
      };
      // Intercept unintended submits on the nearest filter form when navigating.
      const installFormSubmitGuard = () => {
        const form = getNearestFilterForm();
        if (!form || form.dataset.ysCalendarSubmitGuardInstalled === 'true')
          return;
        form.addEventListener(
          'submit',
          (ev) => {
            const activeEl = document.activeElement;
            if (
              activeEl &&
              activeEl.closest &&
              activeEl.closest('.calendar__nav-btn')
            ) {
              ev.preventDefault();
              if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
              if (ev.stopPropagation) ev.stopPropagation();
            }
          },
          true, // capture phase to beat other submit handlers
        );
        form.dataset.ysCalendarSubmitGuardInstalled = 'true';
      };
      installFormSubmitGuard();

      // Handle the 'More events' button click.
      eventsToggle.forEach((el) => {
        el.addEventListener('click', () => {
          const thisDay = el.closest(day);
          const thisEvents = thisDay.querySelectorAll(event);

          // Set the innerHTML of the temporary div to the innerHTML content of the active date time.
          tempDiv.innerHTML = thisDay.querySelector(dialogTitle).innerHTML;
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

      // Helper function to find the closest calendar wrapper element from a node.
      const getCalendarWrapperFromEl = (el) =>
        el &&
        el.closest &&
        el.closest(
          '#event-calendar-wrapper-static, [id^="event-calendar-wrapper"], [id^="calendar-wrapper"]',
        );

      // Function to refresh the calendar data via AJAX based on the given button (prev/next) and calendarWrapper.
      const refreshCalendarData = (calendarWrapper, button) => {
        if (isStorybook) return; // If we're in storybook, we don't have access to /events-calendar
        if (!calendarWrapper) return; // If no calendarWrapper found, exit the function.

        // Try to find the exposed filter form near the calendar; fallback to first matching filter form.
        const form =
          calendarWrapper.closest('form') ||
          document.querySelector('form.ys-filter-form');

        const submitData = {
          calendar_id: `#${calendarWrapper.id}`,
          month: button.dataset.month,
          year: button.dataset.year,
        };

        if (form) {
          // Ensure hidden fields on the form reflect the navigated month/year so
          // subsequent filter submissions stay on the same month.
          const setHidden = (name, value) => {
            let el = form.querySelector(`[name="${name}"]`);
            if (!el) {
              el = document.createElement('input');
              el.type = 'hidden';
              el.name = name;
              form.appendChild(el);
            }
            el.value = value;
          };
          setHidden('calendar_month', button.dataset.month);
          setHidden('calendar_year', button.dataset.year);

          // Helper to read multi-select values.
          const readMulti = (name) =>
            Array.from(
              form.querySelectorAll(`[name="${name}[]"] option:checked`),
            ).map((o) => o.value);
          // Helper to read hidden/single values.
          const readSingle = (name) => {
            const el = form.querySelector(`[name="${name}"]`);
            return el ? el.value : undefined;
          };

          const cat = readMulti('category_included_terms');
          const aud = readMulti('audience_included_terms');
          const cv = readMulti('custom_vocab_included_terms');

          // Encode arrays as JSON strings to avoid non-scalar input rejection.
          submitData.category_included_terms = JSON.stringify(cat);
          submitData.audience_included_terms = JSON.stringify(aud);
          submitData.custom_vocab_included_terms = JSON.stringify(cv);

          // Hidden singles can be posted as-is; if they become arrays, encode similarly.
          submitData.terms_include = readSingle('terms_include') ?? '';
          submitData.terms_exclude = readSingle('terms_exclude') ?? '';
          submitData.term_operator = readSingle('term_operator') || '+';
          // Also submit navigated month/year for completeness.
          submitData.calendar_month = readSingle('calendar_month');
          submitData.calendar_year = readSingle('calendar_year');
        }

        // Use Drupal's AJAX system to refresh the calendar data.
        Drupal.ajax({
          url: '/events-calendar',
          submit: submitData,
          progress: { type: 'fullscreen' },
        }).execute();
      };

      const preventAndNavigate = (ev, btn) => {
        // Block default navigation and other handlers that may submit/follow links.
        ev.preventDefault();
        if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        if (ev.stopPropagation) ev.stopPropagation();
        const wrapper = getCalendarWrapperFromEl(btn);
        refreshCalendarData(wrapper, btn);
        return false;
      };

      const handleDesktopCalendarNavigation = () => {
        // Ensure buttons do not submit the surrounding form.
        if (desktopCalendarPrevBtn)
          desktopCalendarPrevBtn.setAttribute('type', 'button');
        if (desktopCalendarNextBtn)
          desktopCalendarNextBtn.setAttribute('type', 'button');

        if (desktopCalendarPrevBtn) {
          desktopCalendarPrevBtn.addEventListener(
            'click',
            (clickEvent) =>
              preventAndNavigate(clickEvent, desktopCalendarPrevBtn),
            { capture: true },
          );
          // Keyboard support without form submission.
          desktopCalendarPrevBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              preventAndNavigate(e, desktopCalendarPrevBtn);
            }
          });
        }
        if (desktopCalendarNextBtn) {
          desktopCalendarNextBtn.addEventListener(
            'click',
            (clickEvent) =>
              preventAndNavigate(clickEvent, desktopCalendarNextBtn),
            { capture: true },
          );
          // Keyboard support without form submission.
          desktopCalendarNextBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              preventAndNavigate(e, desktopCalendarNextBtn);
            }
          });
        }
      };
      handleDesktopCalendarNavigation();
      if (!mql.matches) {
        handleNoMonthEvents();
      }
      mql.addEventListener('change', () => {
        if (mql.matches) {
          calendarNoEvents.classList.remove(visibleClass);
        } else {
          handleNoMonthEvents();
          MicroModal.close();
        }
      });
    });
  },
};
