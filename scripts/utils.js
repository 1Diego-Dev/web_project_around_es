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

// Función para abrir cualquier modal añadiendo la clase de visibilidad
function openModal(popup) {
  popup.classList.add(OPEN_CLASS);
  document.addEventListener("keydown", handleEscOption)
}

// Función para cerrar cualquier modal eliminando la clase de visibilidad
function closeModal(popup) {
  popup.classList.remove(OPEN_CLASS);
  document.removeEventListener("keydown", handleEscOption)
}

// Maneja el cierre de modales mediante la tecla Escape
function handleEscOption(event){
  if (event.key === "Escape"){
    const currentModalOpened = document.querySelector(".popup_is-opened")
    if (currentModalOpened !== null) {
      closeModal(currentModalOpened)
    }
  }
}

function setModalEventListeners() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
      // Cierra si el clic es exactamente en el fondo oscuro (overlay)
      if (event.target === event.currentTarget) {
        closeModal(popup);
      }
      // Cierra si el clic es en el botón de la X
      if (event.target.classList.contains("popup__close")) {
        closeModal(popup);
      }
    });
  });
}

export {openModal, closeModal, handleEscOption, setModalEventListeners}
export {imagesPopup, popupImage, popupCaption, popupImagesClose}