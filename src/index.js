import './pages/index.css';
import { initialCards, createCard, deleteCard, likeCard, openImage } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';


const cardsContainer = document.querySelector('.places__list');
function addCards(cards) {
  cards.forEach(element => {
    cardsContainer.append(createCard(element.name, element.link, deleteCard, likeCard, openImage));
  })
}
addCards(initialCards);


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileInfo = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


profileEditButton.addEventListener('click', function () {
  openModal(popupEditProfile);

  profileInfo.elements.name.value = profileTitle.textContent;
  profileInfo.elements.description.value = profileDescription.textContent;
});

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
});


function handleProfileInfoSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = document.forms['edit-profile'].elements.name.value;
  profileDescription.textContent = document.forms['edit-profile'].elements.description.value;

  closeModal(evt);
}
profileInfo.addEventListener('submit', handleProfileInfoSubmit);


function handlenewPlaceSubmit(evt) {
  evt.preventDefault();

  let cardName = document.forms['new-place'].elements['place-name'].value;
  let cardLink = document.forms['new-place'].elements.link.value;

  cardsContainer.prepend(createCard(cardName, cardLink, deleteCard, likeCard, openImage));

  document.forms['new-place'].reset();
  closeModal(evt);
}
const newPlace = document.forms['new-place'];
newPlace.addEventListener('submit', handlenewPlaceSubmit);


const cardLikeButton = document.querySelector('.card__like-button');
cardLikeButton.addEventListener('click', likeCard);


const popups = document.querySelectorAll('.popup');
popups.forEach(element => {
  element.classList.add('popup_is-animated');
});