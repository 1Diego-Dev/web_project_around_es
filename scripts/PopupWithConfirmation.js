import { Popup } from './Popup.js';
class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._confirmationBtn = this._currentPopup.querySelector(".popup__button");
    this._originalButtonText = this._confirmationBtn.textContent
    this._handleConfirmation = ()=>{};
    this._confirmationBtn.addEventListener("click", ()=>{
      this._handleConfirmation()
    });
  }
  renderLoading(isLoading){
    if (isLoading == true){
      this._confirmationBtn.textContent = "Eliminando..."
    }else{
      this._confirmationBtn.textContent = this._originalButtonText
    }
  }
  setConfirmation(confirmation){
    this._handleConfirmation = confirmation;
  }
}

export {PopupWithConfirmation};