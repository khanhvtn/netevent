const {
    Event,
    Task,
    FacilityHistory,
    Facility,
    Participant,
    NotificationHistory,
} = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const { sendEmail } = require('./misc/mailer');

function limit(c) {
    return this.filter((x, i) => {
        if (i <= c - 1) {
            return true;
        }
    });
}

Array.prototype.limit = limit;

function skip(c) {
    return this.filter((x, i) => {
        if (i > c - 1) {
            return true;
        }
    });
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
                    return await FacilityHistory.findByIdAndUpdate(
                        facilityHistory._id,
                        {
                            ...facilityHistory._doc,
                            eventId: newEvent._id,
                        }
                    );
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
const filterEventManagement = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const startMaxDate = await Event.find()
            .sort({ startDate: -1 })
            .limit(1);
        const startMinDate = await Event.find().sort({ startDate: 1 }).limit(1);
        const endMaxDate = await Event.find().sort({ endDate: -1 }).limit(1);
        const endMinDate = await Event.find().sort({ endDate: 1 }).limit(1);
        const listRangeDate = await Promise.all([
            startMaxDate,
            startMinDate,
            endMaxDate,
            endMinDate,
        ]);

        //return empty result to client if database has no data.
        if (
            !startMaxDate.length ||
            !startMinDate.length ||
            !endMaxDate.length ||
            !endMinDate.length
        ) {
            return cusResponse(res, 200, [], null);
        }

        let options = {
            search: '',
            take: 5,
            type: '',
            budgetRange: '',
            participantRange: '',
            startMaxDate: listRangeDate[0][0].startDate,
            startMinDate: listRangeDate[1][0].startDate,
            endMaxDate: listRangeDate[2][0].endDate,
            endMinDate: listRangeDate[3][0].endDate,
        };

        /* Create Query Options */
        let queryOptions = {};

        //adding search
        if (req.query.search) {
            options = {
                ...options,
                search: req.query.search.toString(),
            };
            queryOptions = {
                ...queryOptions,
                $or: [{ eventName: new RegExp(options.search, 'i') }],
            };
        }

        /* 
        Add filer by ownerID
         */

        if (req.query.ownerId) {
            options = {
                ...options,
                ownerId: req.query.ownerId.toString(),
            };
            queryOptions = {
                ...queryOptions,
                ownerId: options.ownerId,
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
        Add startFrom filter
         */
        if (req.query.startFrom) {
            options = {
                ...options,
                startMinDate: new Date(req.query.startFrom),
            };
        }

        /* 
        Add startTo filter
         */

        if (req.query.startTo) {
            options = {
                ...options,
                startMaxDate: new Date(req.query.startTo),
            };
        }

        /* 
        Add endFrom filter
         */
        if (req.query.endFrom) {
            options = {
                ...options,
                endMinDate: new Date(req.query.endFrom),
            };
        }

        /* 
        Add endTo filter
         */

        if (req.query.endTo) {
            options = {
                ...options,
                endMaxDate: new Date(req.query.endTo),
            };
        }

        /* Set StartDate and EndDate Filter for query options */
        queryOptions = {
            ...queryOptions,
            startDate: {
                $gte: options.startMinDate,
                $lte: options.startMaxDate,
            },
            endDate: {
                $gte: options.endMinDate,
                $lte: options.endMaxDate,
            },
        };

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total event based on search and filter
         */
        if (options.type) {
            const queryEvent = await Event.find(queryOptions)
                .select('-taskListId -facilityHistoryListId')
                .populate({
                    path: 'eventTypeId',
                    match: { name: new RegExp(options.type, 'i') },
                })
                .sort({ updatedAt: -1 });

            const filterEvents = queryEvent.filter(
                (event) => event.eventTypeId !== null
            );
            const totalEvent = filterEvents.length;

            let totalPages = (totalEvent / options.take)
                .toString()
                .includes('.')
                ? Math.ceil(totalEvent / options.take)
                : totalEvent / options.take;

            const events = filterEvents
                .skip((page - 1) * options.take)
                .limit(options.take);

            return cusResponse(res, 200, events, null, totalPages);
        }

        const queryEvent = await Event.find(queryOptions)
            .select('-taskListId -facilityHistoryListId')
            .populate({
                path: 'eventTypeId',
            })
            .sort({ updatedAt: -1 });

        const totalEvent = queryEvent.length;

        let totalPages = (totalEvent / options.take).toString().includes('.')
            ? Math.ceil(totalEvent / options.take)
            : totalEvent / options.take;

        const events = queryEvent
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, events, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete all event and task + Facility history
 * @method DELETE
 * @route /api/event/deleteManagement
 *
 * @version 1.0
 */
const deleteEventManagement = async (req, res, next) => {
    try {
        const { eventId, taskListId, historyFacilityListId } = req.body;

        // Delete all reference Task
        await Task.deleteMany({ _id: taskListId });

        // Delete all reference Facility History
        await FacilityHistory.deleteMany({ _id: historyFacilityListId });

        // Delete Event
        const deleteEvent = await Event.deleteOne({ _id: eventId });

        return cusResponse(res, 200, deleteEvent, null);
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
        const { deleteList } = req.body;
        const deletedEvent = await Event.updateMany(
            { name: { $in: deleteList } },
            { $set: { isDeleted: true } }
        );
        return cusResponse(res, 200, deletedEvent, null);
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
 * @decsription Delete events from the request names
 * @method DELETE
 * @route /api/event/deleteP
 *
 * @version 1.0
 */
const deleteEventPermanent = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        const deletedEvent = await Event.deleteMany({
            name: { $in: deleteList },
        });
        return cusResponse(res, 200, deletedEvent, null);
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
 * @decsription Recovery events from the request names
 * @method PATCH
 * @route /api/event/recovery
 *
 * @version 1.0
 */
const recoveryEvent = async (req, res, next) => {
    try {
        const { recoveryList } = req.body;
        const recoveryEvent = await Event.updateMany(
            { name: { $in: recoveryList } },
            { $set: { isDeleted: false } }
        );
        return cusResponse(res, 200, recoveryEvent, null);
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
    let errors = {};
    try {
        const { tasks, borrowFacilities, _id, ...eventDetail } = req.body;

        // Get current task and facility id
        const currentEvent = await Event.findOne({
            _id: _id,
        });

        eventDetailChecking = {
            ...eventDetail,
            eventName:
                currentEvent.eventName === eventDetail.eventName
                    ? 'tempName'
                    : eventDetail.eventName,
        };

        let event = new Event(eventDetailChecking);

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
            return next(new CustomError(400, errors));
        }

        // Filter all task and facility without having previous id
        const newTaskList = tasks.filter((task) => !task._id);
        const newHistoryFacilityList = borrowFacilities.filter(
            (facility) => !facility._id
        );

        //create new tasks to get task list ids
        const newTaskListResult = await Promise.all(
            newTaskList.map(async (task) => {
                try {
                    return await Task.create(task);
                } catch (error) {
                    throw error;
                }
            })
        );

        //create new facility histories to get their ids
        const newHistoryFacilityListResult = await Promise.all(
            newHistoryFacilityList.map(async (facilityHistory) => {
                try {
                    return await FacilityHistory.create(facilityHistory);
                } catch (error) {
                    throw error;
                }
            })
        );

        // Combine and filter all new facility history and task
        const newTaskListIds = [
            ...tasks.filter((task) => task._id).map((task) => task._id),
            ...newTaskListResult.map((task) => task._id),
        ];

        const newHistoryFacilityListIds = [
            ...borrowFacilities
                .filter((task) => task._id)
                .map((task) => task._id),
            ...newHistoryFacilityListResult.map((task) => task._id),
        ];

        // Get current task and history facility
        const currentTaskListIds = currentEvent.taskListId.map((id) =>
            id.toString()
        );

        const currentHistoryFacilityListIds =
            currentEvent.facilityHistoryListId.map((id) => id.toString());

        // Get all delete task and history facility
        const deleteTaskListIds = currentTaskListIds.filter(
            (id) => !newTaskListIds.includes(id)
        );

        const deleteHistoryFacilityListIds =
            currentHistoryFacilityListIds.filter(
                (id) => !newHistoryFacilityListIds.includes(id)
            );

        // Handle delete tasks
        const handleDeleteTasks = await Task.deleteMany({
            _id: deleteTaskListIds,
        });

        // Handle delete facilities
        const handleDeleteFacilities = await FacilityHistory.deleteMany({
            _id: deleteHistoryFacilityListIds,
        });

        // Add task list id into update
        newUpdateState = {
            ...eventDetail,
            taskListId: newTaskListIds,
            facilityHistoryListId: newHistoryFacilityListIds,
        };

        // Update new event
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: _id },
            newUpdateState,
            { new: true, context: 'query' }
        ).populate({
            path: 'eventTypeId',
        });

        // update id event back to above tasks.
        await Promise.all(
            newTaskListResult.map(async (task) => {
                try {
                    return await Task.findByIdAndUpdate(task._id, {
                        ...task._doc,
                        eventId: updatedEvent._id,
                    });
                } catch (error) {
                    throw error;
                }
            })
        );

        // update id event back to above facility histories.
        await Promise.all(
            newHistoryFacilityListResult.map(async (facilityHistory) => {
                try {
                    return await FacilityHistory.findByIdAndUpdate(
                        facilityHistory._id,
                        {
                            ...facilityHistory._doc,
                            eventId: updatedEvent._id,
                        }
                    );
                } catch (error) {
                    throw error;
                }
            })
        );

        return cusResponse(res, 200, updatedEvent, null);
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
 * @decsription Get all events
 * @method GET
 * @route /api/event/all
 *
 * @version 1.0
 */
const getAllEvent = async (req, res, next) => {
    try {
        const events = await Event.find({})
            .select('-taskListId -facilityHistoryListId')
            .populate({
                path: 'eventTypeId ownerId',
            });
        return cusResponse(res, 200, events, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Send Mass Notification
 * @method POST
 * @route /api/event/sendMassNotification
 *
 * @version 1.0
 */
const sendNotification = async (req, res, next) => {
    const notification = req.body;
    const participants = await Participant.find({
        event: notification.eventID,
        isValid: true,
    });
    const emailParticipantsList = [];
    for (var i = 0; i < participants.length; i++) {
        emailParticipantsList.push(participants[i].email);
    }
    const stringUsersMail = emailParticipantsList.join(', ');

    try {
        const isSend = await sendEmail(
            'noreply@netevent.com',
            stringUsersMail,
            notification.title,
            notification.description
        );
        
        // Save notification history when email is sent
        if(isSend){
            const notificationHistory = new NotificationHistory({
                eventId: notification.eventID,
                title: notification.title,
                description: notification.description
            });
            const newNotificatioHistory = await notificationHistory.save();
        }

        return cusResponse(res, 200, isSend, null);
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
 * @decsription Get specific event detail
 * @method GET
 * @route /api/event/detail
 *
 * @version 1.0
 */
const getFacilityAndTaskByEventCode = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            urlCode: req.query.code,
        }).populate({
            path: 'taskListId facilityHistoryListId',
            populate: [
                {
                    path: 'facilityId',
                    model: 'Facility',
                },
                {
                    path: 'userId',
                    model: 'User',
                },
            ],
        });

        if (!event) {
            return cusResponse(res, 200, [], null);
        }

        return cusResponse(res, 200, event, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Get specific event detail
 * @method PATCH
 * @route /api/event/detail
 *
 * @version 1.0
 */
const updateEventStatus = async (req, res, next) => {
    try {
        const { eventId, status } = req.body;
        // Update new event
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId },
            { isFinished: status },
            { new: true, context: 'query' }
        ).populate({
            path: 'eventTypeId',
        });

        return cusResponse(res, 200, updatedEvent, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    createEvent,
    deleteEvent,
    updateEvent,
    getAllEvent,
    recoveryEvent,
    sendNotification,
    deleteEventPermanent,
    filterEventManagement,
    deleteEventManagement,
    getFacilityAndTaskByEventCode,
    updateEventStatus
};
