const { map: promiseMap } = require('p-iteration');
const { Product } = require('../models');
const { Users } = require('../services');
const logger = require('../config/log');
const { getPagedData, getPagingData } = require('../utils/pagination');
const { getUserId } = require('../utils/request');

const getProductsWithDiscount = async (products, userId) => {
  const discountProducts = await promiseMap(products, async (product) => {
    const { percentage } = await Users.getDiscount(product, userId);
    return {
      ...product,
      discount: {
        percentage,
        valueInCents: Math.floor(product.priceInCents * (percentage / 100)),
      },
    };
  });
  return discountProducts;
};

const searchProducts = async (limit, offset) => {
  try {
    const dbResponse = await Product.findAndCountAll(
      { limit, offset, raw: true },
    );

    return {
      products: dbResponse.rows,
      count: dbResponse.count,
    };
  } catch (error) {
    logger.error('error searching data from db ', error);
    throw error;
  }
};

const getProducts = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { limit, offset, page } = getPagingData(req.query);
    let products = [];

    const productsDb = await searchProducts(limit, offset);
    products = productsDb.products;
    logger.info(`list products with parans ${JSON.stringify(req.query)}`);

    if (products && userId) {
      logger.info(`resquest with userId ${userId}`);
      products = await getProductsWithDiscount(productsDb.products, userId);
    }

    return res.json(getPagedData(products, productsDb.count, page, limit));
  } catch (error) {
    logger.error('request error ', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
};
