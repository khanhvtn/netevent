//import models here
const User = require('./userModel');
const Facility = require('./facilityModel');
const EventType = require('./eventTypeModel');
const Event = require('./eventModel');
const Task = require('./taskModel');
const FacilityHistory = require('./facilityHistoryModel');
const Participant = require('./participantModel');
const NotificationHistory = require('./notificationHistoryModel')
module.exports = {
    //add models here
    User,
    Facility,
    EventType,
    Event,
    Task,
    Participant,
    FacilityHistory,
    NotificationHistory
};
