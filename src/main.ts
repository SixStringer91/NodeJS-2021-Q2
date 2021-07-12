import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createUserAdmin } from './utils/admin.creator';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env')
});

async function bootstrap() {
  const isFastify = JSON.parse(process.env.USE_FASTIFY.toLowerCase());
  const app = isFastify
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      )
    : await NestFactory.create(AppModule);
  createUserAdmin();
  await app.listen(8080, '0.0.0.0');
  console.log(`enabled ${isFastify ? 'fastify' : 'express'}`);
}
bootstrap();
