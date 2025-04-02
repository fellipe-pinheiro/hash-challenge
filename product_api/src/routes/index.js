const ProductRoutes = require('./product');
const HealthCheckRoutes = require('./healthcheck');

module.exports = (app) => {
  app.use('/v1/product', ProductRoutes);
  app.use('/v1/healthcheck', HealthCheckRoutes);
};
