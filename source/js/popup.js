'use strict';

(function () {
  var TitleList = {
    success: 'Ваше сообщение успешно отправлено',
    error: 'Что-то пошло не так, попробуйте еще раз'
  };

  var form = document.querySelector('.form');
  var popupTemplate = document.querySelector('#popup');
  var fragment = document.createDocumentFragment();
  var select = form.querySelector('#option');
  var name = form.querySelector('#name');
  var checkbox = form.querySelector('#agreement');
  var checkboxImitation = document.querySelector('.form__checkbox');
  var text = form.querySelector('.form__text');

  /**
   * Функция удаляет обработчики событий, очищает форму, удаляет попап
   * @function
   */
  var popupRemoveClickHandlers = function () {
    var popup = document.querySelector('.popup');

    document.removeEventListener('keydown', popupCloseKey);
    popup.removeEventListener('click', popupOverlayClickHandler);
    popup.remove();
    select.focus();
  };

  /**
   * Функция для закрытия попапа по клавише esc
   * @function
   * @param {event} evt - event
   */
  var popupCloseKey = function (evt) {
    if (evt.code === ('Escape')) {
      popupRemoveClickHandlers();
    }
  };

  /**
   * Функция для закрытия попапа по клику на оверлей
   * @function
   * @param {event} evt - event
   */
  var popupOverlayClickHandler = function (evt) {
    if (evt.target.classList.contains('popup')) {
      popupRemoveClickHandlers();
    }
  };

  /**
   * Функция для закрытия попапа по клику на кнопку .popup__close
   * @function
   */
  var popupCloseButtonClickHandler = function () {
    popupRemoveClickHandlers();
  };

  /**
   * Функция сбрасывает поля формы
   * @function
   */
  var resetForm = function () {
    form.reset();
    name.removeAttribute('disabled');
    checkbox.removeAttribute('disabled');
    checkboxImitation.classList.remove('visually-hidden');
    text.classList.add('visually-hidden');
  };

  /**
   * Функция создает popup
   * * @function
   * @param {string} titleText - текста для вставки в .popup__title
   */
  var createPopup = function (titleText) {
    var popupContent = popupTemplate.content.querySelector('.popup');
    var popup = popupContent.cloneNode(true);
    var popupCloseButton = popup.querySelector('.popup__close');
    var title = popup.querySelector('.popup__title');
    var main = document.querySelector('.main');

    main.appendChild(fragment.appendChild(popup));

    title.innerHTML = titleText;

    document.addEventListener('keydown', popupCloseKey);
    popupCloseButton.addEventListener('click', popupCloseButtonClickHandler, {once: true});
    popup.addEventListener('click', popupOverlayClickHandler);

    popupCloseButton.focus();
    resetForm();
  };

  /**
   * Функция выполняется при успешно отправке формы
   * @function
   */
  var onLoad = function () {
    createPopup(TitleList.success);
  };

  /**
   * Функция выполняется, если отпрака формы произошла с ошибкой
   * @function
   */
  var onError = function () {
    createPopup(TitleList.error);
  };

  /**
   * Слушатель события отправки формы
   * @function
   * @param {event} evt
   */
  var submitHandler = function (evt) {
    if (select.checkValidity() === true && name.checkValidity() === true && checkbox.checkValidity() === true) {
      evt.preventDefault();
      window.server.upload(new FormData(form), onLoad, onError);
    }
  };

    form.addEventListener('submit', submitHandler);
}) ();
