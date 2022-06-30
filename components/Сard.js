import {
  picturePopup,
  picturePopupFigcaption,
  picturePopupImage,
} from '../utils/constants.js';

import Popup from './Popup.js';


export default class Card {
  constructor (data, templateSelector, handleCardClick) {    /* функция handleCardClick связывает попап с классом Card. Она открывает попап с картинкой при клике на карточку */
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };


  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  };

  /* подготовка карточки к публикации */
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.element__image');
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardLikeBtn = this._element.querySelector('.element__button-like');
    this._cardDeleteBtn = this._element.querySelector('.element__button-delete');

    this._setEventListeners();

    return this._element;
  };

  // _handleOpenPopup() {
  //   picturePopupImage.src = this._link;
  //   picturePopupImage.alt = this._name;
  //   picturePopupFigcaption.textContent = this._name;

  //   openPopup(picturePopup);
  // };

  _toggleLikeCard() {
    this._cardLikeBtn.classList.toggle('element__button-like_active');
  };

  _deleteCard() {
    this._element.remove();
  };

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });

    this._cardLikeBtn.addEventListener('click', () => {
      this._toggleLikeCard();
    });

    this._cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard();
    });
  };

};



