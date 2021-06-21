import { User } from '../../entities/user.entity';
import usersRepo from './user.memory.repository';

export const getAll = (): Promise<Omit<User, 'password'>[]> => usersRepo.getAll();
export const getUser = (id: string):Promise<Omit<User, 'password'> | null> => usersRepo.getOneUser(id);
export const createUser = (user: User): Omit<User, 'password'> => usersRepo.createNewUser(user);
export const updateUser = (obj:
{
  id:string,
  name?:string,
  password?:string,
  login?:string }):Promise<Omit<User, 'password'> | void> => usersRepo.updateUser(obj);
export const deleteUser = (id: string):Promise<boolean> => usersRepo.deleteUser(id);
