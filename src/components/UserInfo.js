import {nameInput, descriptionInput} from '../utils/constants.js';

class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    nameInput.value = this._name.textContent;
    descriptionInput.value = this._description.textContent;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.description;
  }
}

export {UserInfo}
