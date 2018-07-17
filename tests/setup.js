const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);
global.sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
});
