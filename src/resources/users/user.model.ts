import uuid from 'uuid';

export default class User {
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this['id'] = id;
    this['name'] = name;
    this['login'] = login;
    this['password'] = password;
  }

  [keys: string]: string;

  static toResponse(
    user: User,
  ): {
      id: string;
      name: string;
      login: string;
    } | null {
    const { id, name, login } = user;
    if (id && name && login) {
      return { id, name, login };
    }
    return null;
  }
}
