import './index.css';

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  profilePopupOpenBtn,
  profilePopupInputName,
  profilePopupInputDescription,
  profilePopupForm,
  initialCards,
  cardPopupForm,
  cardPopupOpenBtn,
} from '../utils/constants.js';

import { validationConfig } from "../utils/constants.js";

// создает новую карточку с помощью класса Card
const createCard = (data) => {
  const card = new Card ({
    data,
    // функция handleCardClick открывает picturePopup при клике на карточку
    handleCardClick: (data) => {
      picturePopup.open(data);
    },
    templateSelector: '.element-template',
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// создает карточки из массива initialCards и добавляет их в разметку
const cardsList = new Section ({
  items: initialCards,
  // отвечает за создание и отрисовку карточек на странице
  renderer: (item) => {
    const card = createCard(item);
    // addItem - метод, который принимает карточку и добавляет ее в контейнер elements
    cardsList.addItem(card);
  }
},
'.elements'
);

// отрисовывает все карточки из массива initialCards
cardsList.renderItems();

// создание экземпляра класса UserInfo с объектом данных полей ввода
const profileInfo = new UserInfo({
  userName: '.profile__title',
  userDescription: '.profile__subtitle'
});

// создание попапа profile
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  // formData — это объект, который возвращает метод _getInputValues (собирает данные всех полей формы)
  handleFormSubmit: (formData) => {
    // передаем ProfileInfo. Методом SetUserInfo добавим данные на страницу
    profileInfo.setUserInfo(formData);
    profilePopup.close();
  }
});

 // открытие попапа profile
 profilePopupOpenBtn.addEventListener('click', () => {
  profilePopupFormValidator.clearForm();
  // getUserInfo подставляет данные пользователя в форму
  const profileData = profileInfo.getUserInfo();
  profilePopupInputName.value = profileData.name;
  profilePopupInputDescription.value = profileData.description;
  profilePopup.open();
});

// закрытие попапа profile
profilePopup.setEventListeners();

// создание карточки кнопкой добавления из формы попапа
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_type_card',
  // formData — это объект, который возвращает метод _getInputValues (собирает данные всех полей формы)
  handleFormSubmit: (formData) => {
    const card = createCard(formData);
    cardsList.addItem(card);
    cardPopup.close();
  }
});

// открытие попапа Card
cardPopupOpenBtn.addEventListener('click', () => {
  cardPopupFormValidator.clearForm();
  cardPopup.open();
})

// закрытие попапа Card
cardPopup.setEventListeners();

// создание попапа picturePopup
const picturePopup = new PopupWithImage('.popup_type_picture');

// закрытие попапа picture
picturePopup.setEventListeners();

// валидация форм попапов
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupForm);
const cardPopupFormValidator = new FormValidator(validationConfig, cardPopupForm);

profilePopupFormValidator.enableValidation();
cardPopupFormValidator.enableValidation();
