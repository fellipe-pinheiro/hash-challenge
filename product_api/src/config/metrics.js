const prometheus = require('express-prometheus-middleware');

module.exports = (app) => {
  app.use(prometheus({
    collectDefaultMetrics: true,
    collectGCMetrics: true,
    requestDurationBuckets: [10, 50, 100, 500, 1000, 5000, 10000, 50000],
  }));
};
