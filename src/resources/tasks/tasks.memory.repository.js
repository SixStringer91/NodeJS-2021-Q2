const TASKS = [];

const getAll = async () => TASKS;

const createTask = async (task) => {
  TASKS.push(task);
  return task
};

const getTask = async (id) => TASKS.find(task => task.id === id);

const updateTask = async (obj) => {
  const taskIndex = TASKS.findIndex(user => obj.id === user.id);
  if(taskIndex<0){
    return null
  }
  const currentTask = TASKS[taskIndex];
  Object.keys(currentTask).forEach(key=>{
      if(key in obj){
        currentTask[key] = obj[key];
      };
  });
  return currentTask;
};

const deleteTask = async (id) => {
  for (let i = 0; i < TASKS.length; i+=1) {
   if(TASKS[i].id===id){
   TASKS.splice(i,1);
   return true;
  }
  }
  return false;
}

module.exports = { getAll, createTask, getTask, updateTask, deleteTask };
