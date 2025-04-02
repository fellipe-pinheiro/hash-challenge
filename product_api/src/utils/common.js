const executionEnvironments = ['dev', 'qa', 'prod'];

const isTestEnv = () => !executionEnvironments.includes(process.env.NODE_ENV);

const toInt = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

module.exports = {
  isTestEnv,
  toInt,
};
