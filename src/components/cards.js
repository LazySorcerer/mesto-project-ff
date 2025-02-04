import { openModal } from "./modal.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(name, link, deleteCard, likeCard, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  const image = cardElement.querySelector('.card__image');
  image.addEventListener('click', openImage);

  return cardElement;
}

export const deleteCard = function (evt) {
  const eventTarget = evt.target;

  const card = eventTarget.closest('.card');
  card.remove();
}

export const likeCard = function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }  
}

export const openImage = function (evt) {
  let link = evt.currentTarget.src;
  let caption = evt.currentTarget.alt;

  const popupViewImage = document.querySelector('.popup_type_image');
  openModal(popupViewImage);

  let activePopup = document.querySelector('.popup_is-opened');
  let popupImage = activePopup.querySelector('.popup__image');
  popupImage.src = link;
  popupImage.alt = caption;
  let popupCaption = activePopup.querySelector('.popup__caption');
  popupCaption.textContent = caption;
}
