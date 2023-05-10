import './index.css';

import {Api} from '../components/Api.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {elementsList, popupProfile, popupCard, formAddCard,
        editButton, addButton, formProfile, profileName,
        profileDescription, popupImage, popupImageCaption, popupZoomImage, profileAvatar, formAvatar, popupAvatar, avatarButton, popupDeleteCard, deleteButton} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {validConfig} from '../utils/validate.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

let userId;

function getCard(item) {

  const card = new Card(item, '#el-template', handleCardClick, userId, api, handleLikeCard, handleDeleteCard);

  return card.addCard();
}

function createCard (item) {
  const cardElement = getCard(item);
  cardList.addItem(cardElement);
};

function handleCardClick(name, link) {
  popupImageOpened.open(name,link);
};

function handleFormCardsSubmit(item) {
  return api.loadNewCard(item)
    .then((item) => {
      createCard(item);
    })
};

function handleFormProfileSubmit (item) {
  return api.setProfileInfo(item)
    .then(() => {
      userInfo.setUserInfo(item);
    })
};

function handleFormAvatarSubmit (item) {
  return api.setAvatar(item)
    .then(() => {
      userInfo.setUserAvatar(item);
    })
}

function handleLikeCard(id, item) {
  if (!item.isLiked()) {
    api.addLike(id)
      .then((data) => {
        item.countNewLikes(data);
        item.toggleLike();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
  } else {
    api.removeLike(id)
      .then((data) => {
        item.countNewLikes(data);
        item.toggleLike();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
  }
}

function handleDeleteCard(item) {
  function setDeleteResponse() {
    api.deleteCard(item.getId())
    .then(() => {item.deleteCard();
      item.popup.close();
      })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
  popupDelete.setSubmitAction(setDeleteResponse);
  popupDelete.open();
}

const cardList = new Section(createCard, elementsList);

const api = new Api(
  `https://nomoreparties.co/v1/cohort-65`,
  {
    authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b',
    'Content-Type': 'application/json'
  }
)

Promise.all ([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

const popupImageOpened = new PopupWithImage(popupZoomImage, popupImage, popupImageCaption);

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

const popupEditAvatar = new PopupWithForm(
  popupAvatar,
  formAvatar,
  handleFormAvatarSubmit
);

const popupDelete = new PopupDeleteCard(popupDeleteCard);

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const profileFormValidator = new FormValidator(validConfig, formProfile);
const cardFormValidator = new FormValidator(validConfig, formAddCard);
const avatarFormValidator = new FormValidator(validConfig, formAvatar);

editButton.addEventListener('click', () => {
  popupEditProfile.open();
  profileFormValidator.resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  }
);
addButton.addEventListener('click', () => {
  popupNewCard.open();
  cardFormValidator.resetValidation();
});

avatarButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarFormValidator.resetValidation();
  }
)

popupImageOpened.setEventListener();
popupEditProfile.setEventListener();
popupNewCard.setEventListener();
popupEditAvatar.setEventListener();
popupDelete.setEventListener();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
