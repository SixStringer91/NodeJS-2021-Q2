import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}
  async findAll(boardId: string) {
    const tasks = await this.tasksRepository.find({ boardId });
    return tasks.map(Task.toResponse);
  }

  async create(task: Task) {
    const newTask = this.tasksRepository.create(task);
    const createdTask = await this.tasksRepository.save(newTask);
    return Task.toResponse(createdTask);
  }

  async findOne(boardId: string, id: string) {
    const findTask = await this.tasksRepository.findOne({ boardId, id });
    if (findTask) return Task.toResponse(findTask);
    return null;
  }

  async update(obj: Task) {
    const findedTask = await this.tasksRepository.findOne(obj.id);
    if (!findedTask) return null;
    const reducedData = { ...findedTask, ...obj };
    const updatedTask = await this.tasksRepository.update(obj.id, reducedData);
    if (updatedTask.affected) return Task.toResponse(reducedData);
    return null;
  }

  async removeTask(id: string) {
    const deletionRes = await this.tasksRepository.delete(id);
    if (deletionRes.affected) return true;
    return false;
  }
}
