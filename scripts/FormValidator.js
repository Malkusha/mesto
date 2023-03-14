import {validConfig} from './validate.js';

class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;

    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showError = (form, input, errorMessage) => {
    const errorInput = form.querySelector(`.${input.id}-error`);

    if (input.classList.contains('popup__info_type_description')) {
      errorInput.classList.add('popup__input-error_margin_last');
    } else {
      errorInput.classList.add('popup__input-error_margin_first');
    }

    input.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(this._errorClass);
  };

  _hideError = (form, input) => {
    const errorInput = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent = '';
  }

  _checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage);
    }
    else {
      this._hideError(form, input);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, button) {

    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(`.${this._inputSelector}`));
    const saveButton = form.querySelector(`.${this._submitButtonSelector}`);

    this._toggleButtonState(inputList, saveButton);
    form.addEventListener('reset', () => {
      setTimeout(() => {
      this._toggleButtonState(inputList, saveButton)
      }, 0);
      });

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleButtonState(inputList, saveButton);
        this._checkInputValidity(form, input);
      })
    })
  }

  enableValidation() {
    const form = document.querySelector(this._formSelector);
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(form);
  }
}

const profileFormValidator = new FormValidator(validConfig, '.profile-edit');
const cardFormValidator = new FormValidator(validConfig, '.cards-edit');

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
