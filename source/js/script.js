'use strict';

(function () {
  var OPTION2 = '2';
  var OPTION3 = '3';
  var form = document.querySelector('.form');
  var name = form.querySelector('#name');
  var select = form.querySelector('#option');
  var checkbox = form.querySelector('#agreement');
  var checkboxImitation = document.querySelector('.form__checkbox');
  var text = form.querySelector('.form__text');

  /**
   * Слушатель события change на checkbox
   * @function
   */
  function checkboxChangeHandler () {
    name.setAttribute('disabled', '');
  };

  /**
   * Слушатель события change на select
   * @function
   */
  function selectChangeHandler (evt) {
    console.log('+++');
    if (evt.target.value === OPTION2 || evt.target.value === OPTION3) {
      name.removeAttribute('disabled');
      checkbox.setAttribute('disabled', '');
      checkboxImitation.classList.add('visually-hidden');
      text.classList.remove('visually-hidden');
    } else {
      checkbox.removeAttribute('disabled');
      checkboxImitation.classList.remove('visually-hidden');
      text.classList.add('visually-hidden');
    }
  };

  checkbox.addEventListener('change', checkboxChangeHandler);
  select.addEventListener('change', selectChangeHandler);
})();
