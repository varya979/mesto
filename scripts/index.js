
// импорты

import { initialCards } from './inititalCards.js';
import Card from './card.js';
import { object } from './object.js';
import FormValidator from './FormValidator.js';

// переменные

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

export const picturePopup = document.querySelector('.popup_type_picture');
export const picturePopupCloseBtn = picturePopup.querySelector('.popup__button-close');
export const picturePopupFigcaption = picturePopup.querySelector('.popup__figcaption');
export const picturePopupImage = picturePopup.querySelector('.popup__image');

const popups = Array.from(document.querySelectorAll('.popup'));

const profilePopupFormValidator = new FormValidator(object, profilePopupForm);
const cardPopupFormValidator = new FormValidator(object, cardPopupForm);

// функции

export const openPopup = (popupAny) => {
  popupAny.classList.add('popup_opened');
  document.addEventListener(
    'keydown',
    closePopupByKeyPressEsc,
    closePopupByClickOnOverlay(),
    );
};

export const closePopup = (popupAny) => {
  popupAny.classList.remove('popup_opened');
  document.removeEventListener(
    'keydown',
    closePopupByKeyPressEsc,
    closePopupByClickOnOverlay(),
    );
};

const editProfilePopupForm = (evt) => {
  evt.preventDefault();
  profilePopupTitle.textContent = profilePopupInputName.value;
  profilePopupDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
};

/* создать и добавить карточку из массива initialCards */
initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();

  cardWrapper.append(cardElement); //добавит в конец
});

/* создать и добавить карточку кнопкой добавления */
const createAndAddCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  };
  closePopup(cardPopup);
  const card = new Card(newCard, '.element-template');
  const cardItem= card.generateCard();

  cardWrapper.prepend(cardItem); //добавит в начало
};

const closeCardPopup = () => {
  closePopup(cardPopup);
};


// обработчики

const closePopupByKeyPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

const closePopupByClickOnOverlay = () => {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if(evt.target == evt.currentTarget) {
        closePopup(popup);
      };
    });
  });
};

profilePopupOpenBtn.addEventListener('click', () => {
  profilePopupFormValidator.clearForm();
  profilePopupInputName.value = profilePopupTitle.textContent;
  profilePopupInputDescription.value = profilePopupDescription.textContent;
  openPopup(profilePopup);
});

profilePopupCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', editProfilePopupForm);

cardPopupOpenBtn.addEventListener('click', () => {
  cardPopupFormValidator.clearForm();
  openPopup(cardPopup);
});

cardPopupCloseBtn.addEventListener('click', closeCardPopup);

cardPopupForm.addEventListener('submit', createAndAddCard);

profilePopupFormValidator.enableValidation();

cardPopupFormValidator.enableValidation();
