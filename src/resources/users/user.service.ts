import User from './user.model';

const usersRepo = require('./user.memory.repository');

export const getAll = (): Promise<User[]> => usersRepo.getAll();
export const getUser = (id: string):User => usersRepo.getOneUser(id);
export const createUser = (user: User):User => usersRepo.createNewUser(user);
export const updateUser = (obj:
{
  id:string,
  name?:string,
  password?:string,
  login?:string }):User | void => usersRepo.updateUser(obj);
export const deleteUser = (id: string):Promise<User[]> => usersRepo.deleteUser(id);
