import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageCaption) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageCaption = popupImageCaption;
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
  }
}

export {PopupWithImage}
