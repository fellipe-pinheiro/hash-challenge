const assert = require('assert');
const { getUserId } = require('../../../src/utils/request');

describe('utils: request', () => {
  context('getUserId', () => {
    it('when call getUserId that has x-user-id header then return user id', () => {
      assert.deepStrictEqual('myUserId', getUserId({ headers: { 'x-user-id': 'myUserId' } }));
    });
    it('when call getUserId that has user-id query then return user id', () => {
      assert.deepStrictEqual('myUserId', getUserId({ query: { 'user-id': 'myUserId' } }));
    });
    it('when call getUserId that has no user-id then return undefined', () => {
      assert.deepStrictEqual(undefined, getUserId({ headers: { 'x-other': 'otherHeader' } }));
    });
  });
});
