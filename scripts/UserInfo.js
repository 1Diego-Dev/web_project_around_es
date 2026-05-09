class UserInfo{
  constructor({name, description, avatar}){
    this._nameElement = document.querySelector(name);
    this._descriptionElement = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._id = "";
  }

  getUserInfo(){
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo({name, about, avatar, _id}){
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  getUserId(){
    return this._id;
  }
}

export {UserInfo}