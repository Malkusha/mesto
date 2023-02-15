const initialCards = [
  {
    name: 'Курск',
    link: 'https://images.unsplash.com/photo-1595928757074-231ad16cdd17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80'
  },
  {
    name: 'Хабаровск',
    link: 'https://images.unsplash.com/photo-1570428907228-3c6dbadad06f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Бахчисарай',
    link: 'https://images.unsplash.com/photo-1621953231638-78df098abfb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1730&q=80'
  },
  {
    name: 'Новороссийск',
    link: 'https://images.unsplash.com/photo-1645865612436-fe9a0a480720?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const template = document.querySelector('#el-template').content.querySelector('.elements__item');
const elementsList = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

function addCard(card) {
  const item = template.cloneNode(true);
  const itemImage = item.querySelector('.elements__item-image');
  itemImage.setAttribute('src', card.link);
  itemImage.setAttribute('alt', card.name);
  item.querySelector('.elements__item-title').textContent = card.name;
  item.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_type_on');
  });
  item.querySelector('.elements__delete').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });
  item.querySelector('.elements__item-image').addEventListener('click', function(evt) {
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
    showPopup(2);
  })
  
  return item;
}

function renderElements(cards) {
  const elements = cards.map((el) => {
    return addCard(el);
  });
  
  elementsList.append(...elements);
}

renderElements(initialCards);

const formAddCard = document.querySelector('.cards-edit');
const placeInput = document.querySelector('.cards-edit__name');
const linkInput = document.querySelector('.cards-edit__description');

function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const card = addCard({name: name,
                        link: link});
  
  elementsList.prepend(card);
  placeInput.value = '';
  linkInput.value = '';
  
  closePopup();
}

const popup = Array.from(document.querySelectorAll('.popup'));
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close-button'));
const addButton = document.querySelector('.profile__add-button');


function showPopup(index) {
  popup[index].classList.add('popup_opened');
}

function closePopup() {
  popup.forEach((item) => item.classList.remove('popup_opened'));
}

const formProfile = document.querySelector('.profile-edit');
const nameInput = document.querySelector('.profile-edit__name');
const jobInput = document.querySelector('.profile-edit__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function handleFormProfileSubmit (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup();
}

editButton.addEventListener('click', () => {
  showPopup(0);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
formAddCard.addEventListener('submit', handleFormCardsSubmit);
addButton.addEventListener('click', () => showPopup(1));

closeButtons.forEach( button => button.addEventListener('click', closePopup));
formProfile.addEventListener('submit', handleFormProfileSubmit);

