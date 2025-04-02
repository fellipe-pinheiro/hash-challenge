const request = require('supertest');
const sinon = require('sinon');
const assert = require('assert');
const server = require('../../../src/server');
const serviceClient = require('../../../src/services/service_client');
const DiscountResponseMock = require('../fixtures/discount_response');
const { Product } = require('../../../src/models');

describe('route: product', () => {
  context('getProducts', () => {
    let sequelizeUserMock;
    const userResponse = {
      count: 3,
      rows: [{ priceInCents: 100 }, { priceInCents: 200 }, { priceInCents: 300 }],
    };
    beforeEach(() => {
      sequelizeUserMock = sinon.stub(Product, 'findAndCountAll');
      sequelizeUserMock.returns(userResponse);
    });
    afterEach(() => {
      sequelizeUserMock.restore();
    });
    it('when call getProducts without user-id then do not return discount', async () => {
      await request(server)
        .get('/v1/product')
        .then((res) => {
          assert.deepStrictEqual({
            itens: [{ priceInCents: 100 }, { priceInCents: 200 }, { priceInCents: 300 }],
            page: 0,
            size: 2,
            totalItens: 3,
            totalPages: 2,
          }, res.body);
        });
    });
    it('when call getProducts with user-id then return products with discounts', async () => {
      const serviceMock = sinon
        .stub(serviceClient, 'getDiscountAsync')
        .callsFake(async () => new DiscountResponseMock(5));

      await request(server)
        .get('/v1/product')
        .set({ 'x-user-id': 3 })
        .then((res) => {
          assert.deepStrictEqual({
            itens: [
              {
                priceInCents: 100, discount: { percentage: 5, valueInCents: 5 },
              },
              {
                priceInCents: 200, discount: { percentage: 5, valueInCents: 10 },
              },
              {
                priceInCents: 300, discount: { percentage: 5, valueInCents: 15 },
              },
            ],
            page: 0,
            size: 2,
            totalItens: 3,
            totalPages: 2,
          }, res.body);
        });
      serviceMock.restore();
    });
    it('when call getProducts with db error then return error message', async () => {
      sequelizeUserMock.throws(new Error('database error'));
      await request(server)
        .get('/v1/product')
        .set({ 'x-user-id': 3 })
        .then((res) => {
          assert.deepStrictEqual({ message: 'database error' }, res.body);
        });
    });
    it('when call getProducts with service error then return error message', async () => {
      const serviceMock = sinon
        .stub(serviceClient, 'getDiscountAsync')
        .throws(new Error('service error'));
      await request(server)
        .get('/v1/product')
        .set({ 'x-user-id': 3 })
        .then((res) => {
          assert.deepStrictEqual(
            {
              itens: [
                { priceInCents: 100, discount: { valueInCents: 0, percentage: 0 } },
                { priceInCents: 200, discount: { valueInCents: 0, percentage: 0 } },
                { priceInCents: 300, discount: { valueInCents: 0, percentage: 0 } },
              ],
              page: 0,
              size: 2,
              totalItens: 3,
              totalPages: 2,
            }, res.body,
          );
        });
      serviceMock.restore();
    });
  });
});
