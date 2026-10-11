/**
 * @file
 * Office Hours: picks this week's rows, marks today, and fills in the
 * Open now / Closed now line.
 *
 * Everything date-dependent is worked out on load, in the time zone the hours
 * are in (`data-office-hours-timezone`), not the visitor's. A page can be
 * served from a cache for days, so the server's own pick of rows is only the
 * first paint: an exception dated in the next seven days replaces its
 * weekday's row, and the next three after that are "Upcoming changes". The
 * status container stays hidden until it is computed, so there is never a
 * wrong status on first paint, and never one at all without JavaScript.
 *
 * Weekly rows carry `data-weekday` (0 = Sunday), `data-hours`
 * ("1000-1300,1400-2000", "all-day", or empty when closed) and, for an
 * exception, `data-date` (Y-m-d) and `data-exception` with its label.
 * Upcoming rows carry `data-date`.
 */
Drupal.behaviors.officeHours = {
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],

  /**
   * Formats a 24-hour HHMM integer the platform way: "10 a.m.", "5:30 p.m.".
   *
   * @param {number} value - The time, e.g. 1730.
   *
   * @return {string} The formatted time.
   */
  formatTime(value) {
    const hour = Math.floor(value / 100) % 24;
    const minute = value % 100;
    const clock = hour % 12 === 0 ? 12 : hour % 12;
    const minutes = minute ? `:${String(minute).padStart(2, '0')}` : '';
    return `${clock}${minutes} ${hour < 12 ? 'a.m.' : 'p.m.'}`;
  },

  /**
   * Parses a row's `data-hours` value into [start, end] pairs.
   *
   * An end of 0 is midnight (2400). An end before its start is a slot that
   * runs past midnight into the next day, as contrib stores it; it is kept
   * as-is and handled by computeStatus().
   *
   * @param {string} value - The attribute value.
   *
   * @return {Array<Array<number>>} The slots, in order.
   */
  parseHours(value) {
    if (value === 'all-day') {
      return [[0, 2400]];
    }
    return (value || '')
      .split(',')
      .filter(Boolean)
      .map((slot) => {
        const [start, end] = slot.split('-').map(Number);
        return [start, end === 0 ? 2400 : end];
      });
  },

  /**
   * Returns the date, weekday and HHMM time of a moment in a time zone.
   *
   * @param {Date} date - The moment.
   * @param {string} [timeZone] - IANA zone; the browser's own when omitted.
   *
   * @return {{date: string, weekday: number, time: number}} Local values.
   */
  localNow(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(date);
    const part = (type) => parts.find((p) => p.type === type).value;
    return {
      date: `${part('year')}-${part('month')}-${part('day')}`,
      weekday: this.dayNames.indexOf(part('weekday')),
      time: (Number(part('hour')) % 24) * 100 + Number(part('minute')),
    };
  },

  /**
   * Adds days to a Y-m-d date.
   *
   * @param {string} date - The date.
   * @param {number} days - Days to add; may be negative.
   *
   * @return {string} The new Y-m-d date.
   */
  addDays(date, days) {
    const moment = new Date(`${date}T12:00:00Z`);
    moment.setUTCDate(moment.getUTCDate() + days);
    return moment.toISOString().slice(0, 10);
  },

  /**
   * Decides which rows show for the week that starts today.
   *
   * @param {Array<{weekday: ?number, date: ?string, upcoming: boolean}>} rows
   *   Weekly rows (regular, or dated exceptions) and upcoming rows, upcoming
   *   rows in date order.
   * @param {string} today - Today's Y-m-d date in the site time zone.
   *
   * @return {Array<boolean>} Whether each row shows.
   */
  visibleRows(rows, today) {
    const weekEnd = this.addDays(today, 7);
    const inWeek = (date) => date >= today && date < weekEnd;
    const replaced = rows
      .filter((row) => !row.upcoming && row.date && inWeek(row.date))
      .map((row) => row.weekday);
    let upcoming = 0;
    return rows.map((row) => {
      if (row.upcoming) {
        const show = row.date >= weekEnd && upcoming < 3;
        upcoming += show ? 1 : 0;
        return show;
      }
      return row.date ? inWeek(row.date) : !replaced.includes(row.weekday);
    });
  },

  /**
   * Works out the status line from the week's rows and the current moment.
   *
   * @param {Object<number, {slots: Array, allDay: boolean, exception: ?string}>} days
   *   This week, keyed by weekday. A weekday with no entry has no hours.
   * @param {{weekday: number, time: number}} now - The local weekday and time.
   * @param {?{slots: Array}} [yesterday] - Yesterday's hours, for a slot that
   *   ran past midnight. Defaults to the row for yesterday's weekday.
   *
   * @return {?{open: boolean, detail: string}} The status, or null when the
   *   week has no hours at all.
   */
  computeStatus(days, now, yesterday) {
    const empty = { slots: [], allDay: false, exception: null };
    const day = (weekday) => days[weekday] || empty;
    const today = day(now.weekday);
    const overnight = ([start, end]) => end < start;

    if (!Object.keys(days).some((key) => days[key].slots.length)) {
      return null;
    }

    // Still inside yesterday's slot that ran past midnight.
    const carried = (yesterday || day((now.weekday + 6) % 7)).slots.find(
      (slot) => overnight(slot) && now.time < slot[1],
    );
    if (carried) {
      return { open: true, detail: `Closes at ${this.formatTime(carried[1])}` };
    }

    const current = today.slots.find(
      ([start, end]) =>
        start <= now.time && (overnight([start, end]) || now.time < end),
    );
    if (current) {
      return {
        open: true,
        detail: today.allDay
          ? 'Open all day'
          : `Closes at ${this.formatTime(current[1])}`,
      };
    }

    const later = today.slots.find(([start]) => start > now.time);
    if (later) {
      return { open: false, detail: `Opens at ${this.formatTime(later[0])}` };
    }

    // "Tomorrow" only follows a day that had hours; after a closed day the
    // spec names the day: "Closed today · Opens Tuesday at 10 a.m.".
    const sayTomorrow = today.slots.length > 0;
    let detail = '';
    for (let offset = 1; offset <= 7 && !detail; offset += 1) {
      const weekday = (now.weekday + offset) % 7;
      const next = day(weekday);
      if (next.slots.length) {
        const tomorrow = offset === 1 && sayTomorrow;
        const when = tomorrow ? 'tomorrow' : this.dayNames[weekday];
        detail = next.allDay
          ? `Open all day ${tomorrow ? when : `on ${when}`}`
          : `Opens ${when} at ${this.formatTime(next.slots[0][0])}`;
      }
    }

    if (!today.slots.length) {
      const closed = today.exception
        ? `Closed today for ${today.exception}`
        : 'Closed today';
      detail = `${closed} · ${detail}`;
    }
    return { open: false, detail };
  },

  attach(context) {
    context.querySelectorAll('.office-hours').forEach((block) => {
      const now = this.localNow(
        new Date(),
        block.getAttribute('data-office-hours-timezone'),
      );
      const hoursOf = (row) => {
        const hours = row.getAttribute('data-hours');
        return {
          slots: this.parseHours(hours),
          allDay: hours === 'all-day',
          exception: row.getAttribute('data-exception'),
        };
      };

      // Re-pick this week's rows and the upcoming three.
      const rows = Array.from(
        block.querySelectorAll('tr[data-weekday], tr[data-date]'),
      );
      const upcomingTable = block.querySelector(
        '.office-hours__table--upcoming',
      );
      this.visibleRows(
        rows.map((row) => ({
          weekday: Number(row.getAttribute('data-weekday')),
          date: row.getAttribute('data-date'),
          upcoming: upcomingTable ? upcomingTable.contains(row) : false,
        })),
        now.date,
      ).forEach((show, index) => {
        rows[index].hidden = !show;
      });
      if (upcomingTable) {
        const shown = !!upcomingTable.querySelector('tr:not([hidden])');
        const heading = block.querySelector('.office-hours__upcoming-heading');
        upcomingTable.hidden = !shown;
        heading.hidden = !shown;
      }

      const weekRows = rows.filter((row) => row.hasAttribute('data-weekday'));
      const days = {};
      weekRows.forEach((row) => {
        const weekday = Number(row.getAttribute('data-weekday'));
        if (!row.hidden) {
          days[weekday] = hoursOf(row);
        }
        this.markToday(row, !row.hidden && weekday === now.weekday);
      });

      // Yesterday is outside the week shown, so read its own date.
      const yesterdayDate = this.addDays(now.date, -1);
      const yesterdayRow =
        weekRows.find(
          (row) => row.getAttribute('data-date') === yesterdayDate,
        ) ||
        weekRows.find(
          (row) =>
            !row.hasAttribute('data-date') &&
            Number(row.getAttribute('data-weekday')) === (now.weekday + 6) % 7,
        );

      const status = block.querySelector('.office-hours__status');
      const result =
        status &&
        this.computeStatus(
          days,
          now,
          yesterdayRow ? hoursOf(yesterdayRow) : { slots: [] },
        );
      if (result) {
        status.setAttribute('data-state', result.open ? 'open' : 'closed');
        status.querySelector('.office-hours__pill-label').textContent =
          result.open ? 'Open now' : 'Closed now';
        status.querySelector('.office-hours__status-detail').textContent =
          result.detail;
        status.hidden = false;
      }
    });
  },

  /**
   * Marks or unmarks a row as today. The server marks today too, but a cached
   * page can be from another day.
   *
   * @param {HTMLTableRowElement} row - A weekly row.
   * @param {boolean} isToday - Whether the row is today.
   */
  markToday(row, isToday) {
    const header = row.querySelector('th');
    let tag = row.querySelector('.office-hours__today');
    row.classList.toggle('office-hours__row--today', isToday);
    if (isToday) {
      header.setAttribute('aria-current', 'date');
      if (!tag) {
        tag = document.createElement('span');
        tag.className = 'office-hours__today';
        tag.textContent = 'Today';
        header.appendChild(tag);
      }
    } else {
      header.removeAttribute('aria-current');
      if (tag) {
        tag.remove();
      }
    }
  },
};
