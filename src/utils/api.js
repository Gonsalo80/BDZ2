const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl= baseUrl;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
        }).then(onResponce)
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U3YWU2MjU5Yjk4YjAzOGY3N2I1MjAiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MTI4OTQ3LCJleHAiOjE3MDc2NjQ5NDd9.jRQrKz6I1M_IryAZ3ZgB_6zgr1-XBfonXa9whnGMgfo'
    }
}

const api = new Api(config);

export default api;