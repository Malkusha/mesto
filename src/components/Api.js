class Api {
  constructor(options) {
    this.options = options;
  }

  getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-65/users/me', {
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setProfileInfo(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setAvatar(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  loadNewCard(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      method: 'POST',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link/*,
        likes: item.likes*/
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '6dcf86ea-a786-4e93-bf7e-fefacd66ef6b'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}

export {Api}
