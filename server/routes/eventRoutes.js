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
router.get('/filter', eventControllers.filter);
router.get('/all', eventControllers.getAllEvent);
router.patch('/update', eventControllers.updateEvent);
router.delete('/delete', eventControllers.deleteEvent);
router.delete('/deleteP', eventControllers.deleteEventPermanent);
router.patch('/recovery', eventControllers.recoveryEvent);

module.exports = router;
