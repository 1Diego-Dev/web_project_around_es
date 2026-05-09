import { Popup } from './Popup.js';
class PopupError extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }
  showError(messageError){
    this._currentPopup.querySelector('.popup__text').textContent = messageError
    super.open()
  }
}

export {PopupError};