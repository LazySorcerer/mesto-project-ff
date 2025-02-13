export const likeSet = function (cardId, likeButton, likeCounter) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
    authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1'
    }
  }).then(res => res.json())
    .then((result) => {
      likeButton.classList.add('card__like-button_is-active');
      likeCounter.textContent = result.likes.length;
    })
}

export const likeRemove = function (cardId, likeButton, likeCounter) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1'
    }
  }).then(res => res.json())
    .then((result) => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCounter.textContent = result.likes.length;
    })
}

export const sendCreateCard = function (cardName, cardLink) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards`, {
    method: 'POST',
    headers: {
    authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
}

export const sendDeleteCard = function (cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1'
    }
  })
}

export const updateProfile = function (name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  }); 
}