const { toInt } = require('./common');

const DEFAULT_SIZE = Object.freeze(2);
const DEFAULT_PAGE = Object.freeze(0);

const getPagingData = ({ page = DEFAULT_PAGE, size = DEFAULT_SIZE }) => {
  const limit = toInt(size);
  const offset = (toInt(page)) * limit;

  return { limit, offset, page: toInt(page) };
};

const getPagedData = (itens, totalItens, page, size) => {
  const totalPages = Math.ceil(totalItens / size);

  return {
    itens,
    page,
    size,
    totalItens,
    totalPages,
  };
};

module.exports = {
  getPagedData,
  getPagingData,
};
