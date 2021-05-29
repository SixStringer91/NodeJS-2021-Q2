const USERS = [];

const getAll = async () => USERS;
const createNewUser = (user) => {
  USERS.push(user);
  return user;
};

const getOneUser = async (id) => USERS.find((user) => id === user.id);

const updateUser = (obj) => {
  const userIndex = USERS.findIndex((user) => obj.id === user.id);
  const currentUser = USERS[userIndex];
  Object.keys(currentUser).forEach((key) => {
    if (key in obj) {
      currentUser[key] = obj[key];
    }
  });
  return currentUser;
};

const deleteUser = async (id) =>
  USERS.splice(
    USERS.findIndex((user) => id === user.id),
    1
  );

module.exports = { getAll, createNewUser, getOneUser, updateUser, deleteUser };
