// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const deleteCard = function (evt) {
  const eventTarget = evt.target;

  const card = eventTarget.closest('.card');
  card.remove();
}

function createCard(name, link, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;


  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', function (evt) {
    deleteCard(evt);
  });

  return cardElement;
}

function addCards(cards) {
  const cardsList = document.querySelector('.places__list');

  cards.forEach(element => {
    cardsList.append(createCard(element.name, element.link, deleteCard));
  })
}

addCards(initialCards);