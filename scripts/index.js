let Popup = document.querySelector('.popup');

function ShowPopup() {
  Popup.classList.toggle('popup_opened');
}

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
editButton.addEventListener('click', ShowPopup);
closeButton.addEventListener('click', ShowPopup);

let formElement = document.querySelector('.popup__container form');
let nameInput = document.querySelector('.popup__name-field');
console.log(nameInput.value);
let jobInput = document.querySelector('.popup__description-field');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    let Name = document.querySelector('.profile__name');
    let Description = document.querySelector('.profile__description');
    Name.textContent = nameValue;
    Description.textContent = jobValue;
    console.log(Name.textContent);
    
}

formElement.addEventListener('submit', handleFormSubmit);