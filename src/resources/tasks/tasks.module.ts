import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Task } from './entities/task.entity';
import { UsersModule } from 'resources/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
