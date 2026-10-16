(($) => {
  const filterForm = '.ys-filter-form--scaffold';
  const selectMessageClass = 'ys-select-message';

  Drupal.behaviors.chosenSelect = {
    attach(context) {
      const ysChosenReady = (e) => {
        // An li, not a span: ul.chosen-choices may only hold li children.
        $(e.target)
          .next()
          .find('.chosen-choices')
          .prepend(`<li class="${selectMessageClass}"></li>`);
      };
      const ysSelectChange = (e) => {
        const selectedNr = $(e.target).val().length;
        const selectMessage = selectedNr
          ? `${`(${selectedNr}) items selected`}`
          : '';

        $(e.target).next().find(`.${selectMessageClass}`).text(selectMessage);
      };
      $(once('ys-chosen-select', filterForm, context)).each((i, elem) => {
        const $select = $(elem).find('select');
        $select.on('chosen:ready', ysChosenReady);
        $select.on('change', ysSelectChange);
      });
    },
  };
})(jQuery);
