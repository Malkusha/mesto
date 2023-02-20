const validConfig = {
  formSelector: 'popup__edit-form',
  inputSelector: 'popup__info',
  submitButtonSelector: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__info_condition_error',
  errorClass: 'popup__input-error_active'
}

const showError = (form, input, errorMessage, config) => {
  
  const errorInput = form.querySelector(`.${input.id}-error`);
  if (input.classList.contains('popup__info_type_description')) {
    errorInput.classList.add('popup__input-error_margin_last');
  } else {
    errorInput.classList.add('popup__input-error_margin_first');
  }
  input.classList.add(config.inputErrorClass);
  errorInput.textContent = errorMessage;
  errorInput.classList.add(config.errorClass);
};

const hideError = (form, input, config) => {
  const errorInput = form.querySelector(`.${input.id}-error`); 
  input.classList.remove(config.inputErrorClass);
  errorInput.classList.remove(config.errorClass);
  errorInput.textContent = '';
}

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  }
  else {
    hideError(form, input, config);
  }
  
};

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(`.${config.inputSelector}`));
  const saveButton = form.querySelector(`.${config.submitButtonSelector}`);
  toggleButtonState(inputList, saveButton, config);
  form.addEventListener('reset', () => {
    setTimeout(() => {
    toggleButtonState(inputList, saveButton, config)
    }, 0);
    });

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleButtonState(inputList, saveButton, config);
      checkInputValidity(form, input, config);
    })
    
  })
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formsList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
}); 
}

function toggleButtonState(inputList, button, config) {
  
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

enableValidation(validConfig);