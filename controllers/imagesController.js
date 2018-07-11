const imagesService = require('../services/imagesService');

/* body message: { username, imgUrl, isPublic, title } */
/* response.body: { username, imgId, imgUrl, isPublic, title } */
function create(req, res, next) {
  const { username, imgUrl, isPublic, title } = req.body;

  return imagesService
    .create({ username, imgUrl, isPublic, title })
    .then((createdImage) => res.status(201).json(createdImage))
    .catch(next);
}

/* response.body: [{ username, imgId, imgUrl, isPublic, title }] */
function list(req, res, next) {
  return imagesService
    .list()
    .then((images) => res.status(200).json(images))
    .catch(next);
}

/* req.params: { imgId } */
/* response.body: [{ username, imgId, imgUrl, isPublic, title }] */
function get(req, res, next) {
  return imagesService
    .get({ imgId: req.params.imgId })
    .then((user) => res.status(200).json(user))
    .catch(next);
}

/* req.params: { imgId } */
/* body message: { username, imgId, imgUrl, isPublic, title } */
function update(req, res, next) {
  const {
    username, imgId, imgUrl, isPublic, title
  } = req.body;

  return imagesService
    .update({ username, imgId, imgUrl, isPublic, title, imgIdFromUrl: req.params.imgId })
    .then(() => res.status(204).end())
    .catch(next);
}

/* req.params: { imgId } */
function remove(req, res, next) {
  return imagesService
    .remove({ imgId: req.params.imgId })
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
