const { NotificationHistory, Event } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomeError');

/**
 *  =====================================
 *     NOTIFICATION HISTORY CONTROLLER
 *  =====================================
 */


/**
 * @decsription Get all links
 * @method GET 
 * @route /api/notificationHistory
 * 
 * @version 1.0
 */
const getNotificationHistoryByEventCode = async (req, res) => {
    try {
        const event = await Event.findOne({ urlCode: req.query.code })
        if (event) {
            const notificationHistories = await NotificationHistory.find({
                eventId: event._id
            }).sort({ createdAt: -1 });
            return cusResponse(res, 200, notificationHistories, null);
        }

    } catch (error) {
        return next(new CustomError(500, error.message));
    }
}

module.exports = {
    getNotificationHistoryByEventCode,
}
