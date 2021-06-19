const { User } = require('../models');
const Link = require('../models/linkModel');
const { cusResponse } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../class/CustomeError');
const { sendEmail } = require('./misc/mailer');
const { html } = require('../mail-template/template');

/**
 *  =====================================
 *            USER CONTROLLER
 *  =====================================
 */

/**
 * @decsription Authorize and login user
 * @method POST
 * @route /api/user/login
 *
 * @version 1.0
 */
const login = async (req, res, next) => {
    try {
        const userReq = req.body;

        //check user email exists or not.
        const existedUser = await User.findOne({ email: userReq.email });

        if (!existedUser) {
            return next(new CustomError(400, { email: 'Email is invalid' }));
        }

        //check user email already is verified or not.
        if (!existedUser.isConfirmed) {
            return next(new CustomError(400, { email: 'Email is invalid' }));
        }

        //check password
        const result = await bcrypt.compare(
            userReq.password,
            existedUser.password
        );
        if (!result) {
            return next(
                new CustomError(400, { password: 'Password is invalid' })
            );
        }

        //gen token
        const token = jwt.sign(
            {
                id: existedUser._id,
                email: existedUser.email,
                role: existedUser.role
            },
            'netevent',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), //expire in 1h
            httpOnly: true
        });

        //response token to client
        return cusResponse(
            res,
            200,
            {
                id: existedUser._id,
                email: existedUser.email,
                role: existedUser.role
            },
            null
        );
    } catch (error) {
        return next(new CustomError(500, { sysError: error.message }));
    }
};

/**
 * @decsription Checking and retủn user data if authorized
 * @method POST
 * @route /api/user/fetchCurrent
 *
 * @version 1.0
 */
const fetchCurrentUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await User.findOne({ email: userData.email });
        if (user) {
            return cusResponse(res, 200, user, null);
        }
    } catch (error) {
        return next(new CustomError(500, { sysError: error.message }));
    }
};

/**
 * @decsription Checking and return user data if authorized
 * @method GET
 * @route /api/user/userCheck
 *
 * @version 1.0
 */
const userCheck = async (req, res, next) => {
    try {
        //response user info to client
        return cusResponse(res, 200, req.user, null);
    } catch (error) {
        return next(new CustomError(500, { sysError: error.message }));
    }
};

/**
 * @decsription Checking and return user data if authorized
 * @method POST
 * @route /api/user/userCheck
 *
 * @version 1.0
 */
const logout = async (req, res, next) => {
    try {
        //clear token
        res.clearCookie('token');
        //response user info to client
        return cusResponse(res, 200, null, null);
    } catch (error) {
        return next(new CustomError(500, { sysError: error.message }));
    }
};

/**
 * @decsription Create and return new user for client
 * @method POST
 * @route /api/user/create
 *
 * @version 1.0
 */
