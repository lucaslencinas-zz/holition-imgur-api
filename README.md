# Holition's Imgur API

## Tech stack

- Node.js
- Express
- MongoDB with Mongoose
- Mocha
- Chai
- Sinon

## More details

Here in the [details.md file](/details.md)

## Development

To install the server execute the following commands:

```
npm install
```

The server usese [MongoDB](https://www.mongodb.com) as a database. So you need to install and setup all the things needed as it is mention in [this link](https://docs.mongodb.com/manual/installation/).
After installing mongo you need to start the mongo daemon. In my case, I just execute in the command line and live it in a tab:
```
mongod --dbpath /data/db
```
By default the server is running on the port 27017, so now you can connect using the mongo client in another tab in the command line:
```
mongo --host 127.0.0.1:27017
```

If all that is done correctly, you are ready to start the API doing:
```
npm start
```
That will start the API and will be listen to HTTP request in the PORT 3001. http://0.0.0.0:3001/api/

Initial setup of users and images in the database. Check the repositories folder to see them.

In the `app.js` file, you have all the endpoints for users, images and login flow.
To use the UI, you can check how to setup the UI project [over here](https://github.com/lucaslencinas/holition-imgur-ui)


## Testing

### Unit and E2E

You can run all of them with the following command:

```
npm test
```
