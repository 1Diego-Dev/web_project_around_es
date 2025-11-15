// ELEMENTOS
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

const editPopup = document.querySelector('#edit-popup');
const editForm = document.querySelector('#edit-profile-form');
const popupCloseButton = editPopup.querySelector('.popup__close');

const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');

// Clase que abre el popup
const OPEN_CLASS = 'popup_is-opened';


// --------------------------------
//        FUNCIONES BASE
// --------------------------------

// Abre el modal
function openModal(popup) {
  popup.classList.add(OPEN_CLASS);
}

// Cierra el modal
function closeModal(popup) {
  popup.classList.remove(OPEN_CLASS);
}


// --------------------------------
//     FUNCIONES PARA MANEJAR MODAL
// --------------------------------

// 1) Rellena los campos del formulario con los valores actuales del perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// 2) Rellena + abre modal (llama a las funciones anteriores)
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// --------------------------------
//       ENVÍO DEL FORMULARIO
// --------------------------------

function handleProfileFormSubmit(event) {
  event.preventDefault();

  // Actualiza perfil
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// --------------------------------
//        EVENT LISTENERS
// --------------------------------

profileEditButton.addEventListener('click', handleOpenEditModal);

popupCloseButton.addEventListener('click', () => closeModal(editPopup));

editForm.addEventListener('submit', handleProfileFormSubmit);
