import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    // super вызывает конструктор родительского класса
    super(popupSelector);
    this._picturePopupImage = this._popup.querySelector('.popup__image');
    this._picturePopupFigcaption = this._popup.querySelector('.popup__figcaption');
  };

  open() {
    this._picturePopupImage.src = data.link;
    this._picturePopupImage.alt = data.name;
    this._picturePopupFigcaption.textContent = data.name;
    super.open();
  };
}
