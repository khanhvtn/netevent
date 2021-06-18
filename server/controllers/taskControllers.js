const { Task } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');

/**
 *  =====================================
 *            TASK CONTROLLER
 *  =====================================
 */


/**
* @decsription Create new task with following request
* @method POST 
* @route /api/task/create
* 
* @version 1.0
*/
const createTask = async (req, res, next) => {
    try {
        const task = new Task(req.body);
        //validate user request fields.
        await task.validate();

        //create new task
        const newTask = await task.save();
        return cusResponse(res, 200, newTask, null);
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
* @decsription Get, search and filter tasks (included paging)
* @method GET 
* @route /api/task/filter
* 
* @version 1.0
*/
const filter = async (req, res, next) => {
    try {
        //get max date and min date of updatedAt and createdAt
        const startMaxDate = await Task.find()
            .sort({ startDate: -1 })
            .limit(1);
        const startMinDate = await Task.find().sort({ startDate: 1 }).limit(1);
        const endMaxDate = await Task.find().sort({ endDate: -1 }).limit(1);
        const endMinDate = await Task.find().sort({ endDate: 1 }).limit(1);
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

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total task based on search and filter
         */
        const totalTask = await Task.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
            startDate: {
                $gte: options.startMinDate,
                $lte: options.startMaxDate,
            },
            endDate: {
                $gte: options.endMinDate,
                $lte: options.endMaxDate,
            },
        }).countDocuments();

        let totalPages = (totalTask / options.take).toString().includes('.')
            ? Math.ceil(totalTask / options.take)
            : totalTask / options.take;

        //return data to client
        const tasks = await Task.find({
            $or: [{ name: new RegExp(options.search, 'i') }],
            startDate: {
                $gte: options.startMinDate,
                $lte: options.startMaxDate,
            },
            endDate: {
                $gte: options.endMinDate,
                $lte: options.endMaxDate,
            },
        })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, tasks, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};


/**
* @decsription Delete events from the request list of task's id
* @method DELETE 
* @route /api/task/delete
* 
* @version 1.0
*/
const deleteTask = async (req, res, next) => {
    try {
        const { deleteList } = req.body;
        if (deleteList.length === 1) {
            const deletedTask = await Task.findOneAndDelete({
                _id: deleteList[0],
            });
            return cusResponse(res, 200, deletedTask, null);
        } else {
            const deletedTask = await Promise.all(
                deleteList.map(async (_id) => {
                    return await Task.findOneAndDelete({
                        _id,
                    });
                })
            );
            return cusResponse(res, 200, deletedTask, null);
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


/**
* @decsription Update task by new request update
* @method PATCH 
* @route /api/task/update
* 
* @version 1.0
*/
const updateTask = async (req, res, next) => {
    try {
        const userReq = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: userReq.filter },
            userReq.update,
            { new: true, runValidators: true, context: 'query' }
        );

        return cusResponse(res, 200, updatedTask, null);
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
* @decsription Get all tasks
* @method GET 
* @route /api/task/all
* 
* @version 1.0
*/
const getAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({
            id: req.body.userId
        }).populate({
            path: 'userId eventId'
        }).sort({ startDate: -1 });

        // Remove all task not have eventId
        let checkCode = []
        let result = []
        const filterTasks = tasks.filter(task => task.eventId)
        for (task of filterTasks) {
            let tmpObj = {
                code: null,
                eventName: null,
                startDate: null,
                tasks: []
            }
            if (!checkCode.includes(task.eventId?.urlCode)) {
                tmpObj.code = task.eventId?.urlCode;
                tmpObj.eventName = task.eventId?.eventName;
                tmpObj.startDate = task.eventId?.startDate;
                tmpObj.tasks.push(task)

                result.push(tmpObj);
                checkCode.push(task.eventId?.urlCode);
            } else {
                for (currentTask of result) {
                    if (currentTask.code === task.eventId?.urlCode) {
                        currentTask.tasks.push(task)
                        break;
                    }
                }
            }
        }

        return cusResponse(res, 200, result, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};


module.exports = {
    createTask,
    filter,
    deleteTask,
    updateTask,
    getAllTask,
};
