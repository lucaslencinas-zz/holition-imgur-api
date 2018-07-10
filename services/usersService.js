const uuid = require('uuid');

const users = [
  {
    username: 'lucas',
    password: 'lucas123',
    token: 'c44be829-3d89-4b70-80be-177b7633bc5b'
  },
  {
    username: 'leonardo',
    password: 'lucas123',
    token: 'c44be829-3d89-4b70-80be-1773763abc5c'
  },
  {
    username: 'lencinas',
    password: 'lucas123',
    token: '1234e829-3d89-4b70-80be-1773763abc5d'
  }
];

/*  */
function create({ username, password }) {
  const createdUser = { username, password, token: uuid.v4() };
  users.push(createdUser);

  return Promise.resolve({ username: createdUser.username, token: createdUser.token });
}

function list() {
  return Promise.resolve(users.map((user) => ({ username: user.username })));
}

module.exports = {
  create,
  list
};
