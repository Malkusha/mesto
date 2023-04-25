import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageSelector, popupImageCaptionSelector) {
    super(popupSelector);
    this._popupImage = popupImageSelector;
    this._popupImageCaption = popupImageCaptionSelector;
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
  }
}

export {PopupWithImage}
