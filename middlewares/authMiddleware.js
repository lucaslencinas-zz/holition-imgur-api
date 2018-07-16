const jwt = require('jsonwebtoken');

const AUTH_ERROR_MESSAGE = 'Failed to authenticate token.';
const NO_TOKEN_ERROR_MESSAGE = 'No token provided';
const JWT_SECRET = 'holition';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ auth: false, message: NO_TOKEN_ERROR_MESSAGE });

  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: AUTH_ERROR_MESSAGE });
    req.decoded = decoded;
    return next();
  });
};
