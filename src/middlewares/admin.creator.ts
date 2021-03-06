import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

export const createUserAdmin = async (): Promise<void> => {
  const userRepository = getRepository(User);
  const findedUser = await userRepository.findOne({ login: 'admin' });
  if (!findedUser) {
    const newUser = userRepository.create({
      name: 'admin',
      login: 'admin',
      password: bcrypt.hashSync('admin', 10)
    });
    await userRepository.save(newUser);
    console.log('user admin was succsesful created');
    return;
  }
  console.log('user admin is exists in database');
};
