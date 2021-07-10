import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  async findAll(@Param('boardId') boardId: string) {
    const tasks = await this.tasksService.findAll(boardId);
    if (tasks.length) return tasks;
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Param('boardId') boardId: string, @Body() body: Task) {
    const newTask = await this.tasksService.create({ ...body, boardId });
    if (newTask) return newTask;
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ) {
    const task = await this.tasksService.findOne(boardId, taskId);
    if (task) {
      return task;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Put(':taskId')
  async update(@Param('taskId') taskId: string, @Body() body: Task) {
    const updatedTask = await this.tasksService.update({
      ...body,
      id: taskId
    });
    if (updatedTask) return updatedTask;
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const taskFinded = await this.tasksService.removeTask(id);
    if (taskFinded) {
      return 'The task has been deleted';
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
}
