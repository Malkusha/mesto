function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
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
  itemImage.src =  card.link;
  itemImage.alt = card.name;
  item.querySelector('.elements__item-title').textContent = card.name;
  item.querySelector('.elements__like').addEventListener('click', likeCard);
  item.querySelector('.elements__delete').addEventListener('click', deleteCard);
  itemImage.addEventListener('click', () => zoomImage(itemImage));
  
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