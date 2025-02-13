import './pages/index.css';
import { initialCards } from './components/initialCards.js';
import { createCard, deleteCard, likeCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { sendCard, updateProfile } from './components/api.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_avatar');

const profileInfoForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlaceForm = document.forms['new-place'];

const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');


popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);      
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  })
});


profileEditButton.addEventListener('click', function () {
  openModal(popupEditProfile);

  profileInfoForm.elements.name.value = profileTitle.textContent;
  profileInfoForm.elements.description.value = profileDescription.textContent;
});

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
});


function handleProfileInfoSubmit(evt) {
  evt.preventDefault();

  //profileTitle.textContent = profileInfoForm.elements.name.value;
  //profileDescription.textContent = profileInfoForm.elements.description.value;

  updateProfile(profileInfoForm.elements.name.value, profileInfoForm.elements.description.value)
  .then(res => res.json())
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    closeModal(popupEditProfile);
  });
}
profileInfoForm.addEventListener('submit', handleProfileInfoSubmit);


const openImage = function (evt) {
  const link = evt.currentTarget.src;
  const caption = evt.currentTarget.alt;

  openModal(popupViewImage);

  popupImage.src = link;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
}


function addCards(cards, userId) {
  cards.forEach(element => {
    cardsContainer.append(createCard({
      userId: userId,
      card: element,
      //cardName: element.name,
      //cardLink: element.link,
      //cardLikeCounter: element.likes.length,
      deleteCard: deleteCard,
      likeCard: likeCard,
      openImage: openImage
    }));
  })
}


function handlenewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardName = newPlaceForm.elements['place-name'].value;
  const cardLink = newPlaceForm.elements.link.value;

  sendCreateCard(cardName, cardLink)
    .then(res => res.json())
    .then((result) => {
      cardsContainer.prepend(createCard({
        card: result,
        deleteCard: deleteCard,
        likeCard: likeCard,
        openImage: openImage
      }));
    
      newPlaceForm.reset();
      closeModal(popupNewCard);
    });
}
newPlaceForm.addEventListener('submit', handlenewPlaceSubmit);
















// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});




// очистка ошибок валидации вызовом clearValidation

//clearValidation(profileForm, validationConfig);





const profileImage = document.querySelector('.profile__image');
profileImage.addEventListener('click', function () {
  openModal(popupAvatar);
});

Promise.all([
  fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
    headers: {
      authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1'
    }
  }).then(res => res.json()),
  fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
    headers: {
      authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1'
    }
  }).then(res => res.json())
]).then((result) => {
  profileTitle.textContent = result[0].name;
  profileDescription.textContent = result[0].about;
  profileImage.style.backgroundImage = `url(${result[0].avatar})`;

  addCards(result[1], result[0]._id);
});