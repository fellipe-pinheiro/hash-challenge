const router = require('express')();
const { getProducts } = require('../controllers/product');

router.get('/', getProducts);

module.exports = router;
