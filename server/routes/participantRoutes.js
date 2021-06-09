const router = require('express').Router();
const { authentication } = require('../middlewares');
const { participantControllers } = require('../controllers');


router.get('/all', participantControllers.getParticipants);
router.get('/filter', participantControllers.filterParticipants);
router.post('/registerEvent', participantControllers.registerEvent);
router.delete('/:id', participantControllers.deleteParticipant);
router.patch('/checkValid', participantControllers.checkValid);
router.patch('/checkAttendance', participantControllers.checkAttendance);


module.exports = router;