(($) => {
  const filterForm = '.ys-filter-form--scaffold';
  const selectMessageClass = 'ys-select-message';

  Drupal.behaviors.chosenSelect = {
    attach(context) {
      $(once('ys-chosen-select', filterForm, context)).each(function () {
        const $form = $(this);
        const $select = $form.find('select');
        $select.on('chosen:ready', function () {
          $(this)
            .next()
            .find('.chosen-choices')
            .prepend(`<span class=${selectMessageClass}></span>`);
        });

        $select.on('change', function () {
          const $this = $(this);
          const selectedNr = $this.val().length;
          const selectMessage = selectedNr
            ? `${`(${selectedNr}) items selected`}`
            : '';

          $this
            .next()
            .find(`${`.${selectMessageClass}`}`)
            .text(selectMessage);
        });
      });
    },
  };
})(jQuery);
