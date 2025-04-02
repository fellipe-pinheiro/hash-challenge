const assert = require('assert');
const sinon = require('sinon');
const serviceClient = require('../../../src/services/service_client');
const { Users } = require('../../../src/services');
const DiscountResponseMock = require('../fixtures/discount_response');

describe('services: Users', () => {
  context('getDiscount', () => {
    const product = { id: 0 };
    const userId = 0;
    it('when call getDiscount then return valid value', async () => {
      const serviceMock = sinon
        .stub(serviceClient, 'getDiscountAsync')
        .callsFake(async () => new DiscountResponseMock(3));

      const discountResponse = await Users.getDiscount(product, userId);
      assert.deepStrictEqual(3, discountResponse.percentage);
      serviceMock.restore();
    });
    it('when call getDiscount with service unavailable then return empty object', async () => {
      const serviceMock = sinon
        .stub(serviceClient, 'getDiscountAsync')
        .callsFake(async () => { throw new Error('service error'); });

      const discountResponse = await Users.getDiscount(product, userId);
      assert.deepStrictEqual({ percentage: 0 }, discountResponse);
      serviceMock.restore();
    });
  });
});
