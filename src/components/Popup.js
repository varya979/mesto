export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupButtonClose = this._popup.querySelector('.popup__button-close')
  };

  // приватный метод закрытия попапа клавишей Esc
  // при использовании стрелочной функции bind не нужен
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  // публичный метод открытия попапа
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  };

  // публичный метод закрытия попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  };

    /* публичный метод, который добавляет слушатель клика иконке закрытия попапа.
  Модальное окно также закрывается при клике на затемнённую область вокруг формы */
  setEventListeners() {
    // закрытие попапа по кнопке х
    this._popupButtonClose.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target == evt.currentTarget) {
        this.close();
      };
    });
  };
}
