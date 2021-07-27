const jwt = require('jsonwebtoken');
const { cusResponse } = require('../utils');

const auth = async (req, res, next) => {
    try {
        /* If clients request without authorization, then request will be denied. */
        const encryptedToken = req.cookies.token;
        if (!encryptedToken) {
            return cusResponse(res, 401, null, {
                authentication: 'Access Denied'
            });
        }

        //Decrypt encrypted token
        var bytes = CryptoJS.AES.decrypt(
            encryptedToken,
            process.env.SECRET_KEY
        );
        var token = bytes.toString(CryptoJS.enc.Utf8);
        let decodedData;
        //verify token of user from own database
        decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id: decodedData.id,
            email: decodedData.email,
            role: decodedData.role
        };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return cusResponse(res, 401, null, {
                authentication: 'User session is expired'
            });
        } else {
            return cusResponse(res, 401, null, {
                authentication: 'Access Denied'
            });
        }
    }
};

module.exports = auth;
