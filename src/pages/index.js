import './index.css';

import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards} from '../utils/cards.js';
import {elementsList, popupProfile, popupCard, formAddCard,
        editButton, addButton, formProfile, profileName,
        profileDescription, popupImage, popupImageCaption, popupZoomImage} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {validConfig} from '../utils/validate.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

function createCard (item) {
  const card = new Card(item, '#el-template', handleCardClick);
  const cardElement = card.addCard();
  cardList.addItem(cardElement);
};

function handleCardClick(name, link) {
  const popupImageOpened = new PopupWithImage(popupZoomImage, popupImage, popupImageCaption);
  popupImageOpened.open(name,link);
  popupImageOpened.setEventListener();
};

function handleFormCardsSubmit(item) {
  createCard(item);
  popupNewCard.close();
};

function handleFormProfileSubmit (item) {
    userInfo.setUserInfo(item);
    popupEditProfile.close();
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
  }
},
elementsList);

const popupNewCard = new PopupWithForm(
  popupCard,
  formAddCard,
  handleFormCardsSubmit
);

const popupEditProfile = new PopupWithForm(
  popupProfile,
  formProfile,
  handleFormProfileSubmit
);

const userInfo = new UserInfo(profileName, profileDescription);

const profileFormValidator = new FormValidator(validConfig, formProfile);
const cardFormValidator = new FormValidator(validConfig, formAddCard);

cardList.renderItems();
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  userInfo.getUserInfo();
  }
);
addButton.addEventListener('click', () => popupNewCard.open());

popupEditProfile.setEventListener();
popupNewCard.setEventListener();



profileFormValidator.enableValidation();
cardFormValidator.enableValidation();