const createUser = async (req, res, next) => {
    try {
        const userReq = req.body;

        //check user is existed or not.
        const existedUser = await User.findOne({ email: userReq.email });

        if (existedUser) {
            return next(new CustomError(400, 'Email is already existed'));
        }

        //create new user
        const newUser = await User.create(userReq);
        const newLink = {
            user: newUser._id
        };

        //create new link
        const idLink = await Link.create(newLink);

        //send email
        await sendEmail(
            'noreply@netevent.com',
            userReq.email,
            'User Confirmation Link',
            html(userReq.email, idLink._id)
        );

        //response new user to client
        return cusResponse(res, 200, newUser, null);
    } catch (error) {
        if (error.name == 'ValidationError') {
            let errors = {};
            for (field in error.errors) {
                errors = { ...errors, [field]: error.errors[field].message };
            }
            return next(new CustomError(500, errors));
        }
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Get, search and filter users (included paging)
 * @method GET
 * @route /api/user/filter
 *
 * @version 1.0
 */
const filterUser = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const createdMaxDate = await User.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await User.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await User.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await User.find()
            .sort({ updatedAt: 1 })
            .limit(1);
        const listRangeDate = await Promise.all([
            createdMaxDate,
            createdMinDate,
            updatedMaxDate,
            updatedMinDate
        ]);

        //return empty result to client if database has no data.
        if (
            !createdMaxDate.length ||
            !createdMinDate.length ||
            !updatedMaxDate.length ||
            !updatedMinDate.length
        ) {
            return cusResponse(res, 200, [], null);
        }

        let options = {
            search: '',
            take: 10,
            role: {
                $in: ['1', '2', '3', '4']
            },
            createdMaxDate: listRangeDate[0][0].createdAt,
            createdMinDate: listRangeDate[1][0].createdAt,
            updatedMaxDate: listRangeDate[2][0].updatedAt,
            updatedMinDate: listRangeDate[3][0].updatedAt
        };

        //adding search
        if (req.query.search) {
            options = {
                ...options,
                search: req.query.search.toString()
            };
        }

        /* 
        Add take row filter
        Default take is 5
         */
        if (req.query.take) {
            options = {
                ...options,
                take: parseInt(req.query.take.toString())
            };
        }

        /* 
        Add role filter
        Default role will match all
         */
        if (req.query.role) {
            options = {
                ...options,
                role: { $in: [req.query.role] }
            };
        }

        /* 
        Add createdFrom filter
         */

        if (req.query.createdFrom) {
            options = {
                ...options,
                createdMinDate: req.query.createdFrom
                // createdMinDate: new Date(req.query.createdFrom),
            };
        }
        /* 
        Add createdTo filter
         */

        if (req.query.createdTo) {
            options = {
                ...options,
                createdMaxDate: req.query.createdTo
                // createdMaxDate: new Date(req.query.createdTo),
            };
        }
        /* 
        Add updatedFrom filter
         */

        if (req.query.updatedFrom) {
            options = {
                ...options,
                updatedMinDate: req.query.updatedFrom
                // updatedMinDate: new Date(req.query.updatedFrom),
            };
        }
        /* 
        Add updatedTo filter
         */

        if (req.query.updatedTo) {
            options = {
                ...options,
                updatedMaxDate: req.query.updatedTo
                // updatedMaxDate: new Date(req.query.updatedTo),
            };
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total user based on search and filter
         */
        const totalUsers = await User.find({
            $or: [{ email: new RegExp(options.search, 'i') }],
            role: options.role,
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate
            }
        }).countDocuments();

        let totalPages = (totalUsers / options.take).toString().includes('.')
            ? Math.ceil(totalUsers / options.take)
            : totalUsers / options.take;

        //return data to client
        const users = await User.find({
            $or: [{ email: new RegExp(options.search, 'i') }],
            role: options.role,
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate
            }
        })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, users, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Update user by new request update
 * @method PATCH
 * @route /api/user/update
 *
 * @version 1.0
 */
const updateUser = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedUser, null);
    } catch (error) {
        if (error.name == 'ValidationError') {
            let errors = {};
            for (field in error.errors) {
                errors = { ...errors, [field]: error.errors[field].message };
            }
            return next(new CustomError(500, errors));
        }
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete users from the request emails
 * @method DELETE
 * @route /api/user/delete
 *
 * @version 1.0
 */
const deleteUser = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        if (deleteList.length === 1) {
            const deletedUser = await User.findOneAndDelete({
                email: deleteList[0]
            });
            return cusResponse(res, 200, deletedUser, null);
        } else {
            const deletedUsers = await Promise.all(
                deleteList.map(async (email) => {
                    return await User.findOneAndDelete({
                        email
                    });
                })
            );
            return cusResponse(res, 200, deletedUsers, null);
        }
    } catch (error) {
        if (error.name == 'ValidationError') {
            let errors = {};
            for (field in error.errors) {
                errors = { ...errors, [field]: error.errors[field].message };
            }
            return next(new CustomError(500, errors));
        }
        return next(new CustomError(500, error.message));
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({ isConfirmed: true });
        return cusResponse(res, 200, users, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    login,
    logout,
    userCheck,
    createUser,
    filterUser,
    updateUser,
    deleteUser,
    getAllUser,
    fetchCurrentUser
};
