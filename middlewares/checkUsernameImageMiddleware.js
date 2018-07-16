const imagesService = require('../services/imagesService');

const UNAUTHORIZED_MESSAGE = 'Unauthorized';

module.exports = (req, res, next) => {
  const { decoded, params, body } = req;

  if (params.imgId) {
    return imagesService.get(params)
      .then((img) => checkEqualResourceAuth(img.username, decoded.username))
      .catch(next);
  }

  if (body.username) {
    return checkEqualResourceAuth(body.username, decoded.username);
  }
  return next();

  function checkEqualResourceAuth(resource1, resource2) {
    if (resource1 === resource2) {
      return next();
    }
    return res.status(403).send({ auth: false, message: UNAUTHORIZED_MESSAGE });
  }
};
