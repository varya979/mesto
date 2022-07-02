// создает карточку с текстом и ссылкой на изображение
export default class Card {
  // функция handleCardClick связывает попап с классом Card - открывает попап с картинкой при клике на карточку
  constructor ({ data, handleCardClick, templateSelector }) {
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

  // подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._data.link;
    this._image.alt = this._data.title;
    this._element.querySelector('.element__title').textContent = this._data.title;
    this._cardLikeBtn = this._element.querySelector('.element__button-like');
    this._cardDeleteBtn = this._element.querySelector('.element__button-delete');

    this._setEventListeners();

    return this._element;
  };

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



