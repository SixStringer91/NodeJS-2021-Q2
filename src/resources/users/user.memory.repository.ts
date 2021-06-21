import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';

const getAll = async (): Promise<Omit<User, 'password'>[]> => {
  const userRepository = await getRepository(User).find({ where: {} });
  const toResponse = userRepository
    .map(User.toResponse) as Omit<User, 'password'>[];
  return toResponse;
};

const getOneUser = async (id: string):
Promise<Omit<User, 'password'> | null> => {
  const userRepository = await getRepository(User).findOne(id);
  if (userRepository) return User.toResponse(userRepository);
  return null;
};

const createNewUser = (user: User): Omit<User, 'password'> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(user);
  userRepository.save(newUser);
  return User.toResponse(newUser);
};

const updateUser = async (obj:
{ id:string, name?:string, password?:string, login?:string }): Promise<Omit<User, 'password'> | void> => {
  const userRepository = getRepository(User);
  const findedUser = await userRepository.findOne(obj.id);
  if (!findedUser) return undefined;
  const updateData = {
    name: obj.name || findedUser.name,
    password: obj.password || findedUser.password,
    login: obj.login || findedUser.login
  };
  const reducedData = { ...findedUser, updateData };
  const updatedUser = await userRepository.update(obj.id, reducedData);
  console.log(updatedUser.raw);
  return User.toResponse(reducedData);
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
