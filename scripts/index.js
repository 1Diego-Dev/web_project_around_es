// ELEMENTOS
// Array que contiene los datos iniciales de las tarjetas (nombre y URL de la imagen)
/*Cabe aclarar que dentro de los requerimientos del Sprint se indica que las imágenes deben estar almacenadas 
  mediantes los links proporcionados, sin embargos los links están rotos, por lo tanto las imáagenes se están cargando 
  localmente para que se puedan visualizar correctamente
*/
let initialCards = [
  {
    name: "Valle de Yosemite",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    link: "../images/valle-de-yosemite.jpg"
  },
  {
    name: "Lago Louise",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    link: "../images/lago-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    link: "../images/montanas-calvas.jpg"
  },
  {
    name: "Latemar",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    link: "../images/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    link: "../images/vanoise-national-park.jpg"
  },
  {
    name: "Lago di Braies",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    link: "../images/lago-di-braies.jpg"
  }
];
// Seleccion de todos los popups de la pagina
const allPopups = document.querySelectorAll(".popup");

// Selección de elementos del perfil y el botón de edición
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

// Selección de elementos del popup de edición de perfil
const editPopup = document.querySelector('#edit-popup');
const editForm = document.querySelector('#edit-profile-form');
const popupCloseButton = editPopup.querySelector('.popup__close');
const editFormInputs = editForm.querySelectorAll("input");
const saveButton = editForm.querySelector(".popup__button");

// Inputs del formulario de edición de perfil
const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');

// Selección del contenedor principal de las tarjetas y el botón para añadir nuevas
const cardsList = document.querySelector(".cards__list");
const profileAddBtn = document.querySelector(".profile__add-button");

// Selección de elementos del popup de nueva tarjeta
const newCardPopup = document.querySelector("#new-card-popup");
const popupAddCardContent = newCardPopup.querySelector(".popup__content");
const popupCloseCard = popupAddCardContent.querySelector(".popup__close");
const newCardForm = popupAddCardContent.querySelector("#new-card-form");
const inputsCardForm = newCardForm.querySelectorAll("input");
const createNewCardBtn = newCardForm.querySelector(".popup__button");

// Inputs del formulario de nueva tarjeta
const cardTitleInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = newCardForm.querySelector(".popup__input_type_url");

// Selección de elementos del popup de visualización de imágenes (Zoom)
const imagesPopup = document.querySelector("#image-popup");
const popupImage = imagesPopup.querySelector(".popup__image");
const popupCaption = imagesPopup.querySelector(".popup__caption");
const popupImagesClose = imagesPopup.querySelector(".popup__close");


// Clase CSS que se utiliza para mostrar los popups
const OPEN_CLASS = 'popup_is-opened';


// --------------------------------
//        FUNCIONES BASE
// --------------------------------

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
// Limpia los mensajes de error y estados visuales de validación de un formulario
function resetValidation(currentForm){
  const currentFormInputs = currentForm.querySelectorAll(".popup__input")
  currentFormInputs.forEach((input)=>{
    hideInputError(input, currentForm)
  })
}


// --------------------------------
//     FUNCIONES PARA MANEJAR MODALES
// --------------------------------

// Rellena los inputs del formulario de perfil con el texto actual de la página
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Maneja la apertura del modal de edición de perfil
function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(editForm)
  openModal(editPopup);
  toggleButtonState(editFormInputs, saveButton)
}



