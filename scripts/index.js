const editPopup = document.querySelector('.popup_type_profile');
const editPopupOpenBtn = document.querySelector('.profile__button-edit');
const editPopupCloseBtn = editPopup.querySelector('.popup__button-close');
let editPopupTitle = document.querySelector('.profile__title');
let editPopupDescription = document.querySelector('.profile__subtitle');
let editPopupInputName = editPopup.querySelector('.popup__input-name');
let editPopupInputDescription = editPopup.querySelector('.popup__input-description');
const editPopupForm = editPopup.querySelector('.popup__form');

const cardsWrapper = document.querySelector('.elements');
const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupCloseBtn = picturePopup.querySelector('.popup__button-close');
const picturePopupFigcaption = picturePopup.querySelector('.popup__figcaption');
const picturePopupImage = picturePopup.querySelector('.popup__image');

const cardPopup = document.querySelector('.popup_type_card');
const cardPopupOpenBtn = document.querySelector('.profile__button-add');
const cardPopupCloseBtn = cardPopup.querySelector('.popup__button-close');
const cardPopupForm = cardPopup.querySelector('.popup__form');
let cardPopupInputName = cardPopup.querySelector('.popup__input-name');
let cardPopupInputImg = cardPopup.querySelector('.popup__input-description');

const initialCards = [
  {
    name: 'Блюдо с едой',
    link: 'https://images.pexels.com/photos/3659862/pexels-photo-3659862.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    name: 'Томаты и мята',
    link: 'https://images.pexels.com/photos/6555535/pexels-photo-6555535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    name: 'Специи',
    link: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    name: 'Азиатское блюдо',
    link: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    name: 'Форель с гарниром',
    link: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    name: 'Бокал красного вина',
    link: 'https://images.pexels.com/photos/3044/restaurant-love-romantic-dinner.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  }
];

const openPopup = (popupAny) => {
  popupAny.classList.add('popup_opened');
}

const closePopup = (popupAny) => {
  popupAny.classList.remove('popup_opened');
};

editPopupOpenBtn.addEventListener('click', () => {
  openPopup(editPopup);
  editPopupInputName.value = editPopupTitle.textContent;
  editPopupInputDescription.value = editPopupDescription.textContent;
});

editPopupCloseBtn.addEventListener('click', () => {
  closePopup(editPopup);
});

const editFormPopupEdit = (evt) => {
  evt.preventDefault();
  editPopupTitle.textContent = editPopupInputName.value;
  editPopupDescription.textContent = editPopupInputDescription.value;
  closePopup(editPopup);
}
editPopupForm.addEventListener('submit', editFormPopupEdit);

const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

const likeCard = (evt) => {
  evt.target.classList.toggle('element__button-like_active');
};

const openPicturePopup = () => {
  openPopup(picturePopup);
};

picturePopupCloseBtn.addEventListener('click', () => {
  closePopup(picturePopup);
});

const cardTemplate = document.querySelector('.element-template').content;

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

const renderCard = (cardsWrapper, { link, name }) => {
  cardsWrapper.append(createCard({ link, name }));
};

initialCards.forEach(({ link, name }) => {
  renderCard(cardsWrapper, { link, name });
});

cardPopupOpenBtn.addEventListener('click', () => {
  openPopup(cardPopup);
});

cardPopupCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
  cardPopupForm.reset();
});

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard ({
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  });
  cardPopupForm.reset();
  cardsWrapper.prepend(newCard);
  closePopup(cardPopup);
});



