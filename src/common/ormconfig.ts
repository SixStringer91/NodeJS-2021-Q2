import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../entities/user.entity';
import { Board } from '../entities/board.entity';
import { Task } from '../entities/task.entity';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config = {
  type: 'postgres',
  synchronize: false,
  host: process.env['DB_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [User, Board, Task],
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  migrationsRun: true,
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: '/src/migration'
  }
} as ConnectionOptions;

export=config;
