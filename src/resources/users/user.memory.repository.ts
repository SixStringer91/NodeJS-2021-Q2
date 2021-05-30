import User from './user.model';

const USERS: User[] = [];
export const getAll = async (): Promise<User[]> => USERS;
export const createNewUser = (user: User): User | void => {
  const newUser = USERS.push(user);
  return USERS[newUser - 1];
};
export const getOneUser = async (id: string): Promise<User | void> => USERS
  .find((user: User) => id === user['id']);
export const updateUser = (obj:
{ id:string, name?:string, password?:string, login?:string }): User | void => {
  const userIndex = USERS.findIndex((user) => obj.id === user['id']);
  USERS[userIndex] = { ...USERS[userIndex], ...obj };
  return USERS[userIndex];
};
export const deleteUser = async (id: string): Promise<User[]> => USERS
  .splice(USERS.findIndex((user) => id === user['id']), 1);