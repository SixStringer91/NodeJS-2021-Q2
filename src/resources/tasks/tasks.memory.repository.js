const TASKS = [];
/**
 * Get all tasks from fake db
 * @param {number} string id of board
 * @returns {object} task
 */
const getAll = async (boardsId) =>
  TASKS.filter((el) => el.boardId === boardsId);
 /**
 * Create new task
 * @param {object} task task body
 * @returns {object} generated task body
 */ 
const createTask = async (task) => {
  TASKS.push(task);
  return task;
};
 /**
 * Get task by id
 * @param {string} id task body
 * @returns {object | undefined} finded task 
 */ 
const getTask = async (id) => TASKS.find((task) => task.id === id);
 /**
 * update task
 * @param {obj} obj body of task
 * @returns {object | null} finded task 
 */ 
const updateTask = async (obj) => {
  const taskIndex = TASKS.findIndex((user) => obj.id === user.id);
  if (taskIndex < 0) {
    return null;
  }
  const currentTask = TASKS[taskIndex];
  Object.keys(currentTask).forEach((key) => {
    if (key in obj) {
      currentTask[key] = obj[key];
    }
  });
  return currentTask;
};
 /**
 * delete task
 * @param {string} id if of task
 * @returns {boolean} return true if task successfuly deleted, or false
 */ 
const deleteTask = async (id) => {
  for (let i = 0; i < TASKS.length; i += 1) {
    if (TASKS[i].id === id) {
      TASKS.splice(i, 1);
      return true;
    }
  }
  return false;
};
 /**
 * delete all tasks
 * @param {string} id board id
 * @returns {void} nothing
 */ 
const deleteAllTasks = async (boardId) => {
  TASKS.forEach((task, i) => {
    if (task.boardId === boardId) {
      TASKS.splice(i, 1);
    }
  });
};
 /**
 * sets values ​​with remoted user to null
 * @param {string} userId user id
 * @returns {void} nothing
 */ 
const ifUserDeleted = async (userId) => {
  TASKS.forEach((task, i) => {
    if (task.userId === userId) {
      TASKS[i].userId = null;
    }
  });
};

module.exports = {
  getAll,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  ifUserDeleted,
};
