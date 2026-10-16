(($) => {
  const filterForm = '.ys-filter-form--scaffold';
  const moreBadgeClass = 'ys-select-more';
  const overflowChoiceClass = 'ys-search-choice--overflow';

  // Read the human-readable term label from a Chosen chip, minus its remove control.
  const choiceLabel = (chip) => {
    const $clone = $(chip).clone();
    $clone.find('.search-choice-close').remove();
    return $clone.text().trim();
  };

  // In the closed (summary) state the filter row height is fixed, so keep as many
  // selected-term chips as fit on one line and collapse the remainder into an
  // accessible "+N more" badge — instead of the old "(X) items selected" count.
  // Chips are hidden from the end until the row (visible chips + badge + Chosen's
  // search input) measurably fits, so neither the layout nor the badge text
  // breaks; the open state (see SCSS) re-reveals every chip. (#1366)
  const updateChoiceSummary = (select) => {
    const $choices = $(select)
      .next('.chosen-container')
      .find('.chosen-choices');
    if (!$choices.length) {
      return;
    }

    const $chips = $choices.children('li.search-choice');
    const $searchField = $choices.children('li.search-field');
    $chips.removeClass(overflowChoiceClass);
    $choices.find(`.${moreBadgeClass}`).remove();
    if (!$chips.length) {
      return;
    }

    const total = $chips.length;
    const fits = () => $choices[0].scrollWidth <= $choices[0].clientWidth;

    // Show the largest number of leading chips that fits; always keep at least one.
    for (let visible = total; visible >= 1; visible -= 1) {
      $chips.each((index, chip) => {
        $(chip).toggleClass(overflowChoiceClass, index >= visible);
      });
      $choices.find(`.${moreBadgeClass}`).remove();

      const hidden = $chips
        .slice(visible)
        .map((i, chip) => choiceLabel(chip))
        .get();
      if (hidden.length) {
        const $badge = $('<li>', {
          class: moreBadgeClass,
          text: `+ ${hidden.length} more`,
          'aria-label': `+ ${hidden.length} more selected: ${hidden.join(
            ', ',
          )}`,
        });
        if ($searchField.length) {
          $searchField.before($badge);
        } else {
          $choices.append($badge);
        }
      }

      if (visible === 1 || fits()) {
        break;
      }
    }
  };

  // Pill remove controls: Chosen renders them as unnamed buttons with
  // tabindex -1. Name them and put them in the tab order. Re-run after every
  // Chosen rebuild, which replaces them. (#1897)
  const labelRemoveButtons = ($container) => {
    $container.find('li.search-choice').each((i, chip) => {
      $(chip)
        .find('.search-choice-close')
        .attr({
          // `!`: an attribute value, so no HTML escaping ("&" not "&amp;").
          'aria-label': Drupal.t('Remove !term', {
            '!term': choiceLabel(chip),
          }),
          tabindex: 0,
        });
    });
  };

  const updateFooter = (select, $container) => {
    const picked = select.selectedOptions.length;
    $container.find('.ys-select-count').text(
      Drupal.t('@picked of @total selected', {
        '@picked': picked,
        '@total': select.options.length,
      }),
    );
    const $clear = $container.find('.ys-select-clear');
    // Disabling the focused "Clear all" would drop focus to the page. Move
    // it to the count, not the search input: the Enter keyup that pressed
    // the button would land there and pick the highlighted row.
    if (picked === 0 && $clear.is(document.activeElement)) {
      $container.find('.ys-select-count').trigger('focus');
    }
    $clear.prop('disabled', picked === 0);
  };

  // Everything that depends on the current picks, after Chosen has finished
  // its own DOM work for the event (it removes a pill only after `change`).
  const refresh = (select) => {
    window.requestAnimationFrame(() => {
      const $container = $(select).next('.chosen-container');
      updateChoiceSummary(select);
      labelRemoveButtons($container);
      updateFooter(select, $container);
      const chosen = $(select).data('chosen');
      if (chosen && chosen.results_showing) {
        chosen.search_field.attr('placeholder', Drupal.t('Type to filter'));
        // Chosen sizes the input to its placeholder; re-measure.
        chosen.search_field_scale();
      }
    });
  };

  const unselect = (select, options) => {
    $(options).prop('selected', false);
    $(select).trigger('change').trigger('chosen:updated');
  };

  // One-time setup per Chosen instance, front-end filter selects only.
  // `chosen` comes from the `chosen:ready` payload: jQuery data is only set
  // after Chosen's constructor, which is what fires `chosen:ready`.
  const setUp = (select, chosen = $(select).data('chosen')) => {
    const $container = $(select).next('.chosen-container');
    if (
      !chosen ||
      !$container.length ||
      !once('ys-chosen-setup', select).length
    ) {
      return;
    }

    // Keep the list open while picking several terms. Chosen reads this on
    // every pick, so setting it on the instance is enough, and leaves the
    // global Chosen config (shared with the admin forms) alone.
    Object.assign(chosen, { hide_results_on_select: false });

    // Footer with the picked count and "Clear all".
    const $clear = $('<button>', {
      type: 'button',
      class: 'ys-select-clear',
      text: Drupal.t('Clear all'),
    }).on('click', () => unselect(select, select.options));
    $container.find('.chosen-drop').append(
      $('<div>', { class: 'ys-select-footer' }).append(
        $('<span>', {
          class: 'ys-select-count',
          'aria-live': 'polite',
          tabindex: -1,
        }),
        $clear,
      ),
    );

    // Chosen ignores clicks on picked rows; uncheck them here.
    $container.on('mouseup', '.chosen-results li.result-selected', (e) => {
      if (e.which !== 1) {
        return;
      }
      const item =
        chosen.results_data[e.currentTarget.dataset.optionArrayIndex];
      if (item) {
        unselect(select, select.options[item.options_index]);
        // Like Chosen after a pick: keep typing and arrow keys working.
        chosen.search_field.trigger('focus');
      }
    });

    // A click on the field head toggles the list. Chosen only does this for
    // single selects; for a multi select it neither closes on a head click
    // nor reopens from the box padding once focused. Read the state in the
    // capture phase, before Chosen's mousedown acts, and act on click, after
    // Chosen's own click handler on the pills row. The panel, the search
    // input and the remove buttons keep their own behavior.
    let closeOnClick = false;
    $container[0].addEventListener(
      'mousedown',
      (e) => {
        closeOnClick =
          chosen.results_showing &&
          !$(e.target).closest(
            '.chosen-drop, .search-choice-close, li.search-field',
          ).length;
      },
      true,
    );
    $container.on('click', (e) => {
      if (closeOnClick) {
        chosen.results_hide();
        // The mousedown on the box padding blurred the input; keep focus.
        chosen.search_field.trigger('focus');
      } else if (
        !chosen.results_showing &&
        !chosen.is_disabled &&
        !$(e.target).closest('.chosen-drop, .search-choice-close').length
      ) {
        chosen.results_show();
      }
      closeOnClick = false;
    });

    // Keyboard focus on the open panel (the scrollable results list, Clear
    // all) or a pill's remove button must not count as leaving the field:
    // Chosen's input blur would close the list and hide the focused control.
    // Leaving the whole field closes it instead. The native select is not
    // "leaving": BEF refocuses it after AJAX (handled below).
    $container.on('focusin', (e) => {
      if (chosen.results_showing && e.target !== chosen.search_field[0]) {
        Object.assign(chosen, { active_field: true });
      }
    });
    $container.on('focusout', (e) => {
      if (
        chosen.results_showing &&
        e.target !== chosen.search_field[0] &&
        e.relatedTarget !== select &&
        !$container[0].contains(e.relatedTarget)
      ) {
        chosen.close_field();
      }
    });

    // Removing a pill from the keyboard deletes the focused button. Send focus
    // to the pill now in its place, else the one before, else the search
    // input (which opens the list). Kept by position because Chosen rebuilds
    // the pills; reset when the list opens.
    let removedAt = null;
    const focusAfterRemove = () => {
      // Re-run the overflow first: a pill collapsed into "+ n more" may now
      // be visible, and hidden ones cannot take focus.
      updateChoiceSummary(select);
      const $buttons = $container
        .find('li.search-choice .search-choice-close')
        .filter(':visible');
      const $target = $buttons.length
        ? $buttons.eq(Math.min(removedAt, $buttons.length - 1))
        : chosen.search_field;
      $target.trigger('focus');
    };
    // Enter clicks a button on keydown, and Chosen may move focus to its
    // input before the keyup, where Enter would pick the highlighted row.
    // Swallow that one keyup. Any keydown resets it (Space clicks on keyup).
    let swallowEnterKeyup = false;
    $container[0].addEventListener(
      'click',
      (e) => {
        const button = e.target.closest('.search-choice-close');
        // detail 0: activated by Enter or Space, not the mouse.
        if (button && e.detail === 0) {
          swallowEnterKeyup = true;
          removedAt = $container
            .find('li.search-choice')
            .index(button.closest('li'));
          window.requestAnimationFrame(focusAfterRemove);
        }
      },
      true,
    );
    $container[0].addEventListener(
      'keydown',
      () => {
        swallowEnterKeyup = false;
      },
      true,
    );
    $container[0].addEventListener(
      'keyup',
      (e) => {
        if (swallowEnterKeyup && e.key === 'Enter') {
          e.stopPropagation();
        }
        // Chosen only handles Escape in its input; also close from a pill
        // button or the footer.
        if (
          e.key === 'Escape' &&
          chosen.results_showing &&
          e.target !== chosen.search_field[0]
        ) {
          chosen.results_hide();
          if ($(e.target).closest('.chosen-drop').length) {
            chosen.search_field.trigger('focus');
          }
        }
        swallowEnterKeyup = false;
      },
      true,
    );
    $(select).on('chosen:showing_dropdown', () => {
      removedAt = null;
    });

    // BEF auto-submit refocuses the (hidden) native select after each AJAX
    // refresh, which blurs Chosen's input. Hand focus back to the input while
    // the list is open, or to the pill after a keyboard remove.
    $(select).on('focus', () => {
      if (chosen.results_showing) {
        chosen.search_field.trigger('focus');
      } else if (removedAt !== null) {
        focusAfterRemove();
      }
    });

    // Recompute when the filter row reflows (section resize).
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => updateChoiceSummary(select)).observe(
        $container[0],
      );
    }

    refresh(select);
  };

  // Viewport resizes, once per frame, for every front-end filter select.
  let resizeQueued = false;
  $(window).on('resize.ysChosenSelect', () => {
    if (resizeQueued) {
      return;
    }
    resizeQueued = true;
    window.requestAnimationFrame(() => {
      resizeQueued = false;
      $(`${filterForm} select`).each((i, select) =>
        updateChoiceSummary(select),
      );
    });
  });

  Drupal.behaviors.chosenSelect = {
    attach(context) {
      $(once('ys-chosen-select', filterForm, context)).each((i, elem) => {
        const $select = $(elem).find('select');
        // Drupal.behaviors.chosen may run before or after this behavior, so
        // set up on `chosen:ready` and also now for any select already done.
        $select.on('chosen:ready', (e, params) =>
          setUp(e.target, params && params.chosen),
        );
        $select.each((index, select) => setUp(select));
        // Re-measure after Chosen rebuilds the pills or the list opens or
        // closes. The closed row is measured a frame after hiding, once
        // `.chosen-with-drop` is gone; while open every chip shows. (#1366)
        $select.on(
          'chosen:updated change chosen:showing_dropdown chosen:hiding_dropdown',
          (e) => refresh(e.target),
        );
      });
    },
  };
})(jQuery);
