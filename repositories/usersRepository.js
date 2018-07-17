const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../schemas/userSchema');

const USER_FIELDS = ['username', 'name'];
const USER_ALL_FIELDS = ['username', 'name', 'age', 'gender', 'password'];

const initialUsers = [
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

User.create(initialUsers)
  .then((retrievedUsers) => console.log(retrievedUsers))
  .catch((err) => console.error(err));

function getByUsername({ username }) {
  return User.findOne({ username })
    .then((user) => _.pick(user, USER_FIELDS));
}

function getProfile({ username }) {
  return User.findOne({ username })
    .then((user) => _.pick(user, USER_ALL_FIELDS));
}

function getByCredentials({ username, password }) {
  return getProfile({ username })
    .then((user) => {
      if (!user) return null;
      return bcrypt.compare(password, user.password)
        .then((result) => (result ? user : null));
    });
}

function create({ username, name, password, age, gender }) {
  return User.create({ username, name, password, age, gender })
    .then((user) => _.pick(user, USER_FIELDS));
}

function update({ username, password, name, age, gender }) {
  return User.updateOne({ username }, { username, name, password, age, gender })
    .then((user) => _.pick(user, USER_FIELDS));
}

function remove({ username }) {
  return User.deleteOne({ username });
}

function list() {
  return User.find()
    .then((users) => users.map((user) => _.pick(user, USER_FIELDS)));
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
