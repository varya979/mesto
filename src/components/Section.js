// отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ renderer }, containerSelector) {
    // renderer - функция колбэк, отвечающая за cоздание экземпляров карточек и их вставку в разметку
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отвечает за отрисовку всех элементов
  renderItems(cards) {
    cards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItemToTheEnd(card) {
    this._container.append(card);
  }

  addItemToTheStart(card) {
    this._container.prepend(card);
  }
}
