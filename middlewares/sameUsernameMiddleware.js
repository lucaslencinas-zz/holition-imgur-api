const UNAUTHORIZED_MESSAGE = 'Unauthorized';

module.exports = (req, res, next) => {
  const { decoded, params } = req;

  if (decoded.username === params.username) {
    return next();
  }
  return res.status(403).send({ auth: false, message: UNAUTHORIZED_MESSAGE });
};
