const usersService = require('../services/usersService');

/* body message: { username, password } */
/* response.body: { username, token } */
function create(req, res, next) {
  const { username, password } = req.body;

  return usersService
    .create({ username, password })
    .then((createdUser) => res.status(201).json(createdUser))
    .catch(next);
}

/* response.body: [{ username }] */
function list(req, res, next) {
  return usersService
    .list()
    .then((users) => res.status(200).json(users))
    .catch(next);
}

module.exports = {
  create,
  list
};
