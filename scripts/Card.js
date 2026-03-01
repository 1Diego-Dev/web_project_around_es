import {imagesPopup, popupImage, popupCaption, openModal, closeModal, handleEscOption} from './utils.js';


class Card{
  constructor(text, link, cardSelector){
    this._text = text;
    this._link = link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate(); 
  }
  _getTemplate(){
    console.log("El selector es:", this._templateSelector);
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  _setDataCard(){
    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    cardTitle.textContent = this._text;
    cardImage.src = this._link;
    cardImage.alt = this._text;
  }
  _setLikeEventListener(){
    this._element.querySelector(".card__description").querySelector(".card__like-button").addEventListener("click", (btn) =>{
      btn.target.classList.toggle("card__like-button_is-active")
    });
  }

  _setDeleteEventListener(){
    this._element.querySelector(".card__delete-button").addEventListener("click", (deleteBtn)=>{
      deleteBtn.target.closest(".card").remove()
    });
  }
  _setZoomListener(){
    this._element.querySelector(".card__image").addEventListener("click", ()=>{
    popupCaption.textContent = this._text;
    popupImage.src = this._link;
    popupImage.alt = this._text;

    openModal(imagesPopup);
  });
  }
  generateCard(){
    this._setDataCard();
    this._setLikeEventListener();
    this._setDeleteEventListener();
    this._setZoomListener();
    return this._element;
  }
}

export {Card}