class Card {
  constructor (item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like_type_on');
  }

  _deleteCard(evt) {
    evt.target.parentElement.remove();
  }

  addCard() {
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.elements__item-image');
    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete');
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;
    this._element.querySelector('.elements__item-title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLike);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}

export {Card}
