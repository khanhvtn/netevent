const { Facility } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const createFacility = async (req, res, next) => {
    try {
        const facility = new Facility(req.body);
        //validate user request fields.
        await facility.validate();

        //create new facility
        const newFacility = await facility.save();
        return cusResponse(res, 200, newFacility, null);

        // const newFacility = await Facility.create(userReq);
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

module.exports = {
    createFacility,
};
