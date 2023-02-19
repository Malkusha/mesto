const template = document.querySelector('#el-template').content.querySelector('.elements__item');
const elementsList = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
const popupProfile = document.querySelector('.profile-popup');
const popupCard = document.querySelector('.card-popup');
const popupZoomImage = document.querySelector('.image-popup');
const closePopupProfileButton = document.querySelector('.profile-popup__close-button');
const closePopupCardButton = document.querySelector('.card-popup__close-button');
const formAddCard = document.querySelector('.cards-edit');
const placeInput = document.querySelector('.cards-edit__name');
const linkInput = document.querySelector('.cards-edit__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.profile-edit');
const nameInput = document.querySelector('.profile-edit__name');
const jobInput = document.querySelector('.profile-edit__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const closePopupImageButton = document.querySelector('.image-popup__close-button');

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupEsc(evt) {
  popupOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpen);    
  }
}

function closePopupClick(evt) {
  popupOpen = document.querySelector('.popup_opened');
  evt.stopPropagation();
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}

function likeCard(evt) {
  evt.target.classList.toggle('elements__like_type_on');
};

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function zoomImage(img) {
  popupImage.src = img.src;
  popupImage.alt = img.alt;
  popupImageCaption.textContent = img.alt;
  showPopup(popupZoomImage);
}

function addCard(card) {
  const item = template.cloneNode(true);
  const itemImage = item.querySelector('.elements__item-image');
  itemImage.setAttribute('src', card.link);
  itemImage.setAttribute('alt', card.name);
  item.querySelector('.elements__item-title').textContent = card.name;
  item.querySelector('.elements__like').addEventListener('click', likeCard);
  item.querySelector('.elements__delete').addEventListener('click', deleteCard);
  item.querySelector('.elements__item-image').addEventListener('click', () => zoomImage(itemImage))
  
  return item;
}

function renderElements(cards) {
  const elements = cards.map((el) => {
    return addCard(el);
  });
  
  elementsList.prepend(...elements);
}


function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const card = addCard({name: name,
                        link: link});
  formAddCard.reset();

  elementsList.prepend(card);

  closePopup(popupCard);
}

function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(popupProfile);
}

function handleOpenPopupProfile() {
  showPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

editButton.addEventListener('click', handleOpenPopupProfile);

renderElements(initialCards);

formAddCard.addEventListener('submit', handleFormCardsSubmit);
addButton.addEventListener('click', () => showPopup(popupCard));
formProfile.addEventListener('submit', handleFormProfileSubmit);
closePopupProfileButton.addEventListener('click', () => closePopup(popupProfile));
closePopupCardButton.addEventListener('click', () => closePopup(popupCard));
closePopupImageButton.addEventListener('click', () => closePopup(popupZoomImage));
