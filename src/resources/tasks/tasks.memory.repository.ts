import { getRepository } from 'typeorm';
import { Task } from '../../entities/task.entity';

const TASKS: Task[] = [];

const getAll = async (boardId: string): Promise<Task[]> => (await getRepository(Task)
  .find({ boardId }))
  .map(Task.toResponse);

const createTask = async (task: Task):Promise<Task|void> => {
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create(task);
  taskRepository.save(newTask);
  return Task.toResponse(newTask);
};

const getTask = async (boardId:string, id: string):Promise<Task|null> => {
  const tasksRepository = getRepository(Task);
  const findTask = await tasksRepository.findOne({ boardId, id });
  if (findTask) return Task.toResponse(findTask);
  return null;
};

const updateTask = async (obj: Task):Promise<Task|null> => {
  const tasksRepository = getRepository(Task);
  await tasksRepository.update(obj.id, obj);
  const findTask = await tasksRepository.findOne(obj.id);
  if (findTask) return Task.toResponse(findTask);
  return null;
};

const deleteTask = async (id: string):Promise<boolean> => {
  const taskRepository = getRepository(Task);
  const deletionRes = await taskRepository.delete(id);
  if (deletionRes.affected) return true;
  return false;
};

const deleteAllTasks = async (boardsId: string):Promise<void> => {
  TASKS.forEach((task, i) => {
    if (task.boardId === boardsId) {
      TASKS.splice(i, 1);
    }
  });
};

const ifUserDeleted = async (userId: string):Promise<void> => {
  TASKS.forEach((task, i) => {
    if (task.userId === userId) {
      const currentTask:Task = { ...task, userId: null };
      TASKS[i] = { ...currentTask };
    }
  });
};

export default {
  getAll,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  ifUserDeleted
};
