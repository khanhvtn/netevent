const { Facility } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');

/**
 *  =====================================
 *          FACILITY CONTROLLER
 *  =====================================
 */

/**
 * @decsription Create new facility with following request
 * @method POST
 * @route /api/facility/login
 *
 * @version 1.0
 */
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

/**
 * @decsription Get, search and filter facilities (included paging)
 * @method GET
 * @route /api/facility/filter
 *
 * @version 1.0
 */
const filter = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const createdMaxDate = await Facility.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await Facility.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await Facility.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await Facility.find()
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
            isDeleted: false,
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
        Add isDeleted  filter
        Default is false
         */
        if (req.query.isDeleted) {
            options = {
                ...options,
                isDeleted: req.query.isDeleted
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
        Variable total facility based on search and filter
         */
        const totalFacilities = await Facility.find({
            $or: [
                { name: new RegExp(options.search, 'i') },
                { type: new RegExp(options.search, 'i') },
                { code: new RegExp(options.search, 'i') }
            ],
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate
            },
            isDeleted: options.isDeleted
        }).countDocuments();

        let totalPages = (totalFacilities / options.take)
            .toString()
            .includes('.')
            ? Math.ceil(totalFacilities / options.take)
            : totalFacilities / options.take;

        //return data to client
        const facilities = await Facility.find({
            $or: [
                { name: new RegExp(options.search, 'i') },
                { type: new RegExp(options.search, 'i') },
                { code: new RegExp(options.search, 'i') }
            ],
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate
            },
            isDeleted: options.isDeleted
        })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, facilities, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Update facility by new request update
 * @method PATCH
 * @route /api/facility/update
 *
 * @version 1.0
 */
const updateFacility = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedFacility = await Facility.findOneAndUpdate(
            { name: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedFacility, null);
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
 * @decsription Delete facilities from the request names
 * @method DELETE
 * @route /api/facility/delete
 *
 * @version 1.0
 */
const deleteFacility = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        const deletedFacilities = await Facility.updateMany(
            { name: { $in: deleteList } },
            { $set: { isDeleted: true } }
        );
        return cusResponse(res, 200, deletedFacilities, null);
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
 * @decsription Delete facilities from the request names
 * @method DELETE
 * @route /api/facility/deleteP
 *
 * @version 1.0
 */
const deleteFacilityPermanent = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        const deletedFacilities = await Facility.deleteMany({
            name: { $in: deleteList }
        });
        return cusResponse(res, 200, deletedFacilities, null);
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
 * @decsription Recovery facilities from the request names
 * @method PATCH
 * @route /api/facility/recovery
 *
 * @version 1.0
 */
const recoveryFacility = async (req, res, next) => {
    try {
        const { recoveryList } = req.body;
        const recoveryFacilities = await Facility.updateMany(
            { name: { $in: recoveryList } },
            { $set: { isDeleted: false } }
        );
        return cusResponse(res, 200, recoveryFacilities, null);
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

const getAllFacility = async (req, res, next) => {
    try {
        const facilities = await Facility.find({});
        return cusResponse(res, 200, facilities, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Get specific facility by id param
 * @method GET
 * @route /api/facility/:id
 *
 * @version 1.0
 */
const getFacility = async (req, res, next) => {
    const { id: _id } = req.params;
    try {
        const facility = await Facility.findById(_id);
        return cusResponse(res, 200, facility, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    createFacility,
    getFacility,
    filter,
    deleteFacility,
    updateFacility,
    getAllFacility,
    deleteFacilityPermanent,
    recoveryFacility
};
