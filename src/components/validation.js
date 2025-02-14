const showInputError = (formElement, inputElement, errorMessage, popupSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(popupSettings.inputErrorClass);
  errorElement.classList.add(popupSettings.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, popupSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupSettings.inputErrorClass);
  errorElement.classList.remove(popupSettings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, popupSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupSettings);
  } else {
    hideInputError(formElement, inputElement, popupSettings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, popupSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(popupSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false; 
    buttonElement.classList.remove(popupSettings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, popupSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(popupSettings.inputSelector));                                                     
  const buttonElement = formElement.querySelector(popupSettings.submitButtonSelector);                                                             

  toggleButtonState(inputList, buttonElement, popupSettings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, popupSettings)

      toggleButtonState(inputList, buttonElement, popupSettings);
    });
  });
};

export const enableValidation = (popupSettings) => {
  const formList = Array.from(document.querySelectorAll(popupSettings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, popupSettings);
  });
};

export const clearValidation = (popup, errorSettings) => {
  if (errorSettings.inputErrorSelector != undefined) {
    const inputList = popup.querySelectorAll(errorSettings.inputErrorSelector);
    inputList.forEach((element) => {    
      element.classList.remove(errorSettings.inputErrorSelector.slice(1));
    });
  }
  
  if (errorSettings.errorSelector != undefined) {
    const errorList = popup.querySelectorAll(errorSettings.errorSelector);
    errorList.forEach((element) => {
      element.classList.remove(errorSettings.errorSelector.slice(1));
    });
  }

  if (errorSettings.submitButtonSelector != undefined) {
    const popupButton = popup.querySelector(errorSettings.submitButtonSelector);
    popupButton.disabled = true;
    popupButton.classList.add(errorSettings.inactiveButtonClass);
  }
};