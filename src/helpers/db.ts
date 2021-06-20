import { getConnection, createConnection, ConnectionOptions } from 'typeorm';
import { config } from '../common/ormconfig';

const connectToDB = async () => {
  let connection;
  try {
    connection = getConnection();
  } catch (err) {
    console.error('connection error', err);
  }
  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      const conf = config as ConnectionOptions;
      await createConnection(conf);
    }
    console.log('connected!');
  } catch (err) {
    console.error('connection error', err);
  }
};
