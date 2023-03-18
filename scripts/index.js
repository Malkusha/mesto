import {Card} from './Card.js';
import {initialCards} from './cards.js';
import {popups, elementsList, popupProfile, popupCard, formAddCard,
        placeInput, linkInput, editButton, addButton, formProfile, nameInput, jobInput, profileName,
        profileDescription, popupImage, popupImageCaption, popupZoomImage} from './constants.js';
import {FormValidator} from './FormValidator.js';
import {validConfig} from './validate.js';

function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

function createCard (el) {
  const card = new Card(el, '#el-template', handleCardClick);
  return card.addCard();
}

function renderElements(cards) {
  const elements = cards.map(createCard);

  elementsList.prepend(...elements);
}

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardElement = createCard({name,link});
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

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  showPopup(popupZoomImage);
}

editButton.addEventListener('click', handleOpenPopupProfile);

renderElements(initialCards);
formAddCard.addEventListener('submit', handleFormCardsSubmit);
addButton.addEventListener('click', () => showPopup(popupCard));
formProfile.addEventListener('submit', handleFormProfileSubmit);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

const profileFormValidator = new FormValidator(validConfig, formProfile);
const cardFormValidator = new FormValidator(validConfig, formAddCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
