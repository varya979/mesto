export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
       /** res.json возвращает объект ответа с сервера в виде ппромиса. Из него можно достать нужные данные */
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // загрузка информации о пользователе с сервера
  getUserInfoFromServer() {
    /** метод fetch создает запрос на сервер и возвращает его ответ. На вход принимает два аргумента:
     * первый - обязательный - url сервера,
     * второй - необязательный - объект опций (method, headers, body)/
     * Fetch асинхронный - вызываем его и он создает промис - запрос на асинхронный код
     * (т.е. выполни вот этот код и по результатам переведи промис в статус «исполнен» или «отклонён») */
    return fetch(
      `${this._url}/users/me`,
      /** метод не прописываю, т.к. по умолчанию он итак GET */
      { headers: this._headers }
    )
    /** Результат промиса прописываем в цепочке методов then и catch. Они принимают колбэк с одним параметром - то,
     * что вернул предыдущий then или catch */
    .then(res => {
      return this._checkAnswer(res)
    })
    // второй then в index.js
  }

  // изменение информации о пользователе на сервере
  setUserInfoToServer(info) {
    return fetch(
      `${this._url}/users/me`,
      {
      /** PATCH - метод частичного обновления данных на сервере */
      method: 'PATCH',
      headers: this._headers,
      // объект с данными приводим к строке
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }

  // загрузка карточек с сервера
  getCardsFromServer() {
    return fetch(
      `${this._url}/cards`,
      { headers: this._headers }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }

  // загрузка карточки на сервер
   setCardToServer(card) {
    return fetch(
      `${this._url}/cards`,
      {
      /** POST - метод отправки данных на сервер */
      method: 'POST',
      headers: this._headers,
      /**  чтобы отправить данные на сервер их нужно перевести в формат JSON,
       * поэтому объект с данными приводим к строке */
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
   }


  // удаление карточки с сервера
  deleteCardFromServer(card) {
    return fetch(
      `${this._url}/cards/${card}`,
      {
      method: 'DELETE',
      headers: this._headers
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }

  //  постановка лайка
 putLike(card) {
    return fetch(
      `${this._url}/cards/${card._id}/likes`,
      {
      /** метод PUT предназначен для полного обновления указанного ресурса */
      method: 'PUT',
      headers: this._headers
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }

  // удаление лайка
  deleteLike(card) {
    return fetch(
      `${this._url}/cards/${card._id}/likes`,
      {
        /** DELETE - метод удаления данных с сервера */
      method: 'DELETE',
      headers: this._headers
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }

  // обновление аватара
  changeUserAvatar(data) {
    return fetch(
      `${this._url}/users/me/avatar`,
      {
      method: 'PATCH',
      headers: this._headers,
      // объект с данными приводим к строке
      body: JSON.stringify({
        avatar: data.avatar,
      })
      }
    )
    .then(res => {
      return this._checkAnswer(res)
    })
  }
}




