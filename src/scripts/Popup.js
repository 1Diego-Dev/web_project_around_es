class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector
    this._currentPopup = document.querySelector(this._popupSelector);
  }
  _handleEscClose(event){
    if (event.key === "Escape"){
      this.close()
    }
  }
  open(){
    this._currentPopup.classList.add("popup_is-opened");
    this._escListener = (event => {
      this._handleEscClose(event)
    });
    document.addEventListener("keydown", this._escListener);
  }
  close(){
    this._currentPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._escListener);
  }
  setEventListeners(){
    this._currentPopup.addEventListener("mousedown", (event)=>{
      if (event.target === event.currentTarget) {
        this.close();
      }
      // Cierra si el clic es en el botón de la X
      if (event.target.classList.contains("popup__close")) {
        this.close();
      }
    })
  }
}

export {Popup}