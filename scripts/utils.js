// Selección de elementos del popup de visualización de imágenes (Zoom)
const imagesPopup = document.querySelector("#image-popup");
const popupImage = imagesPopup.querySelector(".popup__image");
const popupCaption = imagesPopup.querySelector(".popup__caption");
const popupImagesClose = imagesPopup.querySelector(".popup__close");

// Clase CSS que se utiliza para mostrar los popups
const OPEN_CLASS = 'popup_is-opened';
//-----------------------------------
// Funciones de apertura de modales:
//-----------------------------------
export {imagesPopup, popupImage, popupCaption, popupImagesClose}