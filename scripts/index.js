const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupOpenBtn = document.querySelector('.profile__button-edit');
const profilePopupCloseBtn = profilePopup.querySelector('.popup__button-close');
const profilePopupTitle = document.querySelector('.profile__title');
const profilePopupDescription = document.querySelector('.profile__subtitle');
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupInputDescription = profilePopup.querySelector('.popup__input_type_description');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardWrapper = document.querySelector('.elements');
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupOpenBtn = document.querySelector('.profile__button-add');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__button-close');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupInputName = cardPopup.querySelector('.popup__input_type_name');
const cardPopupInputImg = cardPopup.querySelector('.popup__input_type_description');
const cardTemplate = document.querySelector('.element-template').content;

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupCloseBtn = picturePopup.querySelector('.popup__button-close');
const picturePopupFigcaption = picturePopup.querySelector('.popup__figcaption');
const picturePopupImage = picturePopup.querySelector('.popup__image');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupSaveBtns = Array.from(document.querySelectorAll('.popup__button-save'));
const popupInputErrors = Array.from(document.querySelectorAll('.popup__input-error'));
const popupInputs = Array.from(document.querySelectorAll('.popup__input'));

const initialCards = [
  {
    name: 'Шум волн',
    link: 'https://images.pexels.com/photos/1089168/pexels-photo-1089168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Первый снег',
    link: 'https://images.pexels.com/photos/752718/pexels-photo-752718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Путешествия',
    link: 'https://images.pexels.com/photos/3756167/pexels-photo-3756167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Чашка горячего кофе',
    link: 'https://images.pexels.com/photos/3649498/pexels-photo-3649498.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Родной человечек',
    link: 'https://images.pexels.com/photos/1683975/pexels-photo-1683975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Солнечная весна',
    link: 'https://images.pexels.com/photos/1035342/pexels-photo-1035342.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  }
];

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

//универсальная функция деактивации кнопки submit.
const disablePopupSaveBtn = () => {
  popupSaveBtns.forEach((popupSaveBtn) => {
    popupSaveBtn.classList.add('popup__button-save_inactive');
  });
};

//универсальная функция очищения ошибок инпутов.
const clearPopupInputError = () => {
  popupInputErrors.forEach((popupInputError) => {
    popupInputError.textContent = '';
  });
};

// универсальная функция удаления красного подчеркивания ошибки инпутов.
const clearPopupInputErrorRedBorder = () => {
  popupInputs.forEach((popupInput) => {
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

// Открытие попапа Profile.
profilePopupOpenBtn.addEventListener('click', () => {
  profilePopupInputName.value = profilePopupTitle.textContent;
  profilePopupInputDescription.value = profilePopupDescription.textContent;
  disablePopupSaveBtn();
  openPopup(profilePopup);
});

// Закрытия попапа Profile.
profilePopupCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
  clearPopupInputError();
  clearPopupInputErrorRedBorder();
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
// Открытие попапа Picture.
const openPicturePopup = () => {
  openPopup(picturePopup);
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

// Открытие попапа Card
cardPopupOpenBtn.addEventListener('click', () => {
  cardPopupForm.reset();
  disablePopupSaveBtn();
  openPopup(cardPopup);
});

// Закрытие попапа Card
cardPopupCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
  clearPopupInputError();
  clearPopupInputErrorRedBorder();
});

// Нажатие на кнопку создания карточки, которое создает карточку и закрывает попап.
cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard ({
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  });
  closePopup(cardPopup);
  cardWrapper.prepend(newCard);
  cardPopupForm.reset();
});
