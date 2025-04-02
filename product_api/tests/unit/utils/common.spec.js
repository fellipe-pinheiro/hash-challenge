const assert = require('assert');
const { isTestEnv, toInt } = require('../../../src/utils/common');

describe('utils: common', () => {
  context('isTestEnv', () => {
    it('when call isTestEnv in test environment then return true', () => {
      assert.deepStrictEqual(true, isTestEnv());
    });

    it('when call isTestEnv in dev environment then return false', () => {
      process.env.NODE_ENV = 'dev';
      assert.deepStrictEqual(false, isTestEnv());
    });

    it('when call isTestEnv in qa environment then return false', () => {
      process.env.NODE_ENV = 'qa';
      assert.deepStrictEqual(false, isTestEnv());
    });

    it('when call isTestEnv in prod environment then return false', () => {
      process.env.NODE_ENV = 'prod';
      assert.deepStrictEqual(false, isTestEnv());
    });
  });
  context('toInt', () => {
    it('when call toInt wiht a valid number then return integer number', () => {
      const value = toInt('10');
      assert.deepStrictEqual(10, value);
    });

    it('when call toInt wiht a invalid number then return 0', () => {
      const value = toInt('two');
      assert.deepStrictEqual(0, value);
    });
  });
});
