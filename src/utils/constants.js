export const initialCards = [
  {
    title: 'Шум волн',
    link: 'https://img.freepik.com/free-photo/sunset-with-sea-and-beach_74190-3834.jpg?size=626&ext=jpg&ga=GA1.2.723964690.1656256196'
  },
  {
    title: 'Путешествия',
    link: 'https://img.freepik.com/free-photo/girl-sticking-her-feet-in-flip-flops-out-of-a-car-window_405430-17.jpg?size=626&ext=jpg&ga=GA1.2.723964690.1656256196'
  },
  {
    title: 'Первый снег',
    link: 'https://img.freepik.com/free-photo/snow-forest-at-togakushi-shrine-japan_1150-10872.jpg?t=st=1656258195~exp=1656258795~hmac=1e558e92c1b82fc817ee68563d802324eb191ab1807abc1a2496bdef347f02a1&w=996'
  },
  {
    title: 'Родной человечек',
    link: 'https://img.freepik.com/free-photo/holding-hands_1112-1531.jpg?size=626&ext=jpg&ga=GA1.2.723964690.1656256196'
  },
  {
    title: 'Чашка горячего кофе',
    link: 'https://img.freepik.com/free-photo/heart-of-steam-hovering-over-a-red-coffee-cup-of-coffee-on-wooden-table-with-cream-wall_158502-206.jpg?size=626&ext=jpg&ga=GA1.2.723964690.1656256196'
  },
  {
    title: 'Солнечная весна',
    link: 'https://img.freepik.com/free-photo/white-flowers-with-a-blue-background_1160-425.jpg?size=626&ext=jpg&ga=GA1.2.723964690.1656256196'
  }
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


