// отображение информации о пользователе на странице
export default class UserInfo {
  // принимает имя пользователя и информацию о себе.
  constructor({ userName, userDescription, userAvatar }) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
    this._title = document.querySelector(this._userName);
    this._subtitle = document.querySelector(this._userDescription);
    this._avatar = document.querySelector(this._userAvatar);
  }

  // возвращает объект с данными пользователя. Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._title.textContent,
      about: this._subtitle.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userData) {
    this._title.textContent = userData.name;
    this._subtitle.textContent = userData.about;
    this.setUserAvatar(userData);
  }
}
