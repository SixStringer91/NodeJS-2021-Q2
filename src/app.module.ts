import { HttpErrorFilter } from './shared/http-error.filter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { LoginModule } from './resources/auth/login.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';
import dotenv from 'dotenv';
import path from 'path';
import { User } from 'resources/users/entities/user.entity';
import { Board } from 'resources/boards/entities/board.entity';
import { Task } from 'resources/tasks/entities/task.entity';

dotenv.config({
  path: path.join(__dirname, '../.env')
});

console.log(process.env['DB_HOST']);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || process.env.DB_HOST,
        port:
          parseInt(<string>process.env.POSTGRES_PORT) ||
          parseInt(<string>process.env.DB_PORT),
        username: process.env.POSTGRES_USER || process.env.DB_USERNAME,
        password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
        database: process.env.POSTGRES_DB || process.env.DB_NAME,
        entities: [User, Board, Task],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
