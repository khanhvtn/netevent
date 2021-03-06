//import controllers here
const userControllers = require('./userControllers');
const facilityControllers = require('./facilityControllers');
const eventTypeControllers = require('./eventTypeControllers');
const eventControllers = require('./eventControllers');
const taskControllers = require('./taskControllers');
const facilityHistoryControllers = require('./facilityHistoryControllers');
const linkControllers = require('./linkControllers');
const participantControllers = require('./participantControllers');
const notificationControllers = require('./notificationHistoryControllers');
const feedbackControllers = require('./feedbackControllers');
/**
 *  =====================================
 *        ALL CONTROLLERS EXPORT
 *  =====================================
 */

module.exports = {
    //add controllers here
    userControllers,
    facilityControllers,
    eventTypeControllers,
    eventControllers,
    taskControllers,
    facilityHistoryControllers,
    linkControllers,
    participantControllers,
    notificationControllers,
    feedbackControllers
};
