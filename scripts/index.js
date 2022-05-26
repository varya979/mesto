const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__button-edit');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__button-close');
const profilePopupTitle = document.querySelector('.profile__title');
const profilePopupDescription = document.querySelector('.profile__subtitle');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputDescription = profilePopup.querySelector('.popup__input_type_description');
const profilePopupInputs = Array.from(profilePopup.querySelectorAll('.popup__input'));
const profilePopupInputErrors = Array.from(profilePopup.querySelectorAll('.popup__input-error'));
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupSaveBtn = profilePopup.querySelector('.popup__button-save');

const cardWrapper = document.querySelector('.elements');
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupOpenBtn = document.querySelector('.profile__button-add');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__button-close');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupInputName = cardPopup.querySelector('.popup__input_type_name');
const cardPopupInputImg = cardPopup.querySelector('.popup__input_type_description');
const cardPopupInputs = Array.from(cardPopup.querySelectorAll('.popup__input'));
const cardPopupInputErrors = Array.from(cardPopup.querySelectorAll('.popup__input-error'));
const cardTemplate = document.querySelector('.element-template').content;
const cardPopupSaveBtn = cardPopup.querySelector('.popup__button-save');

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupCloseBtn = picturePopup.querySelector('.popup__button-close');
const picturePopupFigcaption = picturePopup.querySelector('.popup__figcaption');
const picturePopupImage = picturePopup.querySelector('.popup__image');

const popups = Array.from(document.querySelectorAll('.popup'));


// универсальная функция открытия попапа.
const openPopup = (popupAny) => {
  popupAny.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKeyPressEsc);
};
// универсальная функция закрытия попапа.
const closePopup = (popupAny) => {
  popupAny.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeyPressEsc);
};

//универсальная функция блокировки кнопки submit.
const disablePopupSaveBtn = (popupSaveBtnAny) => {
  popupSaveBtnAny.classList.add('popup__button-save_inactive');
  popupSaveBtnAny.setAttribute('disabled', true);
};

//универсальная функция очищения ошибок инпутов.
const clearPopupInputError = (popupInputErrorsAny) => {
    popupInputErrorsAny.forEach((popupInputError) => {
    popupInputError.textContent = '';
  });
};

// универсальная функция удаления красного подчеркивания ошибки инпутов.
const clearPopupInputErrorRedBorder = (popupInputsAny) => {
  popupInputsAny.forEach((popupInput) => {
    popupInput.classList.remove('popup__input_type_error');
  });
};

// универсальная функция закрытия попапа нажатием на оверлей.
const closePopupByClickOnOverlay = () => {
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if(evt.target == evt.currentTarget) {
        closePopup(popup);
      };
    });
  });
};

closePopupByClickOnOverlay();

//универсальная функция закрытия попапа нажатием на кнопку ESC.
const closePopupByKeyPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

//функция очищения попапа  Card (сброс формы, очищение ошибок) перед открытием.
const clearCardPopupFormBeforeOpen = () => {
  cardPopupForm.reset();
  clearPopupInputError(cardPopupInputErrors);
  clearPopupInputErrorRedBorder(cardPopupInputs);
  openPopup(cardPopup);
};

// Функуия закрытия попапа Card
const closeCardPopup = () => {
  closePopup(cardPopup);
};

// Функция  создания карточки в CardPopup и закрытие попапа.
const createCardAndCloseCardPopup = (evt) => {
  evt.preventDefault();
  const newCard = createCard ({
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  });
  closePopup(cardPopup);
  cardWrapper.prepend(newCard);
  cardPopupForm.reset();
};

// Открытие попапа Profile.
profilePopupOpenBtn.addEventListener('click', () => {
  profilePopupInputName.value = profilePopupTitle.textContent;
  profilePopupInputDescription.value = profilePopupDescription.textContent;
  disablePopupSaveBtn(profilePopupSaveBtn);
  clearPopupInputError(profilePopupInputErrors);
  clearPopupInputErrorRedBorder(profilePopupInputs);
  openPopup(profilePopup);
});

// Закрытия попапа Profile.
profilePopupCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

// Нажатие на кнопку редактирования попапа Profile.
const editProfilePopupForm = (evt) => {
  evt.preventDefault();
  profilePopupTitle.textContent = profilePopupInputName.value;
  profilePopupDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
};

profilePopupForm.addEventListener('submit', editProfilePopupForm);

// Функция удаления карточки в попапе Card.
const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

// Функция лайка карточки в попапе Card.
const likeCard = (evt) => {
  evt.target.classList.toggle('element__button-like_active');
};


// Закрытие попапа Picture.
picturePopupCloseBtn.addEventListener('click', () => {
  closePopup(picturePopup);
});

// Функция создания карточки.
const createCard = ({link, name}) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLikeBtn = cardElement.querySelector('.element__button-like');
  const cardDeleteBtn = cardElement.querySelector('.element__button-delete');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

  disablePopupSaveBtn(cardPopupSaveBtn);

  cardLikeBtn.addEventListener('click', likeCard);

  cardDeleteBtn.addEventListener('click', deleteCard);

  cardImg.addEventListener('click', () => {
    picturePopupImage.src = link;
    picturePopupImage.alt = name;
    picturePopupFigcaption.textContent = name;
    openPopup(picturePopup);
  });

  return cardElement;
};

//  Функция отрисовки карточки. Она принимает элемент куда вставлять отрисованный элемент, а также, сам элемент, который нужно отрисовать.
const renderCard = (cardWrapper, { link, name }) => {
  cardWrapper.append(createCard({ link, name }));
};

// Вызываем функцию отрисовки карточки. И передаем куда хотим отрисовать и что хотим отрисовать.
initialCards.forEach(({ link, name }) => {
  renderCard(cardWrapper, { link, name });
});

// Открытие попапа Card нажатием на кнопку profile__button-add
cardPopupOpenBtn.addEventListener('click', clearCardPopupFormBeforeOpen);

// Закрытие попапа Card нажатием на кнопку popup__button-close
cardPopupCloseBtn.addEventListener('click', closeCardPopup);

// Нажатие на кнопку добавления карточки, которое создает карточку и закрывает попап.
cardPopupForm.addEventListener('submit', createCardAndCloseCardPopup);
