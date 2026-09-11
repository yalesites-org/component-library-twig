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
          text: `+${hidden.length} more`,
          'aria-label': `+${hidden.length} more selected: ${hidden.join(', ')}`,
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

  Drupal.behaviors.chosenSelect = {
    attach(context) {
      $(once('ys-chosen-select', filterForm, context)).each((i, elem) => {
        const $select = $(elem).find('select');
        $select.on('chosen:ready', (e) => {
          updateChoiceSummary(e.target);
          // Recompute when the filter row reflows (section resize, viewport change).
          const container = $(e.target).next('.chosen-container')[0];
          if (
            container &&
            typeof ResizeObserver !== 'undefined' &&
            !container.dataset.ysObserved
          ) {
            container.dataset.ysObserved = 'true';
            new ResizeObserver(() => updateChoiceSummary(e.target)).observe(
              container,
            );
          }
        });
        $select.on('chosen:updated change', (e) =>
          updateChoiceSummary(e.target),
        );
        // Recompute against the closed single-line layout once the dropdown
        // hides. While the dropdown is open the chip row wraps (overflow
        // visible), so the fit test always passes and no chip is collapsed;
        // removing a truncated term therefore can only be re-measured after the
        // row returns to its closed state. Defer a frame so Chosen has dropped
        // `.chosen-with-drop` and the closed layout has applied. (#1366)
        $select.on('chosen:hiding_dropdown', (e) => {
          const { target } = e;
          window.requestAnimationFrame(() => updateChoiceSummary(target));
        });
      });
    },
  };
})(jQuery);
