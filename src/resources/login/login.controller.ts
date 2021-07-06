import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';

interface ILogin {
  login: string;
  password: string;
}

interface IAuth extends User {
  token: string;
  message: string;
}

export const userLoginController = async ({
  login,
  password
}: ILogin): Promise<IAuth | void> => {
  const user = await getRepository(User).findOne({ login });
  return new Promise((resolve, reject) => {
    if (user) {
      bcrypt.compare(password, user.password, (_err, matches) => {
        if (matches) {
          const token = jwt.sign(
            { id: user.id },
            process.env['JWT_SECRET_KEY'] as string,
            { expiresIn: 60 * 60 * 24 }
          );
          resolve({
            ...User.toResponse(user),
            token,
            message: 'Successfully authenticated.'
          } as IAuth);
        }
        reject();
      });
    }
  });
};
