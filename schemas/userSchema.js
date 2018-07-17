const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

UserSchema.pre('save', function bcryptMiddleware() {
  const user = this;
  return bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      return user;
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
