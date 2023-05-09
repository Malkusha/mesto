class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._description = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
    };
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.about;
  }

  setUserAvatar(item) {
    this._avatar.src = item.avatar;
  }
}

export {UserInfo}
