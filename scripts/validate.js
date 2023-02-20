const validConfig = {
  formSelector: 'popup__edit-form',
  inputSelector: 'popup__info',
  submitButtonSelector: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__info_condition_error',
  errorClass: 'popup__input-error_active'
}

const showError = (form, input, errorMessage) => {
  
  const errorInput = form.querySelector(`.${input.id}-error`);
  console.log(errorInput);
  if (input.classList.contains('popup__info_type_description')) {
    errorInput.classList.add('popup__input-error_margin_last');
  } else {
    errorInput.classList.add('popup__input-error_margin_first');
  }
  input.classList.add(validConfig.inputErrorClass);
  errorInput.textContent = errorMessage;
  errorInput.classList.add(validConfig.errorClass);
};

const hideError = (form, input) => {
  const errorInput = form.querySelector(`.${input.id}-error`); 
  input.classList.remove(validConfig.inputErrorClass);
  errorInput.classList.remove(validConfig.errorClass);
  errorInput.textContent = '';
}

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage);
  }
  else {
    hideError(form, input);
  }
};

function IsInputsValid(form) {
  const inputList = Array.from(form.querySelectorAll(`.${validConfig.inputSelector}`));
  const saveButton = form.querySelector(`.${validConfig.submitButtonSelector}`);
  toggleButtonState(inputList, saveButton);
  
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleButtonState(inputList, saveButton);
      checkInputValidity(form, input);
    })
    
  })
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formsList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    IsInputsValid(form);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
}); 
}

function toggleButtonState(inputList, button) {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    button.classList.add(validConfig.inactiveButtonClass);
  } else {
    button.classList.remove(validConfig.inactiveButtonClass);
  }
}

enableValidation(validConfig);