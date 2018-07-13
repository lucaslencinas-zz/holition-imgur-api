const _ = require('lodash');

let users = [
  {
    name: 'Lucas',
    username: 'lucas',
    age: 25,
    gender: 'male',
    password: 'lucas123'
  },
  {
    name: 'Leonardo',
    username: 'leonardo',
    age: 26,
    gender: 'female',
    password: 'lucas123'
  },
  {
    name: 'Lencinas',
    username: 'lencinas',
    age: 27,
    gender: 'male',
    password: 'lucas123'
  }
];

function getByUsername({ username }) {
  return getProfile({ username })
    .map((user) => _.pick(user, ['username', 'name']));
}

function getProfile({ username }) {
  return Promise.resolve(users
    .find((user) => user.username === username));
}

function getByCredentials({ username, password }) {
  return Promise.resolve(users.find((user) =>
    user.username === username && user.password === password));
}

function create({ username, name, password, age, gender }) {
  users.push({ username, name, password, age, gender });
  return Promise.resolve({ username, name });
}

function update({ username, password, name, age, gender }) {
  const index = users.findIndex((user) => user.username === username);
  users[index] = { ...users[index], username, password, name, age, gender };

  return Promise.resolve({ username, name });
}

function remove({ username }) {
  const index = users.findIndex((user) => user.username === username);
  if (index !== -1) {
    users = [...users.slice(0, index), ...users.slice(index + 1, users.length)];
  }

  return Promise.resolve();
}

function list() {
  return Promise.resolve(users.map((user) =>
    ({ username: user.username, name: user.name })));
}

module.exports = {
  create,
  getByCredentials,
  getByUsername,
  getProfile,
  list,
  remove,
  update
};
