import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../entities/user.entity';
import { Board } from '../entities/board.entity';
import { Task } from '../entities/task.entity';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const config = {
  type: 'postgres',
  synchronize: true,
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  entities: [User, Board, Task],
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000
} as ConnectionOptions;
