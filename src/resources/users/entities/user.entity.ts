import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export interface IUserToRes extends Omit<User, 'password'> {
  token: string;
  message: string;
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

  @OneToMany<Task>(() => Task, (task: Task): string | null => task.userId, {
    cascade: true
  })
  tasks: Task[];

  private static _toResponse = (user: User): IUserToRes => {
    const { id, name, login, tasks } = user;
    const token = jwt.sign(
      { id: user.id },
      process.env['JWT_SECRET_KEY'] as string,
      { expiresIn: 60 * 60 * 24 }
    );
    return {
      id,
      name,
      login,
      token,
      tasks
    } as IUserToRes;
  };
  public static get toResponse() {
    return User._toResponse;
  }
  public static set toResponse(value) {
    User._toResponse = value;
  }
}