// --------------------------------
//       ENVÍO DEL FORMULARIO
// --------------------------------
function showInputError(inputElement, errorMessage, currentForm){
  const errorElement = currentForm.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(inputElement, currentForm){
  const errorElement = currentForm.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

//Valida todos los campos del formulario
function hasInvalidInput(inputs){
  return Array.from(inputs).some(input => !input.validity.valid);
}

//Cambia el estado del btoón dependiendo si todos los campos son válidos o no 
function toggleButtonState(inputs, button){
  if (hasInvalidInput(inputs)){
    button.disabled = true;
  }else{
    button.disabled = false;
  }
}

// Procesa el guardado de los nuevos datos del perfil
function handleProfileFormSubmit(event) {
  // Evita la recarga de la página al enviar
  event.preventDefault();

  // Actualiza perfil
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// Procesa la creación de una nueva tarjeta desde el formulario
function handleCardFormSubmit(event){
  event.preventDefault();

  // Evita la recarga de la página al enviar
  const cardTitle =  cardTitleInput.value;
  const cardImage =  cardUrlInput.value;

  // Crea el elemento y lo inserta al principio de la lista
  const newCard = getCardElement(cardTitle, cardImage);
  cardsList.prepend(newCard);

  closeModal(newCardPopup);
  event.target.reset() // Limpia los campos del formulario
  toggleButtonState(inputsCardForm, createNewCardBtn)
}

function getCardElement(name, linkSrc){
  // Clona la estructura del template HTML
  const cardTemplate = document.querySelector("#cards__template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__description").querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  // Asigna los valores de la imagen y el título
  cardImage.src = linkSrc;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Manejador para el botón "Me gusta"
  cardLikeBtn.addEventListener("click", (btn) =>{
    btn.target.classList.toggle("card__like-button_is-active")
  });

  // Manejador para eliminar la tarjeta del DOM
  cardDeleteBtn.addEventListener("click", (deleteBtn)=>{
    deleteBtn.target.closest(".card").remove()
  });

  // Manejador para abrir la imagen en grande al hacer clic sobre ella
  cardImage.addEventListener("click", ()=>{
    popupCaption.textContent = name;
    popupImage.src = linkSrc;
    popupImage.alt = name;

    openModal(imagesPopup);
  });
  return cardElement;

}

// Crea una tarjeta y la añade al contenedor especificado (usando prepend)
function renderCard(name, link, cardsContainer){
  const card = getCardElement(name, link);
  cardsContainer.prepend(card);
}

// Bucle para renderizar todas las tarjetas iniciales del array
initialCards.forEach(function(item){
  renderCard(item.name, item.link, cardsList);
})
// --------------------------------
//        EVENT LISTENERS
// --------------------------------

// Eventos para el perfil y su modal de edición
profileEditButton.addEventListener('click', handleOpenEditModal);
popupCloseButton.addEventListener('click', () => closeModal(editPopup));
editForm.addEventListener('submit', handleProfileFormSubmit);

// Eventos para el modal de añadir nueva tarjeta
profileAddBtn.addEventListener("click", () =>{
  toggleButtonState(inputsCardForm, createNewCardBtn)
  openModal(newCardPopup)
  resetValidation(newCardForm)
});
popupCloseCard.addEventListener("click", ()=> closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Evento para cerrar el modal de visualización de imágenes
popupImagesClose.addEventListener("click", ()=> closeModal(imagesPopup));

// Configura la validación en tiempo real para el formulario de perfil
editFormInputs.forEach((input)=>{
  input.addEventListener("input", ()=>{
    toggleButtonState(editFormInputs, saveButton)
    if(!input.validity.valid){
      showInputError(input, input.validationMessage, editForm);
    }else{
      hideInputError(input, editForm);
    }
  })
})
// Configura la validación en tiempo real para el formulario de nueva tarjeta
inputsCardForm.forEach((input)=>{
  input.addEventListener("input", ()=>{
      toggleButtonState(inputsCardForm, createNewCardBtn)
      if(!input.validity.valid){
        showInputError(input, input.validationMessage, newCardForm);
      }else{
        hideInputError(input, newCardForm);
      }
    })
})
// Configura el cierre de popups al hacer clic en la superposición (overlay)
allPopups.forEach((popup)=>{
  popup.addEventListener("mousedown",(event)=>{
    if(event.target === event.currentTarget){
      closeModal(popup)
    }
  })
}) 
