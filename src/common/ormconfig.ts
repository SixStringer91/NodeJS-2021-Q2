import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { ConnectionOptions } from 'tls';
import { fileURLToPath } from 'url';

// const _filename = fileURLToPath(import.meta.url);
const curDirname = dirname(__filename);

dotenv.config({
  path: path.join(curDirname, '../../.env')
});

export const config = {
  type: 'postgres',
  name: 'my-connection',
  synchronize: true,
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000
};
