import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, form, handleFormSubmit) {
    super(popupSelector);
    this._form = form;
    this._inputList = this._form.querySelectorAll('.popup__info');
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputInfo = {};
    this._inputList.forEach((input) => {this._inputInfo[input.name] = input.value});
    return this._inputInfo;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export {PopupWithForm}
