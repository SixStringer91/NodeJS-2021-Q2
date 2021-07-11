import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createUserAdmin } from './utils/admin.creator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createUserAdmin();
  await app.listen(8080);
}
bootstrap();
