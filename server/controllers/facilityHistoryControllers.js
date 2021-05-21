const { FacilityHistory } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const createFacilityHistory = async (req, res, next) => {
    try {
        const facilityHistory = new FacilityHistory(req.body);
        //validate user request fields.
        await facilityHistory.validate();

        //create new facilityHistory
        const newFacilityHistory = await facilityHistory.save();
        return cusResponse(res, 200, newFacilityHistory, null);
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

const filter = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const createdMaxDate = await FacilityHistory.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await FacilityHistory.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await FacilityHistory.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await FacilityHistory.find()
            .sort({ updatedAt: 1 })
            .limit(1);
        const listRangeDate = await Promise.all([
            createdMaxDate,
            createdMinDate,
            updatedMaxDate,
            updatedMinDate,
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
            take: 5,
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
            };
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total facilityHistory based on search and filter
         */
        const totalFacilityHistory = await FacilityHistory.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
        }).countDocuments();

        let totalPages = (totalFacilityHistory / options.take)
            .toString()
            .includes('.')
            ? Math.ceil(totalFacilityHistory / options.take)
            : totalFacilityHistory / options.take;

        //return data to client
        const facilityHistories = await FacilityHistory.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
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

        return cusResponse(res, 200, facilityHistories, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

const deleteFacilityHistory = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        if (deleteList.length === 1) {
            const deletedFacilityHistory = await FacilityHistory.findOneAndDelete(
                {
                    _id: deleteList[0],
                }
            );
            return cusResponse(res, 200, deletedFacilityHistory, null);
        } else {
            const deletedFacilityHistory = await Promise.all(
                deleteList.map(async (_id) => {
                    return await FacilityHistory.findOneAndDelete({
                        _id,
                    });
                })
            );
            return cusResponse(res, 200, deletedFacilityHistory, null);
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

const updateFacilityHistory = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedFacilityHistory = await FacilityHistory.findOneAndUpdate(
            { _id: userReq.filter },
            userReq.update,
            { runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedFacilityHistory, null);
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

const getAllFacilityHistory = async (req, res, next) => {
    try {
        const facilityHistories = await FacilityHistory.find({}).populate({
            path: 'facilityId eventId',
            populate: [{ path: 'taskListId' }],
        });
        return cusResponse(res, 200, facilityHistories, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    createFacilityHistory,
    filter,
    deleteFacilityHistory,
    updateFacilityHistory,
    getAllFacilityHistory,
};
