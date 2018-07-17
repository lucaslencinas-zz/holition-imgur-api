const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imgId: {
    type: String,
    unique: true,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    required: true
  }
});
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
