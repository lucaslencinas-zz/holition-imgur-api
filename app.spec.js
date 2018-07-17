const request = require('supertest');
const { expect } = require('chai');
const app = require('./app');

describe('Holition Imgur API', () => {
  describe('GET /users', () => {
    it('Retrieves the array of initial users', () =>
      request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.eql(3);
        }));
  });

  describe('GET /images', () => {
    it('Retrieves the array of initial images', () =>
      request(app)
        .get('/api/images')
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.eql(6);
        }));
  });

  describe('GET /users/lucas', () => {
    it('Retrieves the partial profile of the user', () =>
      request(app)
        .get('/api/users/lucas')
        .expect(200)
        .then((response) => {
          expect(response.body.name).to.eql('Lucas');
          expect(response.body.username).to.eql('lucas');
        }));
  });

  describe('POST /login', () => {
    it('Retrieves the username and the auth token', () =>
      request(app)
        .post('/api/login')
        .send({ username: 'lucas', password: 'lucas123' })
        .expect(200)
        .then((response) => {
          expect(response.body.username).to.eql('lucas');
          expect(response.body.authToken).to.not.eql(undefined);
        }));
  });

  describe('GET /users/lucas/profile', () => {
    let token;

    describe('when not logged in', () => {
      it('should throw an unauthorized error', () =>
        request(app)
          .get('/api/users/lucas/profile')
          .expect(401)
          .then((response) => {
            expect(response.body.message).to.eql('No token provided');
          }));
    });

    describe('when logged in', () => {
      beforeEach(() =>
        request(app)
          .post('/api/login')
          .send({ username: 'lucas', password: 'lucas123' })
          .expect(200)
          .then((response) => (token = response.body.authToken)));

      it('should retrieved the full user profile', () =>
        request(app)
          .get('/api/users/lucas/profile')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            expect(response.body.username).to.eql('lucas');
            expect(response.body.gender).to.eql('male');
            expect(response.body.age).to.eql(25);
          }));
    });
  });

  describe('GET /users/lucas/profile', () => {
    let token;

    describe('when not logged in', () => {
      it('should throw an unauthorized error', () =>
        request(app)
          .get('/api/users/lucas/profile')
          .expect(401)
          .then((response) => {
            expect(response.body.message).to.eql('No token provided');
          }));
    });

    describe('when logged in', () => {
      beforeEach(() =>
        request(app)
          .post('/api/login')
          .send({ username: 'lucas', password: 'lucas123' })
          .expect(200)
          .then((response) => (token = response.body.authToken)));

      it('should retrieved the full user profile', () =>
        request(app)
          .get('/api/users/lucas/profile')
          .set('Authorization', token)
          .expect(200)
          .then((response) => {
            expect(response.body.username).to.eql('lucas');
            expect(response.body.gender).to.eql('male');
            expect(response.body.age).to.eql(25);
          }));
    });
  });
});
