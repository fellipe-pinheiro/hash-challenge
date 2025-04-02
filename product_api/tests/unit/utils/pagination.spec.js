const assert = require('assert');
const { getPagingData, getPagedData } = require('../../../src/utils/pagination');

describe('utils: pagination', () => {
  context('getPagingData', () => {
    it('when call getPagingData without value then return default values', () => {
      assert.deepStrictEqual({ limit: 2, offset: 0, page: 0 }, getPagingData({}));
    });
    it('when call getPagingData with only page value then return valid values', () => {
      assert.deepStrictEqual({ limit: 2, offset: 10, page: 5 }, getPagingData({ page: 5 }));
    });
    it('when call getPagingData with only size value then return default values', () => {
      assert.deepStrictEqual({ limit: 7, offset: 0, page: 0 }, getPagingData({ size: 7 }));
    });
  });
  context('getPagedData', () => {
    const itens = ['A', 'B'];
    const totalItens = 4;
    const page = 0;
    const size = 2;
    it('when call getPagedData valid params then return correct object', () => {
      const expectedResponse = {
        itens,
        totalItens,
        page,
        size,
        totalPages: 2,
      };
      assert.deepStrictEqual(expectedResponse, getPagedData(itens, totalItens, page, size));
    });
    it('when call getPagedData without itens then return valid values', () => {
      const expectedResponse = {
        itens: [],
        totalItens: 0,
        page: 0,
        size: 2,
        totalPages: 0,
      };
      assert.deepStrictEqual(expectedResponse, getPagedData([], 0, 0, 2));
    });
  });
});
