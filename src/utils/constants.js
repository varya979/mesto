import volny from '../images/volny.jpg';
import puteshestviya from '../images/puteshestviya.jpg';
import sneg from '../images/sneg.jpg';
import rodnoiChelovek from '../images/rodnoiChelovek.jpg';
import cofee from '../images/cofee.jpg';
import vesna from '../images/vesna.jpg';

export const initialCards = [
  {
    title: 'Солнечная весна',
    link: vesna
  },
  {
    title: 'Чашка горячего кофе',
    link: cofee
  },
  {
    title: 'Родной человечек',
    link: rodnoiChelovek
  },
  {
    title: 'Первый снег',
    link: sneg
  },
  {
    title: 'Путешествия',
    link: puteshestviya
  },
  {
    title: 'Шум волн',
    link: volny
  },

];

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


