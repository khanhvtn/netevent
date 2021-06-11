const router = require('express').Router();
const { authentication } = require('../middlewares');
const { eventControllers } = require('../controllers');

/**
 *  =====================================
 *              EVENT ROUTER
 *  =====================================
 */

// CRUD
router.post('/create', eventControllers.createEvent);
router.get('/filter', eventControllers.filterEventManagement);
router.get('/all', eventControllers.getAllEvent);
router.get('/detail', eventControllers.getFacilityAndTaskByEventName);
router.patch('/update', eventControllers.updateEvent);
router.delete('/delete', eventControllers.deleteEvent);
router.delete('/deleteP', eventControllers.deleteEventPermanent);
router.delete('/deleteManagement', eventControllers.deleteEventManagement);
router.patch('/recovery', eventControllers.recoveryEvent);
router.patch('/update/status', eventControllers.updateEventStatus);
router.post('/sendNotification', eventControllers.sendNotification);

module.exports = router;
