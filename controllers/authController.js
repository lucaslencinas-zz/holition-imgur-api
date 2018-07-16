const authService = require('../services/authService');

/* body message: { username, password } */
/* response.body: { username, token } */
function login(req, res, next) {
  const { username, password } = req.body;

  return authService
    .login({ username, password })
    .then((auth) => res.status(200).json(auth))
    .catch(next);
}

/* body message: { username, token } */
/* response.body: { username } */
function logout(req, res, next) {
  const { username, token } = req.body;

  return authService
    .logout({ username, token })
    .then((unauth) => res.status(200).json(unauth))
    .catch(next);
}

module.exports = {
  login,
  logout
};
