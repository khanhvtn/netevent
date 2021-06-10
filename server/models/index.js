//import models here
const User = require('./userModel');
const Facility = require('./facilityModel');
const EventType = require('./eventTypeModel');
const Event = require('./eventModel');
const Task = require('./taskModel');
const FacilityHistory = require('./facilityHistoryModel');
const Participant = require('./participantModel')
module.exports = {
    //add models here
    User,
    Facility,
    EventType,
    Event,
    Task,
    FacilityHistory,
    Participant
};
