import { keyHandler } from "../index.js";


export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

export const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
}