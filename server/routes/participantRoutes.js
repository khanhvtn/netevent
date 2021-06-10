const router = require('express').Router();
const { authentication } = require('../middlewares');
const { participantControllers } = require('../controllers');


router.get('/all', participantControllers.getParticipants);
router.get('/filter', participantControllers.filterParticipants);
router.post('/registerEvent', participantControllers.registerEvent);
router.delete('/:id', participantControllers.deleteParticipant);
router.patch('/update/valid', participantControllers.setInvalidAndVerifyParticipant);
router.patch('/update/attend', participantControllers.setAttendedParticipant);

module.exports = router;