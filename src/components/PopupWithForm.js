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
      this._submitButton = this._form.querySelector('.popup__save-button');
      const initialText = this._submitButton.textContent;
      if (initialText === 'Сохранить') {
        this._submitButton.textContent = 'Сохранение...';
      }
      else {
        this._submitButton.textContent = 'Создание...';
      };
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
      })
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
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
