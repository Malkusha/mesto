class Section {
  constructor (renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}

export {Section}
