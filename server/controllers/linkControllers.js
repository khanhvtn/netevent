const Link = require('../models/linkModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');

/**
 *  =====================================
 *            LINK CONTROLLER
 *  =====================================
 */

/**
 * @decsription Get all links
 * @method GET
 * @route /api/link
 *
 * @version 1.0
 */
const getLinks = async (req, res) => {
    try {
        const linkData = await Link.find();
        if (linkData) {
            return res.status(200).json(linkData);
        } else {
            return res.status(500).json('No Link Exists');
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

/**
 * @decsription Get specific link by id param
 * @method GET
 * @route /api/link/:id
 *
 * @version 1.0
 */
const getLink = async (req, res, next) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return cusResponse(res, 200, false, null);
        } else {
            const link = await Link.findById(_id);
            if (link) {
                return cusResponse(res, 200, true, null);
            } else {
                return cusResponse(res, 200, false, null);
            }
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Check valid link and update confirm password
 * @method PATCH
 * @route /api/link/confirm/:id
 *
 * @version 1.0
 */
const confirmPassword = async (req, res, next) => {
    const { password } = req.body;
    try {
        hashPassword = await bcrypt.hash(password, 10);

        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No link with that id');
        } else {
            const data = await Link.findByIdAndRemove(_id);
            const userID = data.user;
            const update = await User.findByIdAndUpdate(
                userID,
                { $set: { isConfirmed: true, password: hashPassword } },
                { new: true }
            );
            res.json(update);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete specific link by id param
 * @method DELETE
 * @route /api/link/:id
 *
 * @version 1.0
 */
const deleteLink = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No link with that id');
        } else {
            const data = await Link.findByIdAndRemove(_id);
            res.json(data);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    getLinks,
    getLink,
    confirmPassword,
    deleteLink
};
