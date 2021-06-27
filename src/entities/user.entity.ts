import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import jwt from 'jsonwebtoken';
import { Task } from './task.entity';

export interface IUserToRes extends Omit<User, 'password'> {
  token:string,
  message?:string
}

@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 40, nullable: true })
  name: string | null;

  @Column('varchar', { length: 40 })
  login: string;

  @Column('varchar', { length: 200 })
  password: string;

  @OneToMany<Task>(() => Task, (task: Task): string | null => task.userId, { cascade: true })
  tasks: Task[];

  static toResponse = (user: User):IUserToRes => {
    const {
      id, name, login, tasks
    } = user;
    const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
    return {
      id, name, login, token, tasks
    };
  };
}
