export default class FormValidator {
  constructor(settings, form) {
   this._settings = settings;
   this._formElement = form;
  };

  /* Функция, которая добавляет класс с ошибкой. */
  _showInputError = (inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции.
    const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр.
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке.
    errorElement.classList.add(this._settings.errorClass);
  };

  /* Функция, которая удаляет класс с ошибкой. */
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки.
    const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    // Скрываем сообщение об ошибке.
    errorElement.classList.remove(this._settings.errorClass);
    // Очистим ошибку.
    errorElement.textContent = '';
  };

  /* Функция, которая проверяет валидность поля. */
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку.
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит валидацию - скроем.
      this._hideInputError(inputElement);
    }
  };

  /* Сейчас функция checkInputValidity валидирует только один input.
  Но нужно проверить все поля, чтобы настроить статус кнопки.
  Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
  Для этого создадим функцию hasInvalidInput. Она принимает массив полей формы
  и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны. */
  _hasInvalidInput = (inputList) => {
    /* проходим по этому массиву методом some. */
    return inputList.some((inputElement) => {
    /* Если поле не валидно, колбэк вернёт true. Обход массива прекратится
    и вся функция hasInvalidInput вернёт true. */
      return !inputElement.validity.valid;
    })
  };

  /* Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует,
  можно ли разблокировать кнопку сабмита. Но она ничего не делает с самой кнопкой
  «Отправить». Для стилизации нужна функция toggleButtonState. Именно она отключает
  и включает кнопку. Для этого функция hasInvalidInput проверяет валидность полей
  и возвращает true или false. На их основе toggleButtonState меняет состояние кнопки. */

  _toggleButtonState = (inputList, buttonElement) => {
    /* Если есть хотя бы один невалидный инпут. */
    if (this._hasInvalidInput(inputList)) {
      /* сделай кнопку неактивной. */
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      /* Чтобы не было возможности добавлять пустые карточки по нажатию на Enter
      при визуально заблокированной кнопке нужно добавить атрибут Disable. */
      buttonElement.setAttribute('disabled', true);
    } else {
      /* иначе сделай кнопку активной. */
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      /* а здесь атрибут удалить. */
      buttonElement.removeAttribute('disabled', true);
    }
  };

  /* Пусть слушатель событий добавится всем полям ввода внутри формы.
  Создадим функцию setEventListener. */
  setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    /* Вызовем toggleButtonState, чтобы не ждать ввода данных в поля. */
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      /* каждому полю добавим обработчик события input. */
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  clearForm = () => {
    this._formElement.reset();

    /* блокировка кнопки submit */
    const popupSaveBtns = Array.from(this._formElement.querySelectorAll('.popup__button-save'));
    popupSaveBtns.forEach((popupSaveBtn) => {
      popupSaveBtn.classList.add('popup__button-save_inactive');
      popupSaveBtn.setAttribute('disabled', true);
    });

    /* очищение ошибок инпутов */
    const popupInputsErrors = Array.from(this._formElement.querySelectorAll('.popup__input-error'));
    popupInputsErrors.forEach((popupInputError) => {
      popupInputError.textContent = '';
    });

    /* удаление красного подчеркивания ошибки инпутов */
    const popupInputsErrorsRedBorder = Array.from(this._formElement.querySelectorAll('.popup__input'));
    popupInputsErrorsRedBorder.forEach((popupInputErrorRedBorder) => {
      popupInputErrorRedBorder.classList.remove('popup__input_type_error');
    });
  };

  /* Добавление обработчиков всем формам. */
  enableValidation = () => {
    this.setEventListeners();
  };
}
