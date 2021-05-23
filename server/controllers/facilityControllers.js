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
            updatedMinDate,
        ]);

        let options = {
            search: '',
            take: 10,
            type: '',
            status: {
                $in: [false, true],
            },
            createdMaxDate: listRangeDate[0][0].createdAt,
            createdMinDate: listRangeDate[1][0].createdAt,
            updatedMaxDate: listRangeDate[2][0].updatedAt,
            updatedMinDate: listRangeDate[3][0].updatedAt,
        };
        //adding search
        if (req.query.search) {
            options = {
                ...options,
                search: req.query.search.toString(),
            };
        }

        /* 
        Add take row filter
        Default take is 5
         */
        if (req.query.take) {
            options = {
                ...options,
                take: parseInt(req.query.take.toString()),
            };
        }

        /* 
        Add status filter
        Default status will match all
         */
        if (req.query.status) {
            options = {
                ...options,
                status: req.query.status === 'true',
            };
        }

        /* 
        Add createdFrom filter
         */

        if (req.query.createdFrom) {
            options = {
                ...options,
                createdMinDate: req.query.createdFrom,
                // createdMinDate: new Date(req.query.createdFrom),
            };
        }
        /* 
        Add createdTo filter
         */

        if (req.query.createdTo) {
            options = {
                ...options,
                createdMaxDate: req.query.createdTo,
                // createdMaxDate: new Date(req.query.createdTo),
            };
        }
        /* 
        Add updatedFrom filter
         */

        if (req.query.updatedFrom) {
            options = {
                ...options,
                updatedMinDate: req.query.updatedFrom,
                // updatedMinDate: new Date(req.query.updatedFrom),
            };
        }
        /* 
        Add updatedTo filter
         */

        if (req.query.updatedTo) {
            options = {
                ...options,
                updatedMaxDate: req.query.updatedTo,
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
                { code: new RegExp(options.search, 'i') },
            ],
            status: options.status,
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
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
                { code: new RegExp(options.search, 'i') },
            ],
            status: options.status,
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
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
const deleteFacilities = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        if (deleteList.length === 1) {
            const deletedFacility = await Facility.findOneAndDelete({
                name: deleteList[0],
            });
            return cusResponse(res, 200, deletedFacility, null);
        } else {
            const deletedFacilities = await Promise.all(
                deleteList.map(async (name) => {
                    return await Facility.findOneAndDelete({
                        name,
                    });
                })
            );
            return cusResponse(res, 200, deletedFacilities, null);
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


module.exports = {
    createFacility,
    filter,
    deleteFacilities,
    updateFacility,
};
