// ELEMENTOS
// Array que contiene los datos iniciales de las tarjetas (nombre y URL de la imagen)
/*Cabe aclarar que dentro de los requerimientos del Sprint se indica que las imágenes deben estar almacenadas 
  mediantes los links proporcionados, sin embargos los links están rotos, por lo tanto las imáagenes se están cargando 
  localmente para que se puedan visualizar correctamente
*/
import {Card} from './Card.js';
import {UserInfo} from './UserInfo.js';
import {Popup} from './Popup.js';
import {PopupWithForm} from './PopupWithForm.js';
import {PopupWithImage} from './PopupWithImage.js';
import {Section} from './Section.js';
import {FormValidator} from './FormValidator.js';

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

// Selección de elementos del perfil y el botón de edición
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const editForm = document.querySelector('#edit-profile-form');
const profileAddCardBtn = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");

const profileValidator = new FormValidator(configuracion, editForm);
const cardValidator = new FormValidator(configuracion, newCardForm);

profileValidator.setEventListeners();
cardValidator.setEventListeners();

//------------------------
// Instacias de las clases
//------------------------

//Instacia de usuario
const user = new UserInfo({name:".profile__title", description:".profile__description"})

//Instancia de popup con imagen
const popupWithImage = new PopupWithImage("#image-popup")
popupWithImage.setEventListeners()

//Instancia de Section
const section = new Section({
  items: initialCards, 
  renderer: (item)=>{
    const newCard = renderCard(item)
    section.addItem(newCard)
  }
},'.cards__list')
section.renderItems()

//Instancia de popup de pefil
const popupEditProfile = new PopupWithForm('#edit-popup', (datos)=>{
  user.setUserInfo(datos)
  popupEditProfile.close()
})
popupEditProfile.setEventListeners()

//Instancia del popup de formulario de tarjeta
const popupCardForm = new PopupWithForm('#new-card-popup', (datos)=>{
  const formData =  {name: datos["place-name"], link: datos['link']}
  const newCard = renderCard(formData)
  section.addItem(newCard)
  popupCardForm.close()
})
popupCardForm.setEventListeners()


// --------------------------------
//     FUNCIONES PARA MANEJAR MODALES
// --------------------------------

// Maneja la apertura del modal de edición de perfil
function handleOpenEditModal() {
  const userData = user.getUserInfo()
  profileValidator.resetValidation()
  popupEditProfile.open()
  nameInput.value = userData.name
  descriptionInput.value = userData.description
}

// Crea una tarjeta y la añade al contenedor especificado
function renderCard(item){
  const card = new Card(item.name, item.link, '#cards__template', ()=>{
    popupWithImage.open(item.link, item.name)
  });
  return card.generateCard()
}


// --------------------------------
//        EVENT LISTENERS
// --------------------------------
// Eventos para el perfil y su modal de edición
profileEditButton.addEventListener('click', handleOpenEditModal);

// Eventos para el modal de añadir nueva tarjeta
profileAddCardBtn.addEventListener("click", () =>{
  popupCardForm.open()
  cardValidator.resetValidation();
});