// ELEMENTOS
// Array que contiene los datos iniciales de las tarjetas (nombre y URL de la imagen)
let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

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
}

// Función para cerrar cualquier modal eliminando la clase de visibilidad
function closeModal(popup) {
  popup.classList.remove(OPEN_CLASS);
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
  openModal(editPopup);
}



// --------------------------------
//       ENVÍO DEL FORMULARIO
// --------------------------------

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
}

function getCardElement(name = "Sin título", linkSrc = "./images/placeholder.jpg"){
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
profileAddBtn.addEventListener("click", () =>openModal(newCardPopup));
popupCloseCard.addEventListener("click", ()=> closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Evento para cerrar el modal de visualización de imágenes
popupImagesClose.addEventListener("click", ()=> closeModal(imagesPopup));