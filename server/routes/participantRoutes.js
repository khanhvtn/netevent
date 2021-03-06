const router = require('express').Router();
const { participantControllers } = require('../controllers');

router.get('/suggest', participantControllers.getSuggestedParticipants);
router.get('/all', participantControllers.getParticipantByEventID);
router.get('/filter', participantControllers.filterParticipants);
router.post('/registerEvent', participantControllers.registerEvent);
router.delete('/:id', participantControllers.deleteParticipant);
router.patch(
    '/update/valid',
    participantControllers.setInvalidAndVerifyParticipant
);
router.patch('/update/attend', participantControllers.setAttendedParticipant);
router.patch(
    '/update/attendByQrCode',
    participantControllers.setAttendedParticipantByQrCode
);
router.post('/invite', participantControllers.inviteParticipant);
router.post('/sendFeedback', participantControllers.sendFeedbackToParticipants);
router.post('/submitFeedback', participantControllers.submitFeedback);
router.get('/feedback', participantControllers.getFeedback);

module.exports = router;
