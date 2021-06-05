const { Event, Task, FacilityHistory, Facility } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const { populate } = require('../models/userModel');

function limit(c) {
    return this.filter((x, i) => {
        if (i <= (c - 1)) {
            return true
        }
    })
}

Array.prototype.limit = limit;

function skip(c) {
    return this.filter((x, i) => {
        if (i > c - 1) {
            return true
        }
    })
}

Array.prototype.skip = skip;

/**
 *  =====================================
 *          EVENT CONTROLLER
 *  =====================================
 */

/**
 * @decsription Create new event with following request
 * @method POST
 * @route /api/event/create
 *
 * @version 1.0
 */
const createEvent = async (req, res, next) => {
    let errors = {};
    try {
        const { tasks, borrowFacilities } = req.body;
        let event = new Event(req.body);
        //validate tasks list
        if (Object.keys(tasks).length === 0) {
            errors = { ...errors, taskListId: 'Task cannot be blanked' };
        }

        //validate borrow facilities list
        if (Object.keys(borrowFacilities).length === 0) {
            errors = {
                ...errors,
                facilityHistoryListId: 'Borrow Facility cannot be blanked',
            };
        }

        //validate user request fields.
        await event.validate();

        if (Object.keys(errors).length !== 0) {
            return next(new CustomError(500, errors));
        }

        //create tasks to get task list ids
        const taskResult = await Promise.all(
            tasks.map(async (task) => {
                try {
                    return await Task.create(task);
                } catch (error) {
                    throw error;
                }
            })
        );

        //create facility histories to get their ids
        const facilityHistoryResult = await Promise.all(
            borrowFacilities.map(async (facilityHistory) => {
                try {
                    return await FacilityHistory.create(facilityHistory);
                } catch (error) {
                    throw error;
                }
            })
        );

        //add task list id into req.body
        req.body = {
            ...req.body,
            taskListId: taskResult.map((task) => task._id),
            facilityHistoryListId: facilityHistoryResult.map(
                (facilityHistory) => facilityHistory._id
            ),
        };

        //renew event instance
        event = new Event(req.body);

        //create new event
        const newEvent = await event.save();

        //update id event back to above tasks.
        await Promise.all(
            taskResult.map(async (task) => {
                try {
                    return await Task.findByIdAndUpdate(task._id, {
                        ...task._doc,
                        eventId: newEvent._id,
                    });
                } catch (error) {
                    throw error;
                }
            })
        );

        //update id event back to above facility histories.
        await Promise.all(
            facilityHistoryResult.map(async (facilityHistory) => {
                try {
                    return await Task.findByIdAndUpdate(facilityHistory._id, {
                        ...facilityHistory._doc,
                        eventId: newEvent._id,
                    });
                } catch (error) {
                    throw error;
                }
            })
        );

        //update facility status
        await Promise.all(
            facilityHistoryResult.map(async (facilityHistory) => {
                try {
                    return await Facility.findByIdAndUpdate(
                        facilityHistory.facilityId,
                        {
                            $set: { status: false },
                        }
                    );
                } catch (error) {
                    throw error;
                }
            })
        );

        return cusResponse(res, 200, newEvent, null);
    } catch (error) {
        if (error.name == 'ValidationError') {
            for (field in error.errors) {
                errors = { ...errors, [field]: error.errors[field].message };
            }
            return next(new CustomError(500, errors));
        }
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Get, search and filter events (included paging)
 * @method GET
 * @route /api/event/filter
 *
 * @version 1.0
 */
const filter = async (req, res, next) => {
    try {
        let options = {
            search: '',
            take: 5,
            type: '',
            budgetRange: '',
            participantRange: '',
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
        Add type filter
         */
        if (req.query.type) {
            options = {
                ...options,
                type: req.query.type.toString(),
            };
        }

        /* 
        Add budgetRange filter
         */

        if (req.query.budgetRange) {
            options = {
                ...options,
                budgetRange: req.query.budgetRange.toString(),
            };
        }

        /* 
        Add participantRange filter
         */

        if (req.query.participantRange) {
            options = {
                ...options,
                participantRange: req.query.participantRange.toString(),
            };
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total event based on search and filter
         */
        if (options.type) {
            const queryEvent = await Event.find({
                $or: [
                    { eventName: new RegExp(options.search, 'i') }
                ],
            })
                .select('-taskListId -facilityHistoryListId')
                .populate({
                    path: 'eventTypeId',
                    match: { name: new RegExp(options.type, 'i') },
                })
                .sort({ updatedAt: -1 })


            const filterEvents = queryEvent.filter((event) => event.eventTypeId !== null);
            const totalEvent = filterEvents.length;

            let totalPages = (totalEvent / options.take).toString().includes('.')
                ? Math.ceil(totalEvent / options.take)
                : totalEvent / options.take;

            const events = filterEvents.skip((page - 1) * options.take).limit(options.take);

            return cusResponse(res, 200, events, null, totalPages);
        }

        const queryEvent = await Event.find({
            $or: [
                { eventName: new RegExp(options.search, 'i') }
            ],
        })
            .select('-taskListId -facilityHistoryListId')
            .populate({
                path: 'eventTypeId',
            })
            .sort({ updatedAt: -1 })


        const totalEvent = queryEvent.length;

        let totalPages = (totalEvent / options.take).toString().includes('.')
            ? Math.ceil(totalEvent / options.take)
            : totalEvent / options.take;

        const events = queryEvent.skip((page - 1) * options.take).limit(options.take);

        return cusResponse(res, 200, events, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete events from the request list of eventName
 * @method DELETE
 * @route /api/event/delete
 *
 * @version 1.0
 */
const deleteEvent = async (req, res, next) => {
    try {
        const { eventId, taskListId, historyFacilityListId } = req.body;

        // Delete all reference Task
        await Task.deleteMany({ _id: taskListId });
        
        // Delete all reference Facility History
        await FacilityHistory.deleteMany({ _id: historyFacilityListId })
        
        // Delete Event
        const deleteEvent = await Event.deleteOne({ _id: eventId })
        const response = { ...deleteEvent, isDeleted: true }

        return cusResponse(res, 200, response, null);

    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Update event by new request update
 * @method PATCH
 * @route /api/event/filter
 *
 * @version 1.0
 */
const updateEvent = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedEvent = await Event.findOneAndUpdate(
            { eventName: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
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

/**
 * @decsription Get all events
 * @method GET
 * @route /api/event/all
 *
 * @version 1.0
 */
const getAllEvent = async (req, res, next) => {
    try {
        const events = await Event.find({})
            .populate([{ path: 'taskListId facilityHistoryListId' }])
            .populate({
                path: 'eventTypeId ownerId',
            });
        return cusResponse(res, 200, events, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};


/**
 * @decsription Get specific event detail
 * @method GET
 * @route /api/event/detail
 *
 * @version 1.0
 */
const getFacilityAndTaskByEventName = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            eventName: req.query.eventName
        })
            .populate({
                path: 'taskListId facilityHistoryListId',
                populate: [
                    {
                        path: 'facilityId',
                        model: 'Facility'
                    },
                    {
                        path: 'userId',
                        model: 'User'
                    }
                ]
            })
        return cusResponse(res, 200, event, null);
    } catch (error) {
        return next(new CustomError(500, error.message))
    }
}



module.exports = {
    createEvent,
    filter,
    deleteEvent,
    updateEvent,
    getAllEvent,
    getFacilityAndTaskByEventName
};
