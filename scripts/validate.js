// Функция, которая добавляет класс с ошибкой.
// Передадим текст ошибки вторым параметром.
const showInputError = (formElement, inputElement, errorMessage, objectKey) => {
  // Находим элемент ошибки внутри самой функции.
  const errorElement = formElement.querySelector(`.popup__input-error-${inputElement.id}`);
  inputElement.classList.add(objectKey.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр.
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке.
  errorElement.classList.add(objectKey.errorClass);
};



// Функция, которая удаляет класс с ошибкой.
const hideInputError = (formElement, inputElement, objectKey) => {
  // Находим элемент ошибки.
  const errorElement = formElement.querySelector(`.popup__input-error-${inputElement.id}`);
  inputElement.classList.remove(objectKey.inputErrorClass);
  // Скрываем сообщение об ошибке.
  errorElement.classList.remove(objectKey.errorClass);
  // Очистим ошибку.
  errorElement.textContent = '';
};



// Функция, которая проверяет валидность поля.
// Функция теперь принимает formElement и inputElement, а не берёт их из внешней области видимости.
const checkInputValidity = (formElement, inputElement, objectKey) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку.
    // Передадим сообщение об ошибке вторым аргументом.
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, objectKey);
  } else {
    // Если проходит валидацию - скроем.
    // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, objectKey);
  }
};



// Сейчас функция checkInputValidity валидирует только один input. Но нужно проверить все поля, чтобы настроить статус кнопки. Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
// Для этого создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
// Функция принимает массив полей.

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some.
  return inputList.some((inputElement) => {
  // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция hasInvalidInput вернёт true.
    return !inputElement.validity.valid;
  })
};



// Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита. Но она ничего не делает с самой кнопкой «Отправить».
// Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку. Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. На их основе toggleButtonState меняет состояние кнопки.
// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять.

const toggleButtonState = (inputList, buttonElement, objectKey) => {
  // Если есть хотя бы один невалидный инпут.
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной.
    buttonElement.classList.add(objectKey.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной.
    buttonElement.classList.remove(objectKey.inactiveButtonClass);
  }
};


// Пусть слушатель событий добавится всем полям ввода внутри формы. Создадим функцию setEventListener.

const setEventListeners = (formElement, objectKey) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from.
  const inputList = Array.from(formElement.querySelectorAll(objectKey.inputSelector));
  // Найдём в текущей форме кнопку отправки.
  const buttonElement = formElement.querySelector(objectKey.submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля.
   toggleButtonState(inputList, buttonElement, objectKey);

  // Обойдём все элементы полученной коллекции.
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input.
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент.
      checkInputValidity(formElement, inputElement, objectKey);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку.
      toggleButtonState(inputList, buttonElement, objectKey);
    });
  });
};



// Добавление обработчиков всем формам. Объявим функцию enableValidation, которая найдёт и переберёт все формы на странице.
const enableValidation = (objectKey) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from.
  const formList = Array.from(document.querySelectorAll(objectKey.formSelector));

  // Переберём полученную коллекцию.
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение.
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы.
    setEventListeners(formElement, objectKey);
  });
};



// Вызовем функцию.
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_active'
});
