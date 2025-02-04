import './pages/index.css';
import { initialCards } from './components/initialCards.js';
import { createCard, deleteCard, likeCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const profileInfoForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlaceForm = document.forms['new-place'];

const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');


const keyHandler = function (evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
    document.removeEventListener('keydown', keyHandler);
  }
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
      document.removeEventListener('keydown', keyHandler);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
      document.removeEventListener('keydown', keyHandler);
    }
  })
});


profileEditButton.addEventListener('click', function () {
  openModal(popupEditProfile);
  document.addEventListener('keydown', keyHandler);

  profileInfoForm.elements.name.value = profileTitle.textContent;
  profileInfoForm.elements.description.value = profileDescription.textContent;
});

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
  document.addEventListener('keydown', keyHandler);
});


function handleProfileInfoSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileInfoForm.elements.name.value;
  profileDescription.textContent = profileInfoForm.elements.description.value;

  closeModal(evt.target.parentElement.parentElement);
  document.removeEventListener('keydown', keyHandler);
}
profileInfoForm.addEventListener('submit', handleProfileInfoSubmit);


const openImage = function (evt) {
  const link = evt.currentTarget.src;
  const caption = evt.currentTarget.alt;

  openModal(popupViewImage);
  document.addEventListener('keydown', keyHandler);

  popupImage.src = link;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
}


function addCards(cards) {
  cards.forEach(element => {
    cardsContainer.append(createCard(element.name, element.link, deleteCard, likeCard, openImage));
  })
}
addCards(initialCards);


function handlenewPlaceSubmit(evt) {
  evt.preventDefault();

  const cardName = newPlaceForm.elements['place-name'].value;
  const cardLink = newPlaceForm.elements.link.value;

  cardsContainer.prepend(createCard(cardName, cardLink, deleteCard, likeCard, openImage));

  newPlaceForm.reset();
  closeModal(evt.target.parentElement.parentElement);
  document.removeEventListener('keydown', keyHandler);
}
newPlaceForm.addEventListener('submit', handlenewPlaceSubmit);