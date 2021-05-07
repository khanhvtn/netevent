const { User } = require('../models');
const Link = require('../models/linkModel')
const { cusResponse } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../class/CustomeError');
const { sendEmail } = require('./misc/mailer')
const { html } = require('../mail-template/template')
const mongoose = require('mongoose')

//Get All Users
const getUsers = async (req, res, next) => {
    try {
        const userData = await User.find();
        if (userData) {
            return cusResponse(res, 200, userData, null);
        } else {
            return cusResponse(res, 404, "No User Data", null);


        }
    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

//Paginatting
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

//Get User List
const getUser = async (req, res, next) => {
    try {
        const features = new APIfeatures(User.find(), req.query).paginating()

        const users = await features.query

        res.status(200).json({
            status: 'success',
            result: users.length,
            users: users
        })

    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

//Create User
const createUser = async (req, res, next) => {
    try {
        const userReq = req.body;
        //check user is existed or not.
        const existedUser = await User.findOne({ email: userReq.email });

        if (existedUser) {
            return next(new CustomError(400, 'Email is already existed'));
        }


        const newUser = await User.create(userReq);
        const newLink = {
            user: newUser._id
        }

        const idLink = await Link.create(newLink);
        await sendEmail(
            'noreply@netevent.com',
            userReq.email,
            'User Confirmation Link',
            html(userReq.email, idLink._id)
        )
        return cusResponse(res, 200, newUser, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

// const deleteUser = async (req, res) => {
//     const { id: _id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send('No user with that id');
//     }
//     await User.findByIdAndRemove(_id);
//     res.json({ message: 'User deleted successfully' });
// }


//user login
const login = async (req, res, next) => {
    try {
        const userReq = req.body;

        //check user email exists or not.
        const existedUser = await User.findOne({ email: userReq.email });

        if (!existedUser) {
            return next(new CustomError(400, 'Email or password is invalid'));
        }
        //check password
        const result = await bcrypt.compare(
            userReq.password,
            existedUser.password
        );
        if (!result) {
            return next(new CustomError(400, 'Email or password is invalid'));
        }

        //gen token
        const token = jwt.sign(
            { email: existedUser.email, role: existedUser.role },
            'netevent',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), //expire in 1h
            httpOnly: true,
        });

        //response token to client
        return cusResponse(
            res,
            200,
            { email: existedUser.email, role: existedUser.role },
            null
        );
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

//user login
const userCheck = async (req, res, next) => {
    try {
        //response user info to client
        return cusResponse(res, 200, req.user, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

//Delete user
const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Deleted a User" })
    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

module.exports = {
    createUser,
    login,
    userCheck,
    getUsers,
    getUser,
    deleteUser
};
