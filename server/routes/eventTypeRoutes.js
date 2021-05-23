const router = require('express').Router();
const { authentication } = require('../middlewares');
const { eventTypeControllers } = require('../controllers');

/**
 *  =====================================
 *           EVENT TYPE ROUTER
 *  =====================================
 */

// CRUD
router.post('/create', eventTypeControllers.createEventType);
router.get('/filter', eventTypeControllers.filter);
router.get('/all', eventTypeControllers.getAllEventType);
router.patch('/update', eventTypeControllers.updateEventType);
router.delete('/delete', eventTypeControllers.deleteEventType);

module.exports = router;
