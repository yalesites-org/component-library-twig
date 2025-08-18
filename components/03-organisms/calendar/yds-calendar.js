import MicroModal from 'micromodal';

Drupal.behaviors.eventsCalendar = {
  attach(context) {
    // Classes and selectors
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

    // Query elements
    const calendars = context.querySelectorAll(calendar);
    const eventsToggle = context.querySelectorAll(eventToggle);

    // Environment check
    const isStorybook = !(context.querySelector(storybook) === null);

    // Media query for responsive behavior
    const mql = window.matchMedia(`(min-width: 1200px )`);

    // Temporary div for HTML parsing
    const tempDiv = document.createElement('div');

    // Initialize MicroModal
    MicroModal.init();

    // Debounce utility
    const debounce = (fn, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
      };
    };

    // Setup search handling for calendar forms
    const setupSearchHandling = () => {
      const forms = context.querySelectorAll('form');

      forms.forEach((form) => {
        const isCalendarFilterForm =
          form.matches(
            '#event-calendar-filter-form, form#event-calendar-filter-form, form.ys-filter-form',
          ) || !!form.querySelector('.ys-filter-form');

        if (
          !isCalendarFilterForm ||
          form.dataset.ysCalendarSearchDebounced === 'true'
        ) {
          return;
        }

        const triggerSearchIfReady = (input) => {
          const value = (input.value || '').trim();
          if (
            !window.YS_CALENDAR_NAV_IN_PROGRESS &&
            (value.length === 0 || value.length >= 3)
          ) {
            input.dispatchEvent(
              new Event('ys-calendar-search', { bubbles: true }),
            );
          }
        };

        const debouncedHandler = debounce((ev) => {
          if (ev.target?.matches?.('.ys-events-search-input')) {
            triggerSearchIfReady(ev.target);
          }
        }, 250);

        // Attach event listeners
        form.addEventListener('input', debouncedHandler, true);
        form.addEventListener(
          'search',
          (ev) => {
            if (ev.target?.matches?.('.ys-events-search-input')) {
              triggerSearchIfReady(ev.target);
            }
          },
          true,
        );

        // Initial trigger for existing search value
        const existingSearchInput = form.querySelector(
          '.ys-events-search-input',
        );
        if (existingSearchInput) {
          triggerSearchIfReady(existingSearchInput);
        }

        // eslint-disable-next-line no-param-reassign
        form.dataset.ysCalendarSearchDebounced = 'true';
      });
    };

    setupSearchHandling();

    // Process each calendar
    calendars.forEach((calendarElement) => {
      const moreEventsContainer = calendarElement.querySelector(modalContent);
      const modalTitle = calendarElement.querySelector(modalTitleSelector);
      const desktopNavElement = calendarElement.querySelector(desktopNav);

      if (!desktopNavElement) return;

      const prevBtn = desktopNavElement.querySelector(prevButton);
      const nextBtn = desktopNavElement.querySelector(nextButton);
      const calendarEventsElements =
        calendarElement.querySelectorAll(dayEvents);
      const calendarNoEvents = calendarElement.querySelector(noEvents);

      // Utility functions
      const getNearestForm = () =>
        calendarElement.closest('form') ||
        document.querySelector('form.ys-filter-form');

      const handleNoMonthEvents = () => {
        if (!calendarEventsElements.length) {
          calendarNoEvents?.classList.add(visibleClass);
        }
      };

      // Prevent form submission from nav buttons
      const installFormSubmitGuard = () => {
        const form = getNearestForm();
        if (!form || form.dataset.ysCalendarSubmitGuardInstalled === 'true')
          return;

        form.addEventListener(
          'submit',
          (ev) => {
            const activeEl = document.activeElement;
            if (activeEl?.closest?.('.calendar__nav-btn')) {
              ev.preventDefault();
              ev.stopImmediatePropagation?.();
              ev.stopPropagation?.();
            }
          },
          true,
        );

        // eslint-disable-next-line no-param-reassign
        form.dataset.ysCalendarSubmitGuardInstalled = 'true';
      };

      installFormSubmitGuard();

      // Handle "More events" modal
      eventsToggle.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          const dayElement = toggle.closest(day);
          const dayEventElements = dayElement.querySelectorAll(event);

          // Set modal title
          tempDiv.innerHTML = dayElement.querySelector(dialogTitle).innerHTML;
          modalTitle.innerHTML = tempDiv.textContent || tempDiv.innerText;

          // Clear and populate modal content
          moreEventsContainer.innerHTML = '';
          dayEventElements.forEach((eventElement) => {
            const clonedEvent = eventElement.cloneNode(true);
            clonedEvent.classList.add(`${eventClass}--modal`);
            moreEventsContainer.appendChild(clonedEvent);
          });
        });
      });

      // Calendar wrapper finder
      const getCalendarWrapper = (element) =>
        element?.closest?.(
          '#event-calendar-wrapper-static, [id^="event-calendar-wrapper"], [id^="calendar-wrapper"]',
        );

      // Form field readers with robust name handling
      const createFieldReaders = (form) => {
        const queryByNames = (base, isMultiple = false) => {
          const selectors = [
            `[name="${base}${isMultiple ? '[]' : ''}"]`,
            `[name="filters_container[${base}]${isMultiple ? '[]' : ''}"]`,
          ];
          return isMultiple
            ? form.querySelectorAll(selectors.join(','))
            : form.querySelector(selectors.join(','));
        };

        return {
          readMulti: (name) =>
            Array.from(queryByNames(name, true)).flatMap((select) =>
              Array.from(select.options || [])
                .filter((option) => option.selected)
                .map((option) => option.value),
            ),

          readSingle: (name) => queryByNames(name)?.value || '',

          setHidden: (name, value) => {
            let hiddenField = form.querySelector(`[name="${name}"]`);
            if (!hiddenField) {
              hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = name;
              form.appendChild(hiddenField);
            }
            hiddenField.value = value;
          },
        };
      };

      // AJAX calendar refresh
      const refreshCalendarData = (wrapper, button) => {
        if (isStorybook || !wrapper) return;

        // Prevent search interference
        window.YS_CALENDAR_NAV_IN_PROGRESS = true;
        setTimeout(() => {
          window.YS_CALENDAR_NAV_IN_PROGRESS = false;
        }, 300);

        const form =
          wrapper.closest('form') ||
          document.querySelector('form.ys-filter-form');
        const submitData = {
          calendar_id: `#${wrapper.id}`,
          month: button.dataset.month,
          year: button.dataset.year,
          calendar_month: button.dataset.month,
          calendar_year: button.dataset.year,
        };

        if (form) {
          const { readMulti, readSingle, setHidden } = createFieldReaders(form);

          // Update hidden fields for month persistence
          setHidden('calendar_month', button.dataset.month);
          setHidden('calendar_year', button.dataset.year);

          // Read all filter values
          submitData.category_included_terms = JSON.stringify(
            readMulti('category_included_terms'),
          );
          submitData.audience_included_terms = JSON.stringify(
            readMulti('audience_included_terms'),
          );
          submitData.custom_vocab_included_terms = JSON.stringify(
            readMulti('custom_vocab_included_terms'),
          );
          submitData.terms_include = readSingle('terms_include');
          submitData.terms_exclude = readSingle('terms_exclude');
          submitData.term_operator = readSingle('term_operator') || '+';
          submitData.event_time_period =
            readSingle('event_time_period') || 'all';
          submitData.search = readSingle('search');
        }

        // Execute AJAX request
        Drupal.ajax({
          url: '/events-calendar',
          submit: submitData,
          progress: { type: 'fullscreen' },
        }).execute();
      };

      // Navigation event handler
      const handleNavigation = (navEvent, button) => {
        navEvent.preventDefault();
        navEvent.stopImmediatePropagation?.();
        navEvent.stopPropagation?.();

        const wrapper = getCalendarWrapper(button);
        refreshCalendarData(wrapper, button);
        return false;
      };

      // Setup navigation
      const setupNavigation = () => {
        // Ensure buttons don't submit forms
        [prevBtn, nextBtn].forEach((btn) => {
          if (btn) btn.setAttribute('type', 'button');
        });

        // Click handlers
        prevBtn?.addEventListener(
          'click',
          (e) => handleNavigation(e, prevBtn),
          { capture: true },
        );
        nextBtn?.addEventListener(
          'click',
          (e) => handleNavigation(e, nextBtn),
          { capture: true },
        );

        // Keyboard support
        [prevBtn, nextBtn].forEach((btn) => {
          btn?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavigation(e, btn);
            }
          });
        });
      };

      setupNavigation();

      // Responsive behavior
      if (!mql.matches) {
        handleNoMonthEvents();
      }

      mql.addEventListener('change', () => {
        if (mql.matches) {
          calendarNoEvents?.classList.remove(visibleClass);
        } else {
          handleNoMonthEvents();
          MicroModal.close();
        }
      });
    });
  },
};
