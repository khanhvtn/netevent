const { Participant } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const mongoose = require('mongoose');


/**
 *  =====================================
 *         PARTICIPANT CONTROLLER
 *  =====================================
 */


const getParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find();
        return cusResponse(res, 200, participants, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

const filterParticipants = async (req, res, next) => {
    try {
        let options = {
            search: '',
            take: 10,
            isValid: {
                $in: [true, false, null]
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


const checkValid = async (req, res, next) => {
    const updatedInfo = req.body;
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No participant with that id');
        } else {
            const update = await Participant.findByIdAndUpdate(
                updatedInfo._id,
                { $set: { 'isValid': true } },
                { new: true }
            )
            res.json(update);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}


const checkAttendance = async (req, res, next) => {
    const updatedInfo = req.body;
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No participant with that id');
        } else {
            const update = await Participant.findByIdAndUpdate(
                updatedInfo._id,
                { $set: { 'isAttended': updatedInfo.isAttended } },
                { new: true }
            )
            res.json(update);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

const setInvalidAndVerifyParticipant = async (req, res, next) => {
    const { invalidList, verifiedList, action } = req.body;
    try {
        switch (action) {
            case false:
                const updateInvalidParticipant = await Participant.updateMany(
                    { _id: invalidList },
                    { $set: { isValid: action } },
                );
                return cusResponse(res, 200, updateInvalidParticipant, null);
            case true:
                const updateVerifiedParticipant = await Participant.updateMany(
                    { _id: verifiedList },
                    { $set: { isValid: action } },
                );
                return cusResponse(res, 200, updateVerifiedParticipant, null);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

module.exports = {
    getParticipants,
    registerEvent,
    deleteParticipant,
    checkValid,
    checkAttendance,
    filterParticipants,
    setInvalidAndVerifyParticipant
}
