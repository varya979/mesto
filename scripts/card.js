import {
  picturePopup,
  picturePopupCloseBtn,
  picturePopupFigcaption,
  picturePopupImage,
  openPopup,
  closePopup,
} from './index.js';


export default class Card {
  constructor (data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  };


  _getTemplate() {
    const cardElement = document
    .querySelector('.element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  };

  /* подготовка карточки к публикации */
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardLikeBtn = this._element.querySelector('.element__button-like');
    this._cardDeleteBtn = this._element.querySelector('.element__button-delete');

    this._setEventListeners();

    return this._element;
  };

  _handleOpenPopup() {
    picturePopupImage.src = this._link;
    picturePopupImage.alt = this._name;
    picturePopupFigcaption.textContent = this._name;

    openPopup(picturePopup);
  };

  _handleClosePopup() {
    closePopup(picturePopup);
  };

  _toggleLikeCard() {
    this._cardLikeBtn.classList.toggle('element__button-like_active');
  };

  _deleteCard() {
    this._element.remove();
  };


  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    picturePopupCloseBtn.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._cardLikeBtn.addEventListener('click', () => {
      this._toggleLikeCard();
    });

    this._cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard();
    });
  };

};



