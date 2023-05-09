import {Popup} from './Popup.js';

class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__delete-button');
  }
}

export {PopupDeleteCard}
