const keyHandler = function (evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

export const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
}