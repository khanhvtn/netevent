const { cusResponse } = require('../utils');

module.exports = (err, req, res) => {
  const { code, errors } = err;
  return cusResponse(res, code, null, errors);
};
