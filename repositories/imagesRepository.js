const _ = require('lodash');
const uuid = require('uuid');
const Image = require('../schemas/imageSchema');

const IMG_FIELDS = ['username', 'imgId', 'imgUrl', 'title', 'isPublic'];
const initialImages = [
  {
    imgId: 'some-id1',
    imgUrl: 'https://i.imgur.com/3NXNpNC.jpg',
    username: 'lucas',
    title: 'Some title for some-id1',
    isPublic: true
  },
  {
    imgId: 'some-id4',
    imgUrl: 'https://i.imgur.com/XrSkyav.png',
    username: 'lucas',
    title: 'Some title for some-id4',
    isPublic: true
  },
  {
    imgId: 'some-id2',
    imgUrl: 'https://i.imgur.com/SFSZVaq.jpg',
    username: 'leonardo',
    title: 'Some title for some-id1',
    isPublic: false
  },
  {
    imgId: 'some-id3',
    imgUrl: 'https://i.imgur.com/p3P3u5F.jpg',
    username: 'lencinas',
    title: 'Some title for some-id1',
    isPublic: true
  }
];

Image.create(initialImages)
  .then((retrievedImages) => console.log(retrievedImages))
  .catch((err) => console.error(err));

function getById({ imgId }) {
  return Image.findOne({ imgId })
    .then((image) => _.pick(image, IMG_FIELDS));
}

function getByUsername({ username }) {
  return Image.find({ username })
    .then((imgs) => imgs.map((image) => _.pick(image, IMG_FIELDS)));
}

function create({ username, imgUrl, isPublic = false, title }) {
  const imgId = uuid.v4();
  const newImage = { username, imgUrl, isPublic, imgId, title };

  return Image.create(newImage)
    .then((image) => _.pick(image, IMG_FIELDS));
}

function update({ username, imgUrl, isPublic, imgId, title }) {
  return Image.updateOne({ imgId }, { username, imgUrl, isPublic, imgId, title })
    .then((image) => _.pick(image, IMG_FIELDS));
}

function remove({ imgId }) {
  return Image.deleteOne({ imgId });
}

function list({ isPublic = true }) {
  return Image.find({ isPublic })
    .then((images) => images.map((image) => _.pick(image, IMG_FIELDS)));
}

module.exports = {
  create,
  getById,
  getByUsername,
  list,
  remove,
  update
};
