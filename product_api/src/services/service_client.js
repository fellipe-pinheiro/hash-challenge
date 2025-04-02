const grpc = require('@grpc/grpc-js');
const { promisify } = require('util');
const services = require('../stub/user_grpc_pb');

const client = new services.DiscountClient(
  `${process.env.USER_API_HOST}:${process.env.USER_API_PORT}`,
  grpc.credentials.createInsecure(),
);

const getDiscountAsync = promisify(client.getDiscount).bind(client);

module.exports = {
  client,
  getDiscountAsync,
};
