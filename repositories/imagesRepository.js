const uuid = require('uuid');

let images = [
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

function getById({ imgId }) {
  return Promise.resolve(images.find((img) => img.imgId === imgId));
}

function getByUsername({ username }) {
  return Promise.resolve(images.find((img) => img.username === username));
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

function list({ isPublic = true }) {
  return Promise.resolve(isPublic ? images.filter((img) => img.isPublic) : images);
}

module.exports = {
  create,
  getById,
  getByUsername,
  list,
  remove,
  update
};
