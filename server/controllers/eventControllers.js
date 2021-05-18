const { Event } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const createEvent = async (req, res, next) => {
    try {
        const event = new Event(req.body);
        //validate user request fields.
        await event.validate();

        //create new event
        const newEvent = await event.save();
        return cusResponse(res, 200, newEvent, null);
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
        const createdMaxDate = await Event.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await Event.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await Event.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await Event.find()
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
        Variable total event based on search and filter
         */
        const totalEvent = await Event.find({
            $or: [{ eventName: new RegExp(options.search, 'i') }],
            createdAt: {
                $gte: options.createdMinDate,
                $lte: options.createdMaxDate,
            },
            updatedAt: {
                $gte: options.updatedMinDate,
                $lte: options.updatedMaxDate,
            },
        }).countDocuments();

        let totalPages = (totalEvent / options.take).toString().includes('.')
            ? Math.ceil(totalEvent / options.take)
            : totalEvent / options.take;

        //return data to client
        const events = await Event.find({
            $or: [{ eventName: new RegExp(options.search, 'i') }],
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

        return cusResponse(res, 200, events, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        if (deleteList.length === 1) {
            const deletedEvent = await Event.findOneAndDelete({
                eventName: deleteList[0],
            });
            return cusResponse(res, 200, deletedEvent, null);
        } else {
            const deletedEvent = await Promise.all(
                deleteList.map(async (eventName) => {
                    return await Event.findOneAndDelete({
                        eventName,
                    });
                })
            );
            return cusResponse(res, 200, deletedEvent, null);
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

const updateEvent = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedEvent = await Event.findOneAndUpdate(
            { eventName: userReq.filter },
            userReq.update,
            { runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedEvent, null);
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

const getAllEvent = async (req, res, next) => {
    try {
        const events = await Event.find({});
        return cusResponse(res, 200, events, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    createEvent,
    filter,
    deleteEvent,
    updateEvent,
    getAllEvent,
};
