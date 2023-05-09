class Card {
  constructor (item, templateSelector, handleCardClick, popup, userId, data, handleDeleteCard, handleLikeCard) {
    this._name = item.name;
    this._link = item.link;
    this._popup = popup;
    this._likes = item.likes;
    this.data = data;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._id = item._id;
    this._isOwner = item.owner._id === this._userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('elements__like_type_on');
  }

  _deleteCard() {
    this._element.remove();
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  addCard() {
    this._element = this._getTemplate();
    this._itemImage = this._element.querySelector('.elements__item-image');
    this._likeButton = this._element.querySelector('.elements__like');
    if (this.isLiked()) {
      this._likeButton.classList.add('elements__like_type_on');
    };
    this._deleteButton = this._element.querySelector('.elements__delete');
    if (this._isOwner) {
      this._deleteButton.classList.add('elements__delete_type_visible');
    };
    this._likesCount = this._element.querySelector('.elements__likes-count');
    this._itemImage.src = this._link;
    this._itemImage.alt = this._name;
    this._likesCount.textContent = this._likes.length;
    this._element.querySelector('.elements__item-title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this.getId(), this);
    });
    this._deleteButton.addEventListener('click', () => {
      this._popup.open();
      this._popup._deleteButton.addEventListener('click', () => {
        this._handleDeleteCard(this.getId(), this);
        this._popup.close();
      });
      this._popup.setEventListener();
    });
    this._itemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  getId() {
    return this._id
  }
}

export {Card}
