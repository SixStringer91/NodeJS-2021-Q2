import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 25 })
  name = 'USER';

  @Column('varchar', { length: 25 })
  login = 'user';

  @Column('varchar', { length: 25 })
  password = 'P@55w0rd';

  static toResponse = (user: User):Omit<User, 'password'> => {
    const { id, name, login } = user;
    return { id, name, login };
  };
}

// [keys: string]: string;

// }
