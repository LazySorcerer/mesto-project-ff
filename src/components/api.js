import { checkResponse } from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: '4f931946-ca14-49b5-a514-3e8b3eafd8f1',
    'Content-Type': 'application/json',
  },
};

export const getUser = function () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
}

export const getCards = function () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
}

export const likeSet = function (cardId, likeButton, likeCounter) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
}

export const likeRemove = function (cardId, likeButton, likeCounter) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

export const sendCreateCard = function (cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(checkResponse);
}

export const sendDeleteCard = function (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

export const updateProfile = function (name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse);
}

export const updateAvatar = function (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(checkResponse);
}