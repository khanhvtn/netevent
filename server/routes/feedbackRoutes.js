const router = require('express').Router();
const { feedbackControllers } = require('../controllers');

/**
 *  =====================================
 *              FEEDBACK ROUTER
 *  =====================================
 */

// CRUD
router.get('/', feedbackControllers.getAllFeedback);
router.get('/eventID', feedbackControllers.getFeedbackByEventID);

module.exports = router;
