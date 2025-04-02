const winston = require('winston');
const os = require('os');

const host = os.hostname();

const format = winston.format((info) => ({
  timestamp: Date.now(),
  host,
  _application: 'product_api',
  ...info,
}));

const logger = winston.createLogger({
  format: winston.format.combine(
    format(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
