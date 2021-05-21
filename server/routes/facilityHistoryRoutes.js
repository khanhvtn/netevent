const router = require('express').Router();
const { authentication } = require('../middlewares');
const { facilityHistoryControllers } = require('../controllers');

router.post('/create', facilityHistoryControllers.createFacilityHistory);
router.get('/filter', facilityHistoryControllers.filter);
router.get('/all', facilityHistoryControllers.getAllFacilityHistory);
router.patch('/update', facilityHistoryControllers.updateFacilityHistory);
router.delete('/delete', facilityHistoryControllers.deleteFacilityHistory);

module.exports = router;
