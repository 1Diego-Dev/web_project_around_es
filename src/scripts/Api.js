class Api{
  constructor({baseUrl, headers}){
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _checkResponse(res){
    if(res.ok){
      return res.json()
    }else{
      return Promise.reject(`Error: ${res.status}`)
    }
  }

  getInitialCards(){
    return fetch(`${this.baseUrl}/cards/`,{
      headers:this.headers
    })
    .then((res) =>{
      return this._checkResponse(res);
    })
  }

  getUserInfo(){
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers:this.headers
    }).then((res) =>{
      return this._checkResponse(res);
    })
  }

  getInitialData(){
    const promises = [this.getUserInfo(), this.getInitialCards()]
    return Promise.all(promises)
  }

  updateUserInfo({name, about}){
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers:this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res)=>{
      return this._checkResponse(res);
    })
  }

  addCard({name, link}){
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers:this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res)=>{
      return this._checkResponse(res);
    })
  }

  handleLike(cardId, like){
    if(like==true){
      return fetch(`${this.baseUrl}/cards/${cardId}`,{
          method:"DELETE",
          headers: this.headers,
        }
      ).then((res)=>{
        return this._checkResponse(res);
      })  
    }else{
      return fetch(`${this.baseUrl}/cards/${cardId}`,{
          method:"PUT",
          headers: this.headers,
        }
      ).then((res)=>{
        return this._checkResponse(res);
      }) 
    }
  }

  deleteCard(cardId){
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: "DELETE",
      headers:this.headers
    })
    .then((res) =>{
      return this._checkResponse(res);
    })
  }

  updateAvatar({avatar}){
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:this.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res)=>{
      return this._checkResponse(res);
    })
  }
}

export {Api}