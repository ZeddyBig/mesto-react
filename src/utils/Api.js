class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
      // тело конструктора
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => this._getResponseData(res))
    }

    editProfile(info) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
        .then(res => this._getResponseData(res))
    }

    addCard(obj) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        })
        .then(res => this._getResponseData(res))
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => this._getResponseData(res))
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => this._getResponseData(res))
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
        .then(res => this._getResponseData(res))
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: `${isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
        .then(res => this._getResponseData(res))
    }

    updateAvatar(obj) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: obj.avatar
            })
        })
        .then(res => this._getResponseData(res))
    }
}
  
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '48897755-cf3d-4a12-816e-942272c6501d',
      'Content-Type': 'application/json'
    }
});