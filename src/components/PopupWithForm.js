import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    // функция колбэк, отвечающая за действия, происходящие при отправке формы — добавление данных полей ввода на страницу
    this._handleFormSubmit = handleFormSubmit;
    this.formElement = this._popup.querySelector('.popup__form');
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll('.popup__input');
  };

  // приватный метод, который собирает данные всех полей формы.
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  };

  // перезаписывает родительский метод. Метод должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
    });
  };

  // перезаписывает родительский метод, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this.formElement.reset();
  };
}
