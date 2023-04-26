class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.description;
  }
}

export {UserInfo}
