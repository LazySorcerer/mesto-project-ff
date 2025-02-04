export function openModal(popup) {
  popup.classList.toggle('popup_is-opened');
  let popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', closeModal);
  popup.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
}

export const closeModal = function (evt) {
  if (typeof evt.key !== "undefined") {
    if (evt.key != "Escape") {
      return;
    }
  } else {
    if (evt.target.classList[0] != "popup" &&
        evt.target.classList[0] != "popup__close" &&
        evt.target.classList[0] != "popup__form" ) {
      return;
    }
  }  

  let activePopup = document.querySelector('.popup_is-opened');
  activePopup.classList.toggle('popup_is-opened');
  let popupCloseButton = activePopup.querySelector('.popup__close');
  popupCloseButton.removeEventListener('click',closeModal);
  activePopup.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeModal);
}