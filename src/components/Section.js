// отвечает за отрисовку элементов на странице
export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    // items - массив данных, добавляемый на страницу при создании класса
    this._initialArray = items;
    // renderer - функция колбэк, отвечающая за cоздание экземпляров карточек и их вставку в разметку
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

  };

  // отвечает за отрисовку всех элементов
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  };

  // принимает element из template и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  };
}
