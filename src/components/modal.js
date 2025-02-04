export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
}