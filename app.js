const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const missingFieldsMiddleware = require('./middlewares/missingFieldsMiddleware');

const USER_CREATION_FIELDS = ['name', 'username', 'password'];
const USER_UPDATE_FIELDS = ['name', 'username', 'password', 'newPassword'];

const app = express();
app.use(cors());

const api = express
  .Router()
  .use(bodyParser.json())
  .get('/users', usersController.list)
  .post('/users', missingFieldsMiddleware(USER_CREATION_FIELDS), usersController.create)
  .put('/users/:username', missingFieldsMiddleware(USER_UPDATE_FIELDS), usersController.update)
  .get('/users/:username', usersController.get)
  .delete('/users/:username', usersController.remove);

app.use('/api', api);
app.use(errorMiddleware());

app.listen(3001, () => {
  console.log('API listen on port 3001!');
});
