export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); /*// жёстко привязываем контекст при передаче функции */
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);

  };

  // публичный метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  };

  // публичный метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  // приватный метод закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  // приватный метод закрытия попапа нажатием на оверлей
  _handleOverlayClose(evt) {
    if (evt.target == evt.currentTarget) {
      this.close();
    };
   };

  // приватный метод закрытия попапа нажатием на кнопку закрытия
  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup__button-close')) {
      this.close();
    };
  };

  /* публичный метод, который добавляет слушатель клика иконке закрытия попапа.
  Модальное окно также закрывается при клике на затемнённую область вокруг формы */
  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      this._handleClickClose(evt);
      this._handleOverlayClose(evt);
    });
  };
}
