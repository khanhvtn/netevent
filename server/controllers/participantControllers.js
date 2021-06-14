const { Participant } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const mongoose = require('mongoose');


/**
 *  =====================================
 *         PARTICIPANT CONTROLLER
 *  =====================================
 */

/**
 * @decsription Get all participants
 * @method GET
 * @route /api/participant/all
 *
 * @version 1.0
 */
const getParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find();
        return cusResponse(res, 200, participants, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Filter all participants
 * @method PATCH
 * @route /api/participant/filter
 *
 * @version 1.0
 */
const filterParticipants = async (req, res, next) => {
    try {
        let options = {
            search: '',
            take: 10,
            isValid: {
                $in: [true, false, null]
            },
            isAttended: {
                $in: [true, false]
            },
            academic: {
                $in: ['Bachelor', 'Master', 'PhD'],
            },
            eventId: null,
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
        Add eventId row filter
         */
        if (req.query.eventId) {
            options = {
                ...options,
                eventId: req.query.eventId.toString(),
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.academic) {
            options = {
                ...options,
                academic: req.query.academic.toString(),
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.isValid) {
            options = {
                ...options,
                isValid: req.query.isValid.toString() === "null" ? null : req.query.isValid.toString() === "true",
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.isAttended) {
            options = {
                ...options,
                isAttended: req.query.isAttended.toString() === "true",
            };
        }

        /* 
        Add status row filter
         */
        if (req.query.status) {
            switch (req.query.status) {
                case 'Verified':
                    options = {
                        ...options,
                        isValid: true,
                        isAttended: false
                    }
                    break;
                case 'Invalid':
                    options = {
                        ...options,
                        isValid: false,
                        isAttended: false
                    }
                    break;
                case 'Pending':
                    options = {
                        ...options,
                        isValid: null,
                        isAttended: false
                    }
                    break;
                case 'Checked':
                    options = {
                        ...options,
                        isValid: true,
                        isAttended: true
                    }
                    break;
            }
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total user based on search and filter
         */
        const totalParticipants = await Participant.find({
            $or: [
                { email: new RegExp(options.search, 'i') },
                { name: new RegExp(options.search, 'i') },
                { school: new RegExp(options.search, 'i') },
                { major: new RegExp(options.search, 'i') }
            ],
            isValid: options.isValid,
            isAttended: options.isAttended,
            event: options.eventId,
            academic: options.academic
        }).countDocuments();

        let totalPages = (totalParticipants / options.take).toString().includes('.')
            ? Math.ceil(totalParticipants / options.take)
            : totalParticipants / options.take;

        //return data to client
        const participants = await Participant.find({
            $or: [
                { email: new RegExp(options.search, 'i') },
                { name: new RegExp(options.search, 'i') },
                { school: new RegExp(options.search, 'i') },
                { major: new RegExp(options.search, 'i') }
            ],
            isValid: options.isValid,
            isAttended: options.isAttended,
            event: options.eventId,
            academic: options.academic
        })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, participants, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

/**
 * @decsription Register Event to save participant model
 * @method POST
 * @route /api/participant/registerEvent
 *
 * @version 1.0
 */
const registerEvent = async (req, res, next) => {

    try {
        const data = new Participant(req.body)
        await data.validate()

        const savedData = await data.save();
        return cusResponse(res, 200, savedData, null);

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
}

/**
 * @decsription Delete Participant
 * @method DELETE
 * @route /api/participant/:id
 *
 * @version 1.0
 */
const deleteParticipant = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No participant with that id');
        } else {
            const data = await Participant.findByIdAndRemove(_id);
            res.json(data);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

/**
 * @decsription Set Invalid and Verify participants
 * @method PATCH
 * @route /api/participant/update/valid
 *
 * @version 1.0
 */
const setInvalidAndVerifyParticipant = async (req, res, next) => {
    const { invalidList, verifiedList, action } = req.body;
    try {
        switch (action) {
            case false:
                const updateInvalidParticipant = await Participant.updateMany(
                    { _id: invalidList },
                    { $set: { isValid: action } },
                    { new: true }
                );
                return cusResponse(res, 200, updateInvalidParticipant, null);
            case true:
                const updateVerifiedParticipant = await Participant.updateMany(
                    { _id: verifiedList },
                    { $set: { isValid: action } },
                    { new: true }
                );
                return cusResponse(res, 200, updateVerifiedParticipant, null);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

/**
 * @decsription Set Attend participants
 * @method PATCH
 * @route /api/participant/update/valid
 *
 * @version 1.0
 */
const setAttendedParticipant = async (req, res, next) => {
    const { attendedList, action } = req.body;
    try {
        switch (action) {
            case false:
                const updateAttendedParticipant = await Participant.updateMany(
                    { _id: attendedList },
                    { $set: { isAttended: action } },
                    { new: true }
                );
                return cusResponse(res, 200, updateAttendedParticipant, null);
            case true:
                const updateNotAttendedParticipant = await Participant.updateMany(
                    { _id: attendedList },
                    { $set: { isAttended: action } },
                    { new: true }
                );
                return cusResponse(res, 200, updateNotAttendedParticipant, null);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

module.exports = {
    getParticipants,
    registerEvent,
    deleteParticipant,
    filterParticipants,
    setInvalidAndVerifyParticipant,
    setAttendedParticipant
}
