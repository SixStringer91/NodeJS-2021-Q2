import taskRepo from './tasks.memory.repository';
import Task from './tasks.model';

const getAll = (boardsId:string): Promise<Task[]> => taskRepo.getAll(boardsId);
const createTask = (task:Task):Promise<Task|void> => taskRepo.createTask(task);
const getTask = (id:string):Promise<Task|void> => taskRepo.getTask(id);
const updateTask = (obj:Task):Promise<Task|void|null> => taskRepo.updateTask(obj);
const deleteTask = (id:string):Promise<boolean> => taskRepo.deleteTask(id);
const deleteAllTasks = (boardId:string):Promise<void> => taskRepo.deleteAllTasks(boardId);
const ifUserDeleted = (userId: string):Promise<void> => taskRepo.ifUserDeleted(userId);

export default {
  getAll,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  ifUserDeleted,
};
