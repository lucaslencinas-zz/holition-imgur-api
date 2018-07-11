const uuid = require('uuid');

let images = [
  {
    imgId: 'some-id1',
    imgUrl: 'http://some-url.com/lucas-example',
    username: 'lucas',
    title: 'Some title for some-id1',
    isPublic: true
  },
  {
    imgId: 'some-id2',
    imgUrl: 'http://some-url.com/leonardo-example',
    username: 'leonardo',
    title: 'Some title for some-id1',
    isPublic: true
  },
  {
    imgId: 'some-id3',
    imgUrl: 'http://some-url.com/lencinas-example',
    username: 'lencinas',
    title: 'Some title for some-id1',
    isPublic: true
  }
];

function getById({ imgId }) {
  return Promise.resolve(images.find((img) => img.imgId === imgId));
}

function create({ username, imgUrl, isPublic = false, title }) {
  const imgId = uuid.v4();
  const newImage = { username, imgUrl, isPublic, imgId, title };
  images.push(newImage);

  return Promise.resolve(newImage);
}

function update({ username, imgUrl, isPublic, imgId, title }) {
  const index = images.findIndex((img) => img.imgId === imgId);
  images[index] = { ...images[index], username, imgUrl, isPublic, imgId, title };

  return Promise.resolve({ username, imgUrl, isPublic, imgId });
}

function remove({ imgId }) {
  const index = images.findIndex((img) => img.imgId === imgId);
  if (index !== -1) {
    images = [...images.slice(0, index), ...images.slice(index + 1, images.length)];
  }

  return Promise.resolve();
}

function list() {
  return Promise.resolve(images);
}

module.exports = {
  create,
  getById,
  list,
  remove,
  update
};
