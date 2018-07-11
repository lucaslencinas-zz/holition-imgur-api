let users = [
  {
    name: 'Lucas',
    username: 'lucas',
    password: 'lucas123'
  },
  {
    name: 'Leonardo',
    username: 'leonardo',
    password: 'lucas123'
  },
  {
    name: 'Lencinas',
    username: 'lencinas',
    password: 'lucas123'
  }
];

function getByUsername({ username }) {
  return Promise.resolve(users.find((user) => user.username === username));
}

function getByCredentials({ username, password }) {
  return Promise.resolve(users.find((user) =>
    user.username === username && user.password === password));
}

function create({ username, name, password }) {
  users.push({ username, name, password });
  return Promise.resolve({ username, name });
}

function update({ username, password, name }) {
  const index = users.findIndex((user) => user.username === username);
  users[index] = {
    ...users[index], username, password, name
  };

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
  list,
  remove,
  update
};
