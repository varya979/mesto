export default class Section {
  constructor ({ data, renderer }, containerSelector) {
    // item - массив данных, которые нужно добавить на страницу при инициализации класса
    // renderer - функция колбэк, отвечающая за cоздание экземпляров карточек и их вставку в разметку
    // containerSelector - селектор контейнера, в который нужно добавлять созданные элементы
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  // публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  };

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  };
}
