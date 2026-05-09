class FormValidator{
  constructor(config, formElement){
    this._config = config;
    this._formElement = formElement; 
  }
  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }
  _hasInvalidInput(){
    const inputsElements = this._formElement.querySelectorAll(`.${this._config.inputSelector}`)
    return Array.from(inputsElements).some(input => !input.validity.valid);
  }
  _toggleButtonState(){
    const formBtnElement = this._formElement.querySelector(`.${this._config.submitButtonSelector}`)
    if (this._hasInvalidInput()){
      formBtnElement.disabled = true;
    }else{
      formBtnElement.disabled = false;
    }
  }
  setEventListeners(){
    const inputsList = this._formElement.querySelectorAll(`.${this._config.inputSelector}`);
    const submitFormBtn = this._formElement.querySelector(`.${this._config.submitButtonSelector}`);
    this._toggleButtonState();

    inputsList.forEach(inputElement => {
      inputElement.addEventListener("input", (input)=>{
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
        
      });
    });
  }

  resetValidation(){
    this._toggleButtonState()
    this._formElement.querySelectorAll(`.${this._config.inputSelector}`).forEach((input)=>{
      this._hideInputError(input)
    })
  }
}
export {FormValidator};