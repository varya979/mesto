import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    // super вызывает конструктор родительского класса
    super(popupSelector);
    this._picturePopupImage = this._popup.querySelector('.popup__image');
    this._picturePopupFigcaption = this._popup.querySelector('.popup__figcaption');
  };

  open(item) {
    this._picturePopupImage.src = item.link;
    this._picturePopupImage.alt = item.title;
    this._picturePopupFigcaption.textContent = item.title;
    super.open();
  };
}
