import {popupImage, popupImageCaption, popupZoomImage} from './constants.js';
import {showPopup, closePopup, closePopupEsc, closePopupClick} from './index.js';

class Card {
  constructor (item, templateSelector) {
    this._link = item.link;
    this._name = item.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('elements__like_type_on');
  }

  _deleteCard(evt) {
    evt.target.parentElement.remove();
  }

  _zoomImage(img) {
    popupImage.src = img.src;
    popupImage.alt = img.alt;
    popupImageCaption.textContent = img.alt;
    showPopup(popupZoomImage);
  }

  addCard() {
    this._element = this._getTemplate();
    const itemImage = this._element.querySelector('.elements__item-image');
    this._element.querySelector('.elements__item-image').src = this._link;
    this._element.querySelector('.elements__item-image').alt = this._name;
    this._element.querySelector('.elements__item-title').textContent = this._name;
    this._element.querySelector('.elements__like').addEventListener('click', this._likeCard);
    this._element.querySelector('.elements__delete').addEventListener('click', this._deleteCard);
    itemImage.addEventListener('click', () => this._zoomImage(itemImage));

    return this._element;
  }
}

export {Card}
