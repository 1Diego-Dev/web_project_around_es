class PopupWithForm extends Popup{
  constructor(popupSelector, handleForm){
    super(popupSelector)
    this._handleForm = handleForm
    this._popupForm = this._currentPopup.querySelector(".popup__form")
    this._formImputs = this._popupForm.querySelectorAll(".popup__input"); 
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

  close(){
    super.close();
    this._popupForm.reset()
  }
}

export {PopupWithForm}