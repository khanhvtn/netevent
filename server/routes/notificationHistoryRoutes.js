const router = require('express').Router();
const { notificationControllers } = require('../controllers');

/**
 *  =====================================
 *      NOTIFICATION HISTORY ROUTER
 *  =====================================
 */

router.get('/all', notificationControllers.getNotificationHistoryByEventCode);

module.exports = router;
