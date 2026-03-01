// ELEMENTOS
// Array que contiene los datos iniciales de las tarjetas (nombre y URL de la imagen)
/*Cabe aclarar que dentro de los requerimientos del Sprint se indica que las imágenes deben estar almacenadas 
  mediantes los links proporcionados, sin embargos los links están rotos, por lo tanto las imáagenes se están cargando 
  localmente para que se puedan visualizar correctamente
*/
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openModal, closeModal, handleEscOption, imagesPopup, popupImagesClose, setModalEventListeners} from './utils.js';

let initialCards = [
  {
    name: "Valle de Yosemite",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    link: "./images/valle-de-yosemite.jpg"
  },
  {
    name: "Lago Louise",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    link: "./images/lago-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    link: "./images/montanas-calvas.jpg"
  },
  {
    name: "Latemar",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    link: "./images/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    link: "./images/vanoise-national-park.jpg"
  },
  {
    name: "Lago di Braies",
    //link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    link: "./images/lago-di-braies.jpg"
  }
];

const configuracion = {
  inputSelector: 'form__input',
  submitButtonSelector: 'button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

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

const profileValidator = new FormValidator(configuracion, editForm);
const cardValidator = new FormValidator(configuracion, newCardForm);

profileValidator.setEventListeners();
cardValidator.setEventListeners();
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
  profileValidator.resetValidation()
  openModal(editPopup);
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
  renderCard(cardTitle, cardImage, cardsList);

  closeModal(newCardPopup);
  event.target.reset() // Limpia los campos del formulario
}

// Crea una tarjeta y la añade al contenedor especificado (usando prepend)
function renderCard(name, link, cardsContainer){
  const card = new Card(name, link, '#cards__template');
  cardsContainer.prepend(card.generateCard());
}

// Bucle para renderizar todas las tarjetas iniciales del array
initialCards.forEach(function(item){
  renderCard(item.name, item.link, cardsList);
})
// --------------------------------
//        EVENT LISTENERS
// --------------------------------
setModalEventListeners();
// Eventos para el perfil y su modal de edición
profileEditButton.addEventListener('click', handleOpenEditModal);
editForm.addEventListener('submit', handleProfileFormSubmit);

// Eventos para el modal de añadir nueva tarjeta
profileAddBtn.addEventListener("click", () =>{
  openModal(newCardPopup)
  cardValidator.resetValidation();
});
newCardForm.addEventListener("submit", handleCardFormSubmit);