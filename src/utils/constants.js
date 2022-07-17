export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
};

export const profilePopup = document.querySelector('.popup_type_profile');
export const profilePopupOpenBtn = document.querySelector('.profile__button-edit');
export const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
export const profilePopupInputDescription = profilePopup.querySelector('.popup__input_type_description');
export const profilePopupForm = profilePopup.querySelector('.popup__form');

export const cardPopup = document.querySelector('.popup_type_card');
export const cardPopupOpenBtn = document.querySelector('.profile__button-add');
export const cardPopupForm = cardPopup.querySelector('.popup__form');
export const cardPopupInputImg = cardPopup.querySelector('.popup__input_type_description');


export const avatarPopup = document.querySelector('.popup_type_update-avatar');
export const avatarPopupOpenBtn = document.querySelector('.profile__avatar-edit-button');
export const avatarPopupForm = avatarPopup.querySelector('.popup__form');

export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'ca894429-dc22-40ac-b610-fafa814a8e0b',
    /** чтобы сервер понял в чтО ему отправили - отправляем ему тип данных (MIME Types)
     *  в залоговке Content-Type: application/json - формат JSON */
    'Content-Type': 'application/json'
  }
}
