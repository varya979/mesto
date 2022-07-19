// создает карточку с текстом и ссылкой на изображение
export default class Card {
  constructor(
    {
      data,
      handleImgCardClick,
      handleDeleteBtnCardClick,
      handleLikeBtnCardClick,
      handleDislikeBtnCardClick,
      templateSelector,
    },
    ownerId
  ) {
    this._data = data;
    this._handleImgCardClick = handleImgCardClick;
    this._handleDeleteBtnCardClick = handleDeleteBtnCardClick;
    this._handleLikeBtnCardClick = handleLikeBtnCardClick;
    this._handleDislikeBtnCardClick = handleDislikeBtnCardClick;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._element.querySelector(".element__title").textContent =
      this._data.name;
    this._cardLikeBtn = this._element.querySelector(".element__button-like");
    /** воспользовалась prettier для улучшения отступов кода, и теперь он перенесит
     * строки больше 80 знаков на следующую строчку. В настройках prettier меняла
     * 80 на больше - не помогает. */
    this._cardDeleteBtnIcon = this._element.querySelector(
      ".element__button-delete"
    );
    this._likesCountIcon = this._element.querySelector(".element__count-likes");

    this.setlikesCount(this._data);
    this._setEventListeners();
    this._hideNotMineDeleteBtn();
    this._checkLikesOwner();
    return this._element;
  }

  _toggleLikeBtnActiveClass() {
    this._cardLikeBtn.classList.toggle("element__button-like_active");
  }

  _likeCard(data) {
    this._toggleLikeBtnActiveClass();
    this._handleLikeBtnCardClick(data);
  }

  _dislikeCard(data) {
    this._toggleLikeBtnActiveClass();
    this._handleDislikeBtnCardClick(data);
  }

  setlikesCount(data) {
    this._likesCountIcon.textContent = data.likes.length;

    if (data.likes.length > 0) {
      this._likesCountIcon.style.display = "block";
    } else {
      this._likesCountIcon.style.display = "none";
    }
  }

  _checkLikesOwner() {
    this._data.likes.forEach((data) => {
      if (data._id === this._ownerId) {
        this._toggleLikeBtnActiveClass();
      }
    });
  }

  _hideNotMineDeleteBtn() {
    if (this._data.owner._id !== this._ownerId) {
      this._cardDeleteBtnIcon.remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleImgCardClick(this._data);
    });

    this._cardLikeBtn.addEventListener("click", () => {
      if (this._cardLikeBtn.classList.contains("element__button-like_active")) {
        this._dislikeCard(this._data);
      } else {
        this._likeCard(this._data);
      }
    });

    this._cardDeleteBtnIcon.addEventListener(
      "click",
      this._handleDeleteBtnCardClick
    );
  }
}
