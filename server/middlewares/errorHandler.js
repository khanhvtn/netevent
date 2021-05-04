const { cusResponse } = require('../utils');

module.exports = (err, req, res, next) => {
    const { code, message } = err;
    return cusResponse(res, code, null, message);
};
