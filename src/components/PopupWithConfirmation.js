import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
constructor ({ popupSelector, handleFormSubmitBtn }) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._handleFormSubmitBtn = handleFormSubmitBtn;
  };

  open(card) {
    super.open();
    return this._cardId = card._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmitBtn(this._cardId);
    });
  };
}
