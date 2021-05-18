const router = require('express').Router();
const { authentication } = require('../middlewares');
const { eventControllers } = require('../controllers');

router.post('/create', eventControllers.createEvent);
router.get('/filter', eventControllers.filter);
router.get('/all', eventControllers.getAllEvent);
router.patch('/update', eventControllers.updateEvent);
router.delete('/delete', eventControllers.deleteEvent);

module.exports = router;
