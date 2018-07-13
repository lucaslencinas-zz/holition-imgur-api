const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const imagesController = require('./controllers/imagesController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const missingFieldsMiddleware = require('./middlewares/missingFieldsMiddleware');

const USER_CREATION_FIELDS = ['name', 'username', 'password', 'age', 'gender'];
const USER_UPDATE_FIELDS = ['name', 'username', 'password', 'newPassword', 'age', 'gender'];
const IMAGE_CREATION_FIELDS = ['imgUrl', 'username', 'isPublic', 'title'];
const IMAGE_UPDATE_FIELDS = ['imgUrl', 'isPublic', 'title'];

const app = express();
app.use(cors());

const api = express
  .Router()
  .use(bodyParser.json())
  .get('/users', usersController.list)
  .post('/users', missingFieldsMiddleware(USER_CREATION_FIELDS), usersController.create)
  .put('/users/:username', missingFieldsMiddleware(USER_UPDATE_FIELDS), usersController.update)
  .get('/users/:username', usersController.get) // partial profile
  .get('/users/:username/profile', usersController.getProfile) // full profile
  .get('/users/:username/images', imagesController.getUserImages)
  .delete('/users/:username', usersController.remove)
  .get('/images', imagesController.list)
  .post('/images', missingFieldsMiddleware(IMAGE_CREATION_FIELDS), imagesController.create)
  .put('/images/:imgId', missingFieldsMiddleware(IMAGE_UPDATE_FIELDS), imagesController.update)
  .get('/images/:imgId', imagesController.get)
  .delete('/images/:imgId', imagesController.remove);

app.use('/api', api);
app.use(errorMiddleware());

app.listen(3001, () => {
  console.log('API listen on port 3001!');
});
