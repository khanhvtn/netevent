const { Facility } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const { mongoose } = require('mongoose');

//Get All Users
const getFacilities = async (req, res, next) => {
    try {
        const facilityData = await Facility.find();
        if (facilityData) {
            return cusResponse(res, 200, facilityData, null);
        } else {
            return cusResponse(res, 404, "No User Data", null);
        }
    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

//Create User
const createFacility = async (req, res, next) => {
    const facility = req.body;
    //check user is existed or not.
    const newFacility = new Facility(facility)

    try {
        await newFacility.save()
        return cusResponse(res, 200, newFacility, null);

    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

//Delete user
const deleteFacility = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Facility.findByIdAndDelete(id)
        return cusResponse(res, 200, id, null)

    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

const searchFacility = async (req, res, next) => {
    const { searchString } = req.body;

    if (!searchString) {
        return next(new CustomError(400, 'Invalid Search'))
    }

    try {
        const searchResult = await Facility.find({ name: { $regex: searchString } });

        if (searchResult.length === 0) {
            return cusResponse(res, 200, searchResult, null);
        }

        return cusResponse(res, 200, searchResult, null);

    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}

// const filterFacility = async (req, res, next) => {
//     const { searchString } = req.body;

//     if (!searchString) {
//         return next(new CustomError(400, 'Invalid Search'))
//     }

//     try {
//         const searchResult = await User.find({ email: { $regex: searchString } });

//         if (searchResult.length === 0) {
//             return cusResponse(res, 200, searchResult, null);
//         }

//         return cusResponse(res, 200, searchResult, null);

//     } catch (error) {
//         return next(new CustomError(500, error.message))
//     }
// }

const updateFacility = async (req, res, next) => {
    const { id } = req.params;
    const updateFacility = req.body;

    try {
        const newUpdateFacility = await Facility.findByIdAndUpdate(
            id,
            { ...updateFacility },
            { new: true }
        )
        return cusResponse(res, 200, newUpdateFacility, null)

    } catch (error) {
        console.log(error.message)
        return next(new CustomError(500), error.message)
    }
}

module.exports = {
    getFacilities,
    createFacility,
    updateFacility,
    deleteFacility,
    searchFacility,
};
