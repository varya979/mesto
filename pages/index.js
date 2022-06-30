
// импорты

import { initialCards } from '../utils/constants.js';
import Card from '../components/Сard.js';
import { validationConfig } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

import {
  profilePopup,
  profilePopupOpenBtn,
  profilePopupCloseBtn,
  profilePopupTitle,
  profilePopupDescription,
  profilePopupInputName,
  profilePopupInputDescription,
  profilePopupForm,

  cardWrapper,
  cardPopup,
  cardPopupOpenBtn,
  cardPopupCloseBtn,
  cardPopupForm,
  cardPopupInputName,
  cardPopupInputImg,

  picturePopup,
  picturePopupCloseBtn,
  picturePopupFigcaption,
  picturePopupImage,

  popups,
  } from '../utils/constants.js';

  // import {
  //   closePopupByKeyPressEsc,
  //   closePopupByClickOnOverlay,
  //   openPopup,
  //   closePopup,
  // } from '../utils/utils.js';

// функции


/* создать новую карточку с помощью класса Card */
const createCard = (item) => {
  const card = new Card (
    item,
    '.element-template',
    { handleCardClick: (item) => {
        picturePopup.openPopup(item)
      }
    },
    );
  const cardElement = card.generateCard();
  return cardElement;
};


/* создать карточки из массива initialCards и добавить их в разметку */
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  }
},
'.elements'
);

cardsList.renderItems();


// /* создать и добавить карточку из массива initialCards */
// initialCards.forEach((item) => {
//   const card = createCard(item);
//   const cardElement = card.generateCard();

//   cardWrapper.append(cardElement); //добавит в конец
// });


/* создать и добавить карточку кнопкой добавления Submit */
const createAndAddCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  };
  closePopup(cardPopup);
  const card = createCard(newCard);
  const cardElement = card.generateCard();

  cardWrapper.prepend(cardElement); //добавит в начало
};




const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupForm);
const cardPopupFormValidator = new FormValidator(validationConfig, cardPopupForm);


// обработчики

const editProfilePopupForm = (evt) => {
  evt.preventDefault();
  profilePopupTitle.textContent = profilePopupInputName.value;
  profilePopupDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
};


// closePopupByClickOnOverlay();


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


picturePopupCloseBtn.addEventListener('click', () => closePopup(picturePopup));

cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup));

cardPopupForm.addEventListener('submit', createAndAddCard);

profilePopupFormValidator.enableValidation();

cardPopupFormValidator.enableValidation();
