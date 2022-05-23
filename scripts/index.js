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
const cardTemplate = document.querySelector('.element-template').content;

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupCloseBtn = picturePopup.querySelector('.popup__button-close');
const picturePopupFigcaption = picturePopup.querySelector('.popup__figcaption');
const picturePopupImage = picturePopup.querySelector('.popup__image');

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

profilePopupOpenBtn.addEventListener('click', () => {
  profilePopupInputName.value = profilePopupTitle.textContent;
  profilePopupInputDescription.value = profilePopupDescription.textContent;
  openPopup(profilePopup);
});

profilePopupCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

const editProfilePopupForm = (evt) => {
  evt.preventDefault();
  profilePopupTitle.textContent = profilePopupInputName.value;
  profilePopupDescription.textContent = profilePopupInputDescription.value;
  closePopup(profilePopup);
}
profilePopupForm.addEventListener('submit', editProfilePopupForm);

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

const renderCard = (cardWrapper, { link, name }) => {
  cardWrapper.append(createCard({ link, name }));
};

initialCards.forEach(({ link, name }) => {
  renderCard(cardWrapper, { link, name });
});

cardPopupOpenBtn.addEventListener('click', () => {
  cardPopupForm.reset();
  openPopup(cardPopup);
});

cardPopupCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard ({
    link: cardPopupInputImg.value,
    name: cardPopupInputName.value,
  });
  closePopup(cardPopup);
  cardWrapper.prepend(newCard);
  cardPopupForm.reset();
});
