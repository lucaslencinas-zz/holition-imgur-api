const { expect } = require('chai');
const _ = require('lodash');
const usersRepository = require('../repositories/usersRepository');
const usersService = require('./usersService');

const user = {
  username: 'test-user',
  password: 'test-password',
  name: 'tests-name',
  age: 20,
  gender: 'male'
};

describe('usersService', () => {
  describe('#create', () => {
    let createdUser;

    describe('when there is not another user with the same username', () => {
      beforeEach(() => {
        sandbox.stub(usersRepository, 'getByUsername').callsFake(() => Promise.resolve({}));
        sandbox.stub(usersRepository, 'create').callsFake(() => Promise.resolve(user));

        return usersService.create(user)
          .then(($result) => (createdUser = $result));
      });

      it('should return the created user with a token', () => {
        expect(createdUser.username).to.eql(user.username);
        expect(createdUser.name).to.eql(user.name);
        expect(createdUser.authToken).to.not.eql(undefined);
      });
    });

    describe('when there is another user with the same username', () => {
      let promise;

      beforeEach(() => {
        sandbox.stub(usersRepository, 'getByUsername').callsFake(() => Promise.resolve(user));

        return (promise = usersService.create(user))
          .catch(_.noop);
      });

      it('should return a rejected promise', () => expect(promise).to.be.rejected);
    });
  });

  describe('#get', () => {
    let retrievedUser;

    describe('when the user is found', () => {
      beforeEach(() => {
        sandbox.stub(usersRepository, 'getByUsername').callsFake(() => Promise.resolve(user));

        return usersService.get({ username: user.username })
          .then(($result) => (retrievedUser = $result));
      });

      it('should return the wanted user', () => {
        expect(retrievedUser.username).to.eql(user.username);
        expect(retrievedUser.name).to.eql(user.name);
      });
    });

    describe('when the user is not found', () => {
      let promise;

      beforeEach(() => {
        sandbox.stub(usersRepository, 'getByUsername').callsFake(() => Promise.resolve({}));

        return (promise = usersService.get({ username: user.username }))
          .catch(_.noop);
      });

      it('should return a rejected promise', () => expect(promise).to.be.rejected);
    });
  });

  describe('#update', () => {
    let promise;

    describe('when user from user is not the same from the url', () => {
      beforeEach(() =>
        (promise = usersService.update({ ...user, newPassword: user.password, usernameFromUrl: 'other-username' }))
          .catch(_.noop));

      it('should return a rejected promise', () => expect(promise).to.be.rejected);
    });

    describe('when the user is not found in the database', () => {
      beforeEach(() => {
        sandbox.stub(usersRepository, 'getByCredentials').callsFake(() => Promise.resolve({}));

        return (promise = usersService.update({ ...user, newPassword: user.password, usernameFromUrl: user.username }))
          .catch(_.noop);
      });

      it('should return a rejected promise', () => expect(promise).to.be.rejected);
    });

    describe('when the the user is found on database', () => {
      let userToUpdate;
      beforeEach(() => {
        userToUpdate = { ...user, newPassword: user.password, usernameFromUrl: user.username };
        sandbox.stub(usersRepository, 'getByCredentials').callsFake(() => Promise.resolve(userToUpdate));
        sandbox.stub(usersRepository, 'update').callsFake(() => Promise.resolve(null));

        return (promise = usersService.update(userToUpdate));
      });

      it('should return a resolved promise', () => expect(promise).to.not.be.rejected);
    });
  });
});
