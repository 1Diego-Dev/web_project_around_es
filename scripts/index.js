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
import {Api} from './Api.js';
import {PopupWithConfirmation} from './PopupWithConfirmation.js';
import {PopupError} from './PopupError.js';

/*let initialCards = [
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
];*/
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
const profileEditAvatar = profile.querySelector('.profile__avatar-container');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const editForm = document.querySelector('#edit-profile-form');
const profileAddCardBtn = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const profileEditAvatarForm = document.querySelector('#avatar-profile-form');

const profileValidator = new FormValidator(configuracion, editForm);
const cardValidator = new FormValidator(configuracion, newCardForm);
const avatarValidator = new FormValidator(configuracion, profileEditAvatarForm);
const errorPopup = new PopupError('#error-popup');
profileValidator.setEventListeners();
cardValidator.setEventListeners();
avatarValidator.setEventListeners();
errorPopup.setEventListeners();

//------------------------
// Instacias de las clases
//------------------------
//Instancia de la API
const apiConection = new Api({
  baseUrl:'https://around-api.es.tripleten-services.com/v1/', 
  headers: {
    authorization: "69f0bceb-42f6-40c2-a126-e0a21d5bcc5f"
  }
}
);

//Instacia de usuario
const user = new UserInfo({name:".profile__title", description:".profile__description", avatar: ".profile__image"})

//Obtención de información desde la api (datos del usuario y tarjetas)
let section;
let apiData = apiConection.getInitialData()
  .then((res) =>{
    return res
  })
  .then((res)=>{
    user.setUserInfo(res[0])
    //Instancia de Section
    section = new Section({
      items: res[1], 
      renderer: (item)=>{
        const newCard = renderCard(item, res[0]._id)
        section.addItem(newCard);
      }
    },'.cards__list')
    section.renderItems()
  })
  .catch((err)=>{
    errorPopup.showError(err)
    errorPopup.open()
  });



//Instancia de popup con imagen
const popupWithImage = new PopupWithImage("#image-popup")
popupWithImage.setEventListeners()

//Instacia de popup de editar avatar
const popupEditAvatar = new PopupWithForm('#avatar-popup', (datos)=>{
  popupEditAvatar.renderLoading(true);
  apiConection.updateAvatar({avatar: datos["avatar"]})
    .then((res)=>{
      user.setUserInfo(res);
    })
    .catch((err)=>{
      errorPopup.showError(err);
      errorPopup.open();
    })
    .finally(()=>{
      popupEditAvatar.renderLoading(false);
      popupEditAvatar.close()
    })
})
popupEditAvatar.setEventListeners();

//Instancia de popup de pefil
const popupEditProfile = new PopupWithForm('#edit-popup', (datos)=>{
  popupEditProfile.renderLoading(true);
  apiConection.updateUserInfo({name: datos["name"], about: datos["description"]})
    .then((res)=>{
      user.setUserInfo(res);
    })
    .catch((err)=>{
      errorPopup.showError(err);
      errorPopup.open();
    })
    .finally(()=>{
      popupEditProfile.renderLoading(false);
      popupEditProfile.close()
    })


})
popupEditProfile.setEventListeners()

//Instancia del popup de formulario de tarjeta
const popupCardForm = new PopupWithForm('#new-card-popup', (datos)=>{
  const formData =  {name: datos["place-name"], link: datos['link']}
  popupCardForm.renderLoading(true);
  apiConection.addCard({name: formData.name, link: formData.link})
    .then((res)=>{
      const userId = user.getUserId()
      const newCard = renderCard(res, userId)
      section.addItem(newCard)
      popupCardForm.close()
    })
    .catch((err)=>{
      errorPopup.showError(err);
      errorPopup.open();
    })
    .finally(()=>{
      popupCardForm.renderLoading(false);
    })
})
popupCardForm.setEventListeners();

//Instancia de popup para eliminar tarjeta
const popupConfirmDeleteCard = new PopupWithConfirmation("#confirm-delete-popup")
popupConfirmDeleteCard.setEventListeners()

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
function renderCard(item, userId){

  const card = new Card(
    item.name, 
    item.link, 
    '#cards__template', 
    ()=>{
      popupWithImage.open(item.link, item.name)
    }, 
    item.owner, 
    userId, 
    ()=>{
      popupConfirmDeleteCard.open();
      popupConfirmDeleteCard.setConfirmation(()=>{
        popupConfirmDeleteCard.renderLoading(true);
        apiConection.deleteCard(item._id)
          .then((res)=>{
            card.removeCard();
            popupConfirmDeleteCard.close();
          })
          .catch((err)=>{
            errorPopup.showError(err);
            errorPopup.open();
          })
          .finally(()=>{
            popupConfirmDeleteCard.renderLoading(false);
            popupConfirmDeleteCard.close()
          })
      });
    }
  );
  return card.generateCard()
}


// --------------------------------
//        EVENT LISTENERS
// --------------------------------
// Eventos para el perfil y su modal de edición
profileEditButton.addEventListener('click', handleOpenEditModal);

profileEditAvatar.addEventListener('click',()=>{
  popupEditAvatar.open();

})

// Eventos para el modal de añadir nueva tarjeta
profileAddCardBtn.addEventListener("click", () =>{
  popupCardForm.open()
  cardValidator.resetValidation();
});