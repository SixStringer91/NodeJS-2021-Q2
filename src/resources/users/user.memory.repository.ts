import User from './user.model';

const USERS: User[] = [];
const getAll = async (): Promise<User[]> => USERS;
const createNewUser = (user: User): User | void => {
  const newUser = USERS.push(user);
  return USERS[newUser - 1];
};
const getOneUser = async (id: string): Promise<User | void> => USERS
  .find((user: User) => id === user['id']);
const updateUser = (obj:
{ id:string, name?:string, password?:string, login?:string }): User | void => {
  const userIndex = USERS.findIndex((user) => obj.id === user['id']);
  USERS[userIndex] = { ...USERS[userIndex], ...obj };
  return USERS[userIndex];
};
const deleteUser = async (id: string): Promise<User[]> => USERS
  .splice(USERS.findIndex((user) => id === user['id']), 1);

export default {
  getAll, createNewUser, getOneUser, updateUser, deleteUser,
};
