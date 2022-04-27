const popupOpenButton = document.querySelector('.profile__button-edit');
const popupForm = document.querySelector('.popup__form');
const popupCloseButton = document.querySelector('.popup__button-close');
const popupButtonSave = document.querySelector('.popup__button-save');
const popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__input-name');
let popupInputDescription = document.querySelector('.popup__input-description');

// 1 Открытие и закрытие попапа

popupOpenButton.addEventListener('click', function() {
  popup.classList.toggle('popup_opened');
})

popupCloseButton.addEventListener('click', function() {
  popup.classList.toggle('popup_opened');
})

// 2 При открытии формы поля «Имя» и «О себе»
// заполнены теми значениями, которые отображаются на странице

popupOpenButton.addEventListener('click', profileEditButtonClick);

function profileEditButtonClick() {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

// 3 Редактирование имени и информации о себе.
// Автоматическое закрытие окна после внесения изменений
// и нажатия кнопки «Сохранить»

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  popup.classList.toggle('popup_opened');
}
popupForm.addEventListener('submit', formSubmitHandler);
popupButtonSave.addEventListener('click', formSubmitHandler);
