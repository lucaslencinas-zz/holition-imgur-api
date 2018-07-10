const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(cors());

const api = express
  .Router()
  .use(bodyParser.json())
  .post('/users', usersController.create)
  .get('/users', usersController.list);

app.use('/api', api);
app.use(errorMiddleware());

app.listen(3001, () => {
  console.log('API listen on port 3001!');
});
