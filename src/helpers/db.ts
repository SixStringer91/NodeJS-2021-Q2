import { createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

const connectToDB = async () => {
  await createConnection(config);
  console.log('Success');
};

export const tryBDConnect = async (cb: () => void): Promise<void> => {
  await connectToDB();
  cb();
};
