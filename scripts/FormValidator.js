class FormValidator {
  constructor(config, form) {
    this._form = form;

    this._inputList = Array.from(this._form.querySelectorAll(`.${config.inputSelector}`));
    this._saveButton = this._form.querySelector(`.${config.submitButtonSelector}`);

    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputOrderCheck = config.inputOrderCheck;
  }

  _showError = (input, errorMessage) => {
    const errorInput = this._form.querySelector(`.${input.id}-error`);

    if (input.classList.contains(this._inputOrderCheck)) {
      errorInput.classList.add('popup__input-error_margin_last');
    } else {
      errorInput.classList.add('popup__input-error_margin_first');
    }

    input.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(this._errorClass);
  };

  _hideError = (input) => {
    const errorInput = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent = '';
  }

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    }
    else {
      this._hideError(input);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {

    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    } else {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
      this._toggleButtonState()
      }, 0);
      });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(input);
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export {FormValidator}
