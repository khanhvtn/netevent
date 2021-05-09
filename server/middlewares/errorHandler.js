const { cusResponse } = require('../utils');

module.exports = (err, req, res, next) => {
    const { code, errors } = err;
    return cusResponse(res, code, null, errors);
};
