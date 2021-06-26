import taskRepo from './tasks.memory.repository';
import { Task } from '../../entities/task.entity';

const getAll = (boardsId:string): Promise<Task[]> => taskRepo.getAll(boardsId);
const createTask = (task:Task):Promise<Task|void> => taskRepo.createTask(task);
const getTask = (boardsId:string, id:string):Promise<Task|null> => taskRepo.getTask(boardsId, id);
const updateTask = (obj:Task):Promise<Task|void|null> => taskRepo.updateTask(obj);
const deleteTask = (id:string):Promise<boolean> => taskRepo.deleteTask(id);
export const deleteAllTasks = (boardId:string):Promise<void> => taskRepo.deleteAllTasks(boardId);
export const ifUserDeleted = (userId: string):Promise<void> => taskRepo.ifUserDeleted(userId);

export default {
  getAll,
  createTask,
  getTask,
  updateTask,
  deleteTask
};
