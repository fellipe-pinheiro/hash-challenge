const getUserId = ({ headers = {}, query = {} }) => headers['x-user-id'] || query['user-id'];

module.exports = {
  getUserId,
};
