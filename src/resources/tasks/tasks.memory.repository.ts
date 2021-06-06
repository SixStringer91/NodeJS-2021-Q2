import Task from './tasks.model';

const TASKS: Task[] = [];

const getAll = async (boardsId: string): Promise<Task[]> => {
  const filtered = TASKS.filter((el) => el.boardId === boardsId);
  return filtered;
};

const createTask = async (task: Task):Promise<Task|void> => {
  TASKS.push(task);
  return TASKS[TASKS.length - 1];
};

const getTask = async (id: string):Promise<Task|void> => {
  const currentTask = TASKS.find((task) => task.id === id);
  return currentTask;
};

const updateTask = async (obj: Task):Promise<Task|void|null> => {
  const taskIndex = TASKS.findIndex((user) => obj.id === user.id);
  if (taskIndex !== -1) {
    TASKS[taskIndex] = { ...TASKS[taskIndex], ...obj };
    return TASKS[taskIndex];
  }
  return null;
};

const deleteTask = async (id: string):Promise<boolean> => {
  const taskIndex = TASKS.findIndex((user) => id === user.id);
  if (taskIndex !== -1) {
    TASKS.splice(taskIndex, 1);
    return true;
  }
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
