/* в этом файле хранятся функции, которые не относятся к какому-то конкретному классу,
не уникальны для определенной страницы.*/

// import { popups } from './constants.js';

// export const closePopupByKeyPressEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   };
// };

// export const closePopupByClickOnOverlay = () => {
//   popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if(evt.target == evt.currentTarget) {
//         closePopup(popup);
//       };
//     });
//   });
// };

// export const openPopup = (popupAny) => {
//   popupAny.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByKeyPressEsc);
// };

// export const closePopup = (popupAny) => {
//   popupAny.classList.remove('popup_opened');
//   document.removeEventListener('keydown',closePopupByKeyPressEsc);
// };
