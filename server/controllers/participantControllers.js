const { Participant } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');
const mongoose = require('mongoose');


/**
 *  =====================================
 *              PARTICIPANT CONTROLLER
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

const registerEvent = async(req, res, next) => {
    
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
                { $set: {'isValid': true}},
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
                { $set: {'isAttended': updatedInfo.isAttended}},
                { new: true }
            )
            res.json(update);
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
    checkAttendance
}
