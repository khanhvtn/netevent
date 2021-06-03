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
router.get('/detail', eventControllers.getFacilityAndTaskByEventName)
router.patch('/update', eventControllers.updateEvent);
router.delete('/delete', eventControllers.deleteEvent);

module.exports = router;
