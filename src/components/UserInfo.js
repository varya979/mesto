// отображение информации о пользователе на странице
export default class UserInfo {
  // принимает имя пользователя и информацию о себе.
  constructor ({ userName, userDescription }) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._title = document.querySelector(this._userName);
    this._subtitle = document.querySelector(this._userDescription);
  };

  // возвращает объект с данными пользователя. Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._title.textContent,
      description: this._subtitle.textContent,
    };
    return userData;
  };

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userData) {
    this._title.textContent = userData.name;
    this._subtitle.textContent = userData.description;
  };
}
