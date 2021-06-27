import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';

const getAll = async (): Promise<Omit<User, 'password'>[]> => {
  const userRepository = await getRepository(User).find({ where: {} });
  const toResponse = userRepository
    .map(User.toResponse) as Omit<User, 'password'>[];
  return toResponse;
};

const getOneUser = async (id: string):
Promise<Omit<User, 'password'> | null> => {
  const user = await getRepository(User).findOne(id);
  if (user) return User.toResponse(user);
  return null;
};

const createNewUser = async (user: User): Promise<Omit<User, 'password'>> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create({
    name: user.name,
    login: user.login,
    password: bcrypt.hashSync(user.password, 10)
  });
  const updatedUser = await userRepository.save(newUser);
  return User.toResponse(updatedUser);
};

const updateUser = async (obj:
{ id:string, name?:string, password?:string, login?:string }): Promise<Omit<User, 'password'> | null> => {
  const userRepository = getRepository(User);
  const findedUser = await userRepository.findOne(obj.id);
  if (!findedUser) return null;
  const reducedData = { ...findedUser, ...obj };
  const updatedUser = await userRepository.update(obj.id, reducedData);
  if (updatedUser.affected) return User.toResponse(reducedData);
  return null;
};

const deleteUser = async (id: string): Promise<boolean> => {
  const studentRepositiory = getRepository(User);
  const deletionRes = await studentRepositiory.delete(id);
  if (deletionRes.affected) return true;
  return false;
};

export default {
  getAll, createNewUser, getOneUser, updateUser, deleteUser
};
