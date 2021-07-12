import dotenv from 'dotenv';
import path from 'path';
import { User } from '../resources/users/entities/user.entity';
import { Board } from '../resources/boards/entities/board.entity';
import { Task } from '../resources/tasks/entities/task.entity';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config =  {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || process.env.DB_HOST,
  port:
    parseInt(<string>process.env.POSTGRES_PORT) ||
    parseInt(<string>process.env.DB_PORT),
  username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
  password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.POSTGRES_DB || process.env.DB_NAME,
  entities: [User, Board, Task],
  synchronize: false,
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  cli: {
    migrationsDir: "src/migration"
  }
};

export default config;

