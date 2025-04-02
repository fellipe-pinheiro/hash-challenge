const logger = require('../config/log');
const messages = require('../stub/user_pb');
const serviceClient = require('./service_client');

const getDiscount = async (product, userId) => {
  try {
    const discountRequest = new messages.DiscountRequest();
    discountRequest.setUserid(userId);
    discountRequest.setProductid(product.id);

    const discountResponse = await serviceClient.getDiscountAsync(discountRequest);
    return {
      percentage: discountResponse.getPercentage(),
    };
  } catch (error) {
    logger.error('service get discount error: ', error);
    return {
      percentage: 0,
    };
  }
};

module.exports = {
  getDiscount,
};
