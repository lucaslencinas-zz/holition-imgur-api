const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const usersRepository = require('../repositories/usersRepository');

const MISMATCH_USERNAME_ERROR = 'Username in the url does not match the one in the body';
const USER_NOT_FOUND_ERROR = 'User not found';
const USER_ALREADY_CREATED_ERROR = 'username already used. Choose another one';
const JWT_SECRET = 'holition';

function create({ username, password, name, age, gender }) {
  return usersRepository.getByUsername({ username })
    .then((storedUser) => {
      if (storedUser.username) {
        return Promise.reject(createError(409, USER_ALREADY_CREATED_ERROR));
      }
      return usersRepository.create({ username, name, password, age, gender })
        .then(generateToken)
        .then((token) => ({ username, name, authToken: token }));
    });
}

function list() {
  return usersRepository.list();
}

function get({ username }) {
  return usersRepository.getByUsername({ username })
    .then(checkUserExistance);
}

function getProfile({ username }) {
  return usersRepository.getProfile({ username })
    .then(checkUserExistance);
}

function update({ username, password, name, newPassword, usernameFromUrl, age, gender }) {
  if (username !== usernameFromUrl) {
    return Promise.reject(createError(400, MISMATCH_USERNAME_ERROR));
  }

  return usersRepository.getByCredentials({ username, password })
    .then(checkUserExistance)
    .then(() => usersRepository.update({ username, password: newPassword, name, age, gender }));
}

function remove({ username }) {
  return usersRepository.remove({ username });
}

function generateToken(user) {
  return jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: 300 }); // expires in 5 minutes
}

function checkUserExistance(user) {
  if (!user) {
    return Promise.reject(createError(404, USER_NOT_FOUND_ERROR));
  }
  return user;
}

module.exports = {
  create,
  get,
  getProfile,
  list,
  remove,
  update
};
