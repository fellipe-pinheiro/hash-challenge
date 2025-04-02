const express = require('express');
const config = require('config');
const { isTestEnv } = require('./utils/common');

const app = express();

app.use(express.json());

require('./config/cors')(app);
require('./config/metrics')(app);
require('./routes')(app);

if (!isTestEnv()) {
  app.listen(config.port, config.host, () => {
    console.log(`Running on http://${config.host}:${config.port}`);
  });
}

module.exports = app;
