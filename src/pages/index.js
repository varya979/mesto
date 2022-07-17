import './index.css';

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';

import {
  profilePopupOpenBtn,
  profilePopupInputName,
  profilePopupInputDescription,
  profilePopupForm,
  cardPopupForm,
  cardPopupOpenBtn,
  options,
  avatarPopupOpenBtn,
  avatarPopupForm,
} from '../utils/constants.js';

import { validationConfig } from "../utils/constants.js";

/** переменная создана для связывания экземпляра класса Api с экземпляром класса Card -
 *  для присвоения своего id и его использования при отображении на карточке иконки корзины*/
 let ownerId = null;

 /** переменная создана для связывания экземпляра класса Card с
  * экземпляром класса PopupWithConfirmation - для удаления карточки с сайта */
 let patternCard = null;


const api = new Api(options);

// указываем куда вставлять введенные данные полей
const profileInfo = new UserInfo({
  userName: '.profile__title',
  userDescription: '.profile__subtitle',
  userAvatar: '.profile__avatar',
});

// заполнение начальной инфо о пользователе на странице
  api.getUserInfoFromServer()
  .then ((info) => {
    profileInfo.setUserInfo(info);
    ownerId = info._id;
  })
  .catch((err) => {
    console.log(err);
  })

// создание попапа profile
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (info) => {
    profilePopup.renderLoading(true);
    api.setUserInfoToServer(info)
    .then((res) => {
      profileInfo.setUserInfo(res)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.close();
      profilePopup.renderLoading(false);
    })
  }
});

 // открытие попапа profile
 profilePopupOpenBtn.addEventListener('click', () => {
  const profileData = profileInfo.getUserInfo();
  profilePopupInputName.value = profileData.name;
  profilePopupInputDescription.value = profileData.about;
  profilePopupFormValidator.resetValidation();
  profilePopup.open();
});

// закрытие попапа profile
profilePopup.setEventListeners();


// создаем карточки и  добавляем их в разметку
const cardsList = new Section ({
  renderer: (data) => {
    const card = createCard(data);
    cardsList.addItemToTheEnd(card);
  }
},
'.elements'
);

// заполнение страницы начальными карточками с сервера
api.getCardsFromServer()
  .then((card) => {
    cardsList.renderItems(card);
 })
 .catch((err) => {
  console.log(err);
})

 // создание новой карточки с помощью класса Card
const createCard = (data) => {
  const card = new Card ({
    data,
    handleImgCardClick: (data) => {
      picturePopup.open(data);
    },
    handleDeleteBtnCardClick: () => {
      patternCard = card;
      popupConfirmDelete.open(data);
    },
    handleLikeBtnCardClick: (data) => {
      api.putLike(data)
      .then((res) => {
      card.getlikesCount(res)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    handleDislikeBtnCardClick: (data) => {
      api.deleteLike(data)
      .then((res) => {
      card.getlikesCount(res)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    templateSelector: '.element-template'
  },
  ownerId);

  const cardElement = card.generateCard();

  return cardElement;
}

// создание карточки кнопкой добавления из формы
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (card) => {
    cardPopup.renderLoading(true);
    api.setCardToServer(card)
    .then((res) => {
      const card = createCard(res);
      cardsList.addItemToTheStart(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.close();
      cardPopup.renderLoading(false);
    })
  }
});

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.changeUserAvatar(data)
    .then((res) => {
      profileInfo.setUserAvatar(res)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.close();
      avatarPopup.renderLoading(false);
    })
  }
});

 // открытие попапа avatar
  avatarPopupOpenBtn.addEventListener('click', () => {
  avatarPopupFormValidator.resetValidation();
  avatarPopup.open();
});

avatarPopup.setEventListeners();


//  создания попапа Confirm
const popupConfirmDelete = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm-delete',
  handleFormSubmitBtn: (cardId) => {
    api.deleteCardFromServer(cardId)
    .then(() => {
      patternCard.deleteCard();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupConfirmDelete.close();
    })
  }
});

// закрытие попапа Confirm
popupConfirmDelete.setEventListeners();


// открытие попапа Card
cardPopupOpenBtn.addEventListener('click', () => {
  cardPopupFormValidator.resetValidation();
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
const avatarPopupFormValidator = new FormValidator(validationConfig, avatarPopupForm);

profilePopupFormValidator.enableValidation();
cardPopupFormValidator.enableValidation();
avatarPopupFormValidator.enableValidation();


