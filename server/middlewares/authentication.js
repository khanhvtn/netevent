const jwt = require('jsonwebtoken');
const { cusResponse } = require('../utils');
const auth = async (req, res, next) => {
    try {
        /* If clients request without authorization, then request will be denied. */
        const token = req.cookies.token;
        if (!token) {
            return cusResponse(res, 401, null, 'Access Denied');
        }

        let decodedData;
        //verify token of user from own database
        decodedData = jwt.verify(token, 'netevent');
        req.user = {
            email: decodedData.email,
            role: decodedData.role,
        };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return cusResponse(res, 401, null, 'User session is expired');
        }
    }
};

module.exports = auth;
