const { User } = require('../models');
const { cusResponse } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../class/CustomeError');

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

//Create User
const createUser = async (req, res, next) => {
    try {
        const userReq = req.body;
        //check user is existed or not.
        const existedUser = await User.findOne({ email: userReq.email });

        if (existedUser) {
            return next(new CustomError(400, 'Email is already existed'));
        }

        //hash password
        hashPassword = await bcrypt.hash(userReq.password, 10);

        //update hash password to userReq
        userReq.password = hashPassword;

        const newUser = await User.create(userReq);
        return cusResponse(res, 200, newUser, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

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
            expires: new Date(Date.now() + 60000),
            httpOnly: true,
        });

        //response token to client
        return cusResponse(res, 200, {}, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

//Get User List
const getUser = async(req, res, next) => {
    try {
        const features = new APIfeatures(User.find(), req.query)
        .paginating()

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

//Delete user
const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Deleted a User"})
    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

module.exports = {
    createUser,
    login,
    getUser,
    deleteUser
};
