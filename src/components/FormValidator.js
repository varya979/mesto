// отвечает за валидацию форм
export default class FormValidator {
  constructor(settings, form) {
   this._settings = settings;
   this._formElement = form;
  };

  // Функция, которая добавляет класс с ошибкой.
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции.
    const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
     // Заменим содержимое span с ошибкой на переданный параметр.
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке.
    errorElement.classList.add(this._settings.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки.
    const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    // Скрываем сообщение об ошибке.
    errorElement.classList.remove(this._settings.errorClass);
    // Очистим ошибку.
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля.
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку.
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит валидацию - скроем.
      this._hideInputError(inputElement);
    }
  };

  // Сейчас функция checkInputValidity валидирует только один input.
  // Но нужно проверить все поля, чтобы настроить статус кнопки.
  // Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
  // Для этого создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true,
  // если в нём хотя бы одно поле не валидно, и false, если все валидны.
  _hasInvalidInput = () => {
    // проходим по этому массиву методом some.
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true.
      return !inputElement.validity.valid;
    })
  };

  // Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует,
  // можно ли разблокировать кнопку сабмита. Но она ничего не делает с самой кнопкой «Отправить».
  // Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку.
  // Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false.
  // На их основе toggleButtonState меняет состояние кнопки.
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут.
    if (this._hasInvalidInput(this._inputList)) {
       // сделай кнопку неактивной.
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      // Чтобы не было возможности добавлять пустые карточки по нажатию на Enter при визуально заблокированной кнопке нужно добавить атрибут Disable.
      this._buttonElement.setAttribute('disabled', true);
      // иначе сделай кнопку активной.
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      // а здесь атрибут удалить.
      this._buttonElement.removeAttribute('disabled', true);
    }
  };

  // Пусть слушатель событий добавится всем полям ввода внутри формы. Создадим функцию setEventListener.
  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля.
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
       // каждому полю добавим обработчик события input.
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation() {
    // управляем кнопкой
    this._toggleButtonState();
    // очищаем ошибки
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

   // Добавление обработчиков всем формам
  enableValidation = () => {
    this._setEventListeners();
  };
}
