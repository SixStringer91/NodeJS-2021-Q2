import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAll() {
    const userRepository = await this.userRepository.find({ where: {} });
    const toResponse = userRepository.map(User.toResponse) as Omit<
      User,
      'password'
    >[];
    return toResponse;
  }

  async createUser(user: User) {
    const newUser = this.userRepository.create({
      name: user.name,
      login: user.login,
      password: bcrypt.hashSync(user.password, 10)
    });
    const updatedUser = await this.userRepository.save(newUser);
    return User.toResponse(updatedUser);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user) return User.toResponse(user);
    return null;
  }

  async updateUser(obj: Omit<User, 'password' | 'name' | 'login'>) {
    const findedUser = await this.userRepository.findOne(obj.id);
    if (!findedUser) return null;
    const reducedData = { ...findedUser, ...obj };
    const updatedUser = await this.userRepository.update(obj.id, reducedData);
    if (updatedUser.affected) return User.toResponse(reducedData);
    return null;
  }

  async deleteUser(id: string) {
    const deletionRes = await this.userRepository.delete(id);
    if (deletionRes.affected) return true;
    return false;
  }

  async auth({ login, password }) {
    const user = await this.userRepository.findOne({ login });
    return new Promise((resolve, reject) => {
      if (user) {
        bcrypt.compare(password, user.password, (_err, matches) => {
          if (matches) {
            const token = jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET_KEY as string,
              { expiresIn: 60 * 60 * 24 }
            );
            resolve({
              ...User.toResponse(user),
              token,
              message: 'Successfully authenticated.'
            });
          }
          reject();
        });
      }
    });
  }
}
