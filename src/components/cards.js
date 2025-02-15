import { likeSet, likeRemove, sendDeleteCard } from "./api.js";

export function createCard(cardProperties) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardProperties.card.name;
  cardImage.src = cardProperties.card.link;
  cardImage.alt = cardProperties.card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardProperties.card.owner._id === cardProperties.userId || cardProperties.userId == undefined ) {    
    deleteButton.addEventListener('click', (evt) => cardProperties.deleteCard(evt, cardProperties.card._id));
  } else {
    deleteButton.style.display = 'none';
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  if (cardProperties.card.likes.some(item => item._id === cardProperties.userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', (evt) => cardProperties.likeCard(evt, cardProperties.card._id, likeButton, likeCounter));
  const likeCounter = cardElement.querySelector('.card__like-counter');
  likeCounter.textContent = cardProperties.card.likes.length;

  cardImage.addEventListener('click', cardProperties.openImage);

  return cardElement;
}

export const deleteCard = function (evt, cardId) {
  const eventTarget = evt.target;
  const card = eventTarget.closest('.card');

  sendDeleteCard(cardId)
  .then((result) => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

export const likeCard = function (evt, cardId, likeButton, likeCounter) {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      likeRemove(cardId, likeButton, likeCounter)
        .then((result) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeSet(cardId, likeButton, likeCounter)
        .then((result) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}