class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._imageElement = this._currentPopup.querySelector(".popup__image");
    this._captionElement = this._currentPopup.querySelector(".popup__caption");
  }
  open(link, name){
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
  }
}

export {PopupWithImage}