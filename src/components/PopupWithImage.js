import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // super вызывает конструктор родительского класса
    super(popupSelector);
    this._picturePopupImage = this._popup.querySelector(".popup__image");
    this._picturePopupFigcaption =
      this._popup.querySelector(".popup__figcaption");
  }

  open(card) {
    this._picturePopupImage.src = card.link;
    this._picturePopupImage.alt = card.name;
    this._picturePopupFigcaption.textContent = card.name;
    super.open();
  }
}
