const { expect } = require('chai');
const usersService = require('./usersService');

describe('usersService', () => {
  describe('#create', () => {
    let createdUser;
    let user;

    beforeEach(() => {
      user = {
        username: 'test-user',
        password: 'test-password'
      };
      return usersService.create(user)
        .then(($result) => (createdUser = $result));
    });

    it('should return the created user with a token', () => {
      expect(createdUser.username).to.eql(user.username);
      expect(createdUser.token).to.not.eql(undefined);
    });
  });
});
