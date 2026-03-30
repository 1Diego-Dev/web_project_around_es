class Card{
  constructor(text, link, cardSelector, handleCardClick){
    this._text = text;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
    this._element = this._getTemplate(); 
  }
  _getTemplate(){
    console.log("El selector es:", this._cardSelector);
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
      this._handleCardClick(this._text,this._link);
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