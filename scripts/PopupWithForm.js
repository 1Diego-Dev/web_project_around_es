import { Popup } from './Popup.js';
class PopupWithForm extends Popup{
  constructor(popupSelector, handleForm){
    super(popupSelector)
    this._handleForm = handleForm
    this._popupForm = this._currentPopup.querySelector(".popup__form")
    this._formImputs = this._popupForm.querySelectorAll(".popup__input"); 

    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues(){
    const formValues = {}
    this._formImputs.forEach(input => {
      formValues[input.name] = input.value
    });

    return formValues;
  }

  setEventListeners(){
    super.setEventListeners()
    this._popupForm.addEventListener("submit", (event)=>{
      event.preventDefault();
      this._handleForm(this._getInputValues())
    })
  }
  renderLoading(isLoading){
    if (isLoading == true){
      this._submitButton.textContent = "Guardando..."
    }else{
      this._submitButton.textContent = this._originalButtonText
    }
  }
  close(){
    super.close();
    this._popupForm.reset()
  }
}

export {PopupWithForm}