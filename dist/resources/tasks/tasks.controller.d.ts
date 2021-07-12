import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(boardId: string): Promise<Task[]>;
    create(boardId: string, body: Task): Promise<Task>;
    findOne(boardId: string, taskId: string): Promise<Task>;
    update(taskId: string, body: Task): Promise<Task>;
    remove(id: string): Promise<string>;
}
