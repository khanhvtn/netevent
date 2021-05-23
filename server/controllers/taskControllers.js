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
        const createdMaxDate = await Task.find()
            .sort({ createdAt: -1 })
            .limit(1);
        const createdMinDate = await Task.find()
            .sort({ createdAt: 1 })
            .limit(1);
        const updatedMaxDate = await Task.find()
            .sort({ updatedAt: -1 })
            .limit(1);
        const updatedMinDate = await Task.find()
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
        Variable total task based on search and filter
         */
        const totalTask = await Task.find({
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

        let totalPages = (totalTask / options.take).toString().includes('.')
            ? Math.ceil(totalTask / options.take)
            : totalTask / options.take;

        //return data to client
        const tasks = await Task.find({
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
        const tasks = await Task.find({});
        return cusResponse(res, 200, tasks, null);
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
