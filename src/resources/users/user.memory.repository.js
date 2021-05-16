const USERS = [];

const getAll = async () => 
  // TODO: mock implementation. should be replaced during task development
  USERS;
const createNewUser = user => {
  USERS.push(user)
  return user;
};

const getOneUser = id => USERS.find(user => id === user.id);

const updateUser = obj => {
const userIndex = USERS.findIndex(user => obj.id === user.id);
const currentUser = USERS[userIndex];
Object.keys(currentUser).forEach(key=>{
    if(key in obj){
      currentUser[key] = obj[key];
    };
});
return currentUser;
};

const deleteUser = id => USERS.splice(USERS.findIndex(user => id === user.id),1)


module.exports = { getAll, createNewUser, getOneUser, updateUser, deleteUser };
