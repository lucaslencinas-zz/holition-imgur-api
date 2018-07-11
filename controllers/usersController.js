const usersService = require('../services/usersService');

/* body message: { username, password, name } */
/* response.body: { username, name } */
function create(req, res, next) {
  const { username, password, name } = req.body;

  return usersService
    .create({ username, password, name })
    .then((createdUser) => res.status(201).json(createdUser))
    .catch(next);
}

/* response.body: [{ username, name }] */
function list(req, res, next) {
  return usersService
    .list()
    .then((users) => res.status(200).json(users))
    .catch(next);
}

/* req.params: { username } */
/* response.body: [{ username, name }] */
function get(req, res, next) {
  return usersService
    .get({ username: req.params.username })
    .then((user) => res.status(200).json(user))
    .catch(next);
}

/* req.params: { username } */
/* body message: { username, password, name, newPassword } */
function update(req, res, next) {
  const { username, password, name, newPassword } = req.body;

  return usersService
    .update({ username, password, name, newPassword, usernameFromUrl: req.params.username })
    .then(() => res.status(204).end())
    .catch(next);
}

/* req.params: { username } */
function remove(req, res, next) {
  return usersService
    .remove({ username: req.params.username })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create,
  get,
  list,
  remove,
  update
};
