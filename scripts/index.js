
const deleteCard = function (evt) {
  const eventTarget = evt.target;

  const card = eventTarget.closest('.card');
  card.remove();
}

function createCard(name, link, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}


const cardsContainer = document.querySelector('.places__list');

function addCards(cards) {
  cards.forEach(element => {
    cardsContainer.append(createCard(element.name, element.link, deleteCard));
  })
}

addCards(initialCards);