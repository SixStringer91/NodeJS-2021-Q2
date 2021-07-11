import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(boardId: string): Promise<Task[]>;
    create(task: Task): Promise<Task>;
    findOne(boardId: string, id: string): Promise<Task>;
    update(obj: Task): Promise<Task>;
    removeTask(id: string): Promise<boolean>;
}
