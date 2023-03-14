import {Card} from './Card.js';
import {initialCards} from './cards.js';
import {elementsList, popupProfile, popupCard, closePopupProfileButton, closePopupCardButton, formAddCard,
        placeInput, linkInput, editButton, addButton, formProfile, nameInput, jobInput, profileName,
        profileDescription, closePopupImageButton, popupZoomImage} from './constants.js';

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpen);
  }
}

function closePopupClick(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  evt.stopPropagation();
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  }
}

function renderElements(cards) {
  const elements = cards.map((el) => {
    const card = new Card(el, '#el-template');
    return card.addCard();
  });

  elementsList.prepend(...elements);
}

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const card = new Card({name: name,
                        link: link}, '#el-template');
  const cardElement = card.addCard();
  formAddCard.reset();
  elementsList.prepend(cardElement);

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

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;
editButton.addEventListener('click', handleOpenPopupProfile);

renderElements(initialCards);
formAddCard.addEventListener('submit', handleFormCardsSubmit);
addButton.addEventListener('click', () => showPopup(popupCard));
formProfile.addEventListener('submit', handleFormProfileSubmit);
closePopupProfileButton.addEventListener('click', () => closePopup(popupProfile));
closePopupCardButton.addEventListener('click', () => closePopup(popupCard));
closePopupImageButton.addEventListener('click', () => closePopup(popupZoomImage));

popupProfile.addEventListener('mousedown', closePopupClick);
popupCard.addEventListener('mousedown', closePopupClick);
popupZoomImage.addEventListener('mousedown', closePopupClick);

export {showPopup, closePopup, closePopupEsc, closePopupClick};
