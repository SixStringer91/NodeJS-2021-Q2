const USERS = [];
 /**
 * Get all users
 * @returns {Array} returns array of users
 */
const getAll = async () => USERS;
 /**
 * Create new user
 * @param {Object} user user body array
 * @returns {Object} returns created user
 */
const createNewUser = (user) => {
  USERS.push(user);
  return user;
};
 /**
 * Get user by id
 * @param {string} id user id
 * @returns {Object} returns finded user
 */
const getOneUser = async (id) => USERS.find((user) => id === user.id);
 /**
 * Update user
 * @param {Object} obj user body contains
 * @returns {Object} returns finded user by id in obj
 */
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
 /**
 * Delete user
 * @param {Object} id user id
 * @returns {void}
 */
const deleteUser = async (id) =>
  USERS.splice(
    USERS.findIndex((user) => id === user.id),
    1
  );

module.exports = { getAll, createNewUser, getOneUser, updateUser, deleteUser };
