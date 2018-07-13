const createError = require('http-errors');
const imagesRepository = require('../repositories/imagesRepository');

const MISMATCH_IMG_ID_ERROR = 'ImgId in the url does not match the one in the body';
const IMAGE_NOT_FOUND_ERROR = 'Image not found';

function create({ username, imgUrl, isPublic, title }) {
  return imagesRepository.create({ username, imgUrl, isPublic, title });
}

function list() {
  return imagesRepository.list({ isPublic: true });
}

function get({ imgId }) {
  return imagesRepository.getById({ imgId })
    .then(checkImageExistance);
}

function getUserImages({ username }) {
  return imagesRepository.getByUsername({ username });
}

function update({ username, imgId, imgUrl, isPublic, title, imgIdFromUrl }) {
  if (imgId !== imgIdFromUrl) {
    return Promise.reject(createError(400, MISMATCH_IMG_ID_ERROR));
  }

  return imagesRepository.getById({ imgId })
    .then(checkImageExistance)
    .then(() => imagesRepository.update({ username, imgId, imgUrl, isPublic, title }));
}

function remove({ imgId }) {
  return imagesRepository.remove({ imgId });
}

function checkImageExistance(img) {
  if (!img) {
    return Promise.reject(createError(404, IMAGE_NOT_FOUND_ERROR));
  }
  return img;
}

module.exports = {
  create,
  get,
  getUserImages,
  list,
  remove,
  update
};
