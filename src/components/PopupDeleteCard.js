import {Popup} from './Popup.js';

class PopupDeleteCard extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.popup__delete-container');
  }

  setSubmitAction(action) {
    this._functionSubmit = action;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._functionSubmit();
    })
  }
}

export {PopupDeleteCard}
