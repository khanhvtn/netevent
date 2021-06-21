const { FacilityHistory } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const mongoose = require('mongoose');

/**
 *  =====================================
 *       FACILITY HISTORY CONTROLLER
 *  =====================================
 */

/**
 * @decsription Create new facility history with following request
 * @method POST
 * @route /api/facilityHistory/create
 *
 * @version 1.0
 */
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

/**
 * @decsription Get, search and filter facilityHistory (included paging)
 * @method GET
 * @route /api/facilityHistory/filter
 *
 * @version 1.0
 */
const filter = async (req, res, next) => {
    const selectedFacility = req.query.id
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
        const borrowMaxDate = await FacilityHistory.find()
            .sort({ borrowDate: -1 })
            .limit(1);
        const borrowMinDate = await FacilityHistory.find()
            .sort({ borrowDate: 1 })
            .limit(1);
        const returnMaxDate = await FacilityHistory.find()
            .sort({ returnDate: -1 })
            .limit(1);
        const returnMinDate = await FacilityHistory.find()
            .sort({ returnDate: 1 })
            .limit(1);
        const listRangeDate = await Promise.all([
            createdMaxDate,
            createdMinDate,
            updatedMaxDate,
            updatedMinDate,
            borrowMaxDate,
            borrowMinDate,
            returnMaxDate,
            returnMinDate,
        ]);
        //return empty result to client if database has no data.
        if (
            !createdMaxDate.length ||
            !createdMinDate.length ||
            !updatedMaxDate.length ||
            !updatedMinDate.length ||
            !borrowMaxDate ||
            !borrowMinDate ||
            !returnMaxDate ||
            !returnMinDate
        ) {
            return cusResponse(res, 200, [], null);
        }

        let options = {
            search: '',
            take: 10,
            createdMaxDate: listRangeDate[0][0].createdAt,
            createdMinDate: listRangeDate[1][0].createdAt,
            updatedMaxDate: listRangeDate[2][0].updatedAt,
            updatedMinDate: listRangeDate[3][0].updatedAt,
            borrowMaxDate: listRangeDate[4][0].borrowDate,
            borrowMinDate: listRangeDate[5][0].borrowDate,
            returnMaxDate: listRangeDate[6][0].returnDate,
            returnMinDate: listRangeDate[7][0].returnDate,
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
        Default take is 0 means taking all.
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
            };
        }
        /* 
        Add createdTo filter
         */

        if (req.query.createdTo) {
            options = {
                ...options,
                createdMaxDate: req.query.createdTo,
            };
        }
        /* 
        Add updatedFrom filter
         */

        if (req.query.updatedFrom) {
            options = {
                ...options,
                updatedMinDate: req.query.updatedFrom,
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
        Add borrowFrom filter
         */

        if (req.query.borrowFrom) {
            options = {
                ...options,
                borrowMinDate: req.query.borrowFrom,
            };
        }
        /* 
        Add borrowTo filter
         */

        if (req.query.borrowTo) {
            options = {
                ...options,
                borrowMaxDate: req.query.borrowTo,
            };
        }
        /* 
        Add returnFrom filter
         */

        if (req.query.returnFrom) {
            options = {
                ...options,
                returnMinDate: req.query.returnFrom,
            };
        }
        /* 
        Add returnTo filter
         */

        if (req.query.returnTo) {
            options = {
                ...options,
                returnMaxDate: req.query.returnTo,
            };
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total facilityHistory based on filter
         */
        const filterFacilityHistory = await FacilityHistory.find({
            facilityId: selectedFacility,
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
            borrowDate: {
                $gte: options.borrowMinDate,
                $lte: options.borrowMaxDate,
            },
            returnDate: {
                $gte: options.returnMinDate,
                $lte: options.returnMaxDate,
            },
        })
            .populate({
                path: 'facilityId',
            })
            .populate({
                path: 'eventId',
                match: {

                    eventName: new RegExp(options.search, 'i')
                }
            })


        const totalFacilityHistory = filterFacilityHistory.filter((facilityHistory) => facilityHistory.eventId != null);

        const totalFacilityHistory1=totalFacilityHistory.length
        let totalPages = !options.take
            ? 1
            : (totalFacilityHistory1 / options.take).toString().includes('.')
                ? Math.ceil(totalFacilityHistory1 / options.take)
                : totalFacilityHistory1 / options.take;

        //return data to client
        const facilityHistories = await FacilityHistory.find({
            facilityId: selectedFacility,

            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
            borrowDate: {
                $gte: options.borrowMinDate,
                $lte: options.borrowMaxDate,
            },
            returnDate: {
                $gte: options.returnMinDate,
                $lte: options.returnMaxDate,
            },
        })
            .populate({
                path: 'facilityId',

            })
            .populate({
                path: 'eventId',
                match: {
                    eventName: new RegExp(options.search, 'i')
                }
            })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

            const newFacilityHistory = facilityHistories.filter((facilityHistory) => facilityHistory.eventId != null)



        return cusResponse(res, 200, newFacilityHistory, null, totalPages);

    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete events from the request list of facilityHistory's id
 * @method DELETE
 * @route /api/facilityHistory/delete
 *
 * @version 1.0
 */
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

const deleteEachFacilityHistory = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No facility history with that id');
        } else {
            const data = await FacilityHistory.findByIdAndRemove(_id);
            res.json(data);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

/**
 * @decsription Update eventType by new request update
 * @method PATCH
 * @route /api/facilityHistory/update
 *
 * @version 1.0
 */
const updateFacilityHistory = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedFacilityHistory = await FacilityHistory.findOneAndUpdate(
            { _id: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
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

/**
 * @decsription Get all facilityHistory
 * @method GET
 * @route /api/facilityHistory/all
 *
 * @version 1.0
 */
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
    deleteEachFacilityHistory
};
