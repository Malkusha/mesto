import './index.css';

import {Api} from '../components/Api.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {elementsList, popupProfile, popupCard, formAddCard,
        editButton, addButton, formProfile, profileName,
        profileDescription, popupImage, popupImageCaption, popupZoomImage, profileAvatar, formAvatar, popupAvatar, avatarButton, popupDeleteCard} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {validConfig} from '../utils/validate.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Popup } from '../components/Popup.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

let userId;

function getCard(item) {
  const card = new Card(item, '#el-template', handleCardClick, deletePopup, userId, api, handleDeleteCard, handleLikeCard);
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
  renderLoading(true, formAddCard);
  api.loadNewCard(item)
    .then((item) => {
      createCard(item);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
    .finally(() => renderLoading(false, formAddCard));
  popupNewCard.close();
};

function handleFormProfileSubmit (item) {
  renderLoading(true, formProfile);
  userInfo.setUserInfo(item);
  api.setProfileInfo(item)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
    .finally(() => renderLoading(false, formProfile));
  popupEditProfile.close();
};

function handleFormAvatarSubmit (item) {
  userInfo.setUserAvatar(item);
  renderLoading(true, formAvatar);
  api.setAvatar(item)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
    .finally(() => renderLoading(false, formAvatar));
  popupEditAvatar.close();
}

function handleLikeCard(id, item) {
  item._toggleLike();
  console.log(item.isLiked());
  if (!item.isLiked()) {
    api.addLike(id)
      .then((res) => {
        item._likesCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
  } else {
    api.removeLike(id)
      .then((res) => {
        item._likesCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
  }

}

function renderLoading(isLoading, form) {
  if (form === formAddCard) {
    if (isLoading) {
      form.querySelector('.popup__save-button').textContent = 'Создание...';
    }
    else {
      form.querySelector('.popup__save-button').textContent = 'Создать';
    }
  }
  else {
    if (isLoading) {
      form.querySelector('.popup__save-button').textContent = 'Сохранение...';
    }
    else {
      form.querySelector('.popup__save-button').textContent = 'Сохранить';
    }
  }
}

function handleDeleteCard(id, myThis) {
  api.deleteCard(id)
    .then(() => {myThis._deleteCard();
      })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
  })
}

const cardList = new Section(createCard, elementsList);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
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

const deletePopup = new PopupDeleteCard(popupDeleteCard);

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const profileFormValidator = new FormValidator(validConfig, formProfile);
const cardFormValidator = new FormValidator(validConfig, formAddCard);
const avatarFormValidator = new FormValidator(validConfig, formAvatar);


api.getProfileInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    userId = data._id;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
});

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

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
