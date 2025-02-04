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

  cardImage.addEventListener('click', openImage);

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