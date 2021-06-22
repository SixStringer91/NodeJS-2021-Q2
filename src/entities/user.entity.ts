import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { Task } from './task.entity';

@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 40 })
  name: string;

  @Column('varchar', { length: 40 })
  login: string;

  @Column('varchar', { length: 40 })
  password: string;

  @OneToMany<Task>(() => Task, (task: Task): string | null => task.userId, { cascade: true })
  tasks: Task[];

  static toResponse = (user: User):Omit<User, 'password'> => {
    const {
      id, name, login, tasks
    } = user;
    return {
      id, name, login, tasks
    };
  };
}
