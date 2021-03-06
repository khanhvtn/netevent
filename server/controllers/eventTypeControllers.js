const { EventType } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomError');

/**
 *  =====================================
 *          EVENT TYPE CONTROLLER
 *  =====================================
 */

/**
 * @description Create new event type with following request
 * @method POST
 * @route /api/eventType/create
 *
 * @version 1.0
 */
const createEventType = async (req, res, next) => {
    try {
        const eventType = new EventType(req.body);
        //validate user request fields.
        await eventType.validate();

        //create new eventType
        const newEventType = await eventType.save();
        return cusResponse(res, 200, newEventType, null);
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
 * @description Get, search and filter eventTypes (included paging)
 * @method GET
 * @route /api/eventType/filter
 *
 * @version 1.0
 */
const filter = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const createdMaxDate = await EventType.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await EventType.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await EventType.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await EventType.find()
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
            take: 5,
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
            };
        }

        /*
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /*
        Variable total eventType based on search and filter
         */
        const totalEventType = await EventType.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
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

        let totalPages = (totalEventType / options.take)
            .toString()
            .includes('.')
            ? Math.ceil(totalEventType / options.take)
            : totalEventType / options.take;

        //return data to client
        const eventTypes = await EventType.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
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

        return cusResponse(res, 200, eventTypes, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @description Update eventType by new request update
 * @method PATCH description
 * @route /api/eventType/update
 *
 * @version 1.0
 */
const updateEventType = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedEventType = await EventType.findOneAndUpdate(
            { name: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedEventType, null);
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
 * @description Get all events
 * @method GET
 * @route /api/eventType/all
 *
 * @version 1.0
 */
const getAllEventType = async (req, res, next) => {
    try {
        const eventTypes = await EventType.find({});
        return cusResponse(res, 200, eventTypes, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @description Delete events from the request list of eventType's name
 * @method DELETE
 * @route /api/eventType/delete
 *
 * @version 1.0
 */
const deleteEventType = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        const deletedEventType = await EventType.updateMany(
            { name: { $in: deleteList } },
            { $set: { isDeleted: true } }
        );
        return cusResponse(res, 200, deletedEventType, null);
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
 * @description Delete permanent event types from the request list of eventType's name
 * @method DELETE
 * @route /api/eventType/deleteP
 *
 * @version 1.0
 */
const deleteEventTypePermanent = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        const deletedEventType = await EventType.deleteMany({
            name: { $in: deleteList }
        });
        return cusResponse(res, 200, deletedEventType, null);
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
 * @description Recover event types from the request list of eventType's name
 * @method PATCH
 * @route /api/eventType/recovery
 *
 * @version 1.0
 */
const recoveryEventType = async (req, res, next) => {
    try {
        const { recoveryList } = req.body;
        const recoveryEventType = await EventType.updateMany(
            {
                name: { $in: recoveryList }
            },
            { $set: { isDeleted: false } }
        );
        return cusResponse(res, 200, recoveryEventType, null);
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
    createEventType,
    filter,
    deleteEventType,
    updateEventType,
    getAllEventType,
    deleteEventTypePermanent,
    recoveryEventType
};